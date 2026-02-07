/**
 * Generalized Second-Price (GSP) Auction Engine for CSS CPC Model
 *
 * Implements the auction mechanics used by Comparison Shopping Services
 * to determine ad placement, pricing, and competitive dynamics.
 *
 * GSP Rule: The winner pays just enough to beat the next-highest Ad Rank,
 * rather than their full bid. Ad Rank = Bid * Quality Score.
 */
class AuctionEngine {
    /**
     * @param {Object} competitors - Keyed by category ID. Each value is an array of
     *   { id: string, baseBid: number, qualityScore: number }
     * @param {Object} bidFloors - Keyed by category ID. Each value is the minimum
     *   CPC allowed for that category (number).
     */
    constructor(competitors, bidFloors) {
        this.competitors = competitors || {};
        this.bidFloors = bidFloors || {};
    }

    // ------------------------------------------------------------------ //
    //  Core auction
    // ------------------------------------------------------------------ //

    /**
     * Run a single GSP auction for one impression.
     *
     * @param {string}  categoryId          - The product category being auctioned.
     * @param {number}  sellerBid           - The seller's max CPC bid.
     * @param {number}  sellerQualityScore  - The seller's quality score (1-10).
     * @returns {{ position: number, estimatedCpc: number, impressionShare: number, totalAdvertisers: number }}
     */
    runAuction(categoryId, sellerBid, sellerQualityScore) {
        const categoryCompetitors = this.competitors[categoryId] || [];
        const bidFloor = this.bidFloors[categoryId] || 0.05;

        // Build the list of all participants with randomised bids to
        // simulate a dynamic marketplace (+-10% variance on base bid).
        const participants = categoryCompetitors.map((c) => {
            const variance = c.baseBid * 0.10;
            const actualBid = c.baseBid + (Math.random() * 2 - 1) * variance;
            const clampedBid = Math.max(actualBid, bidFloor);
            return {
                id: c.id,
                bid: clampedBid,
                qualityScore: c.qualityScore,
                adRank: clampedBid * c.qualityScore,
            };
        });

        // Add the seller.
        const sellerAdRank = sellerBid * sellerQualityScore;
        const sellerEntry = {
            id: '__seller__',
            bid: sellerBid,
            qualityScore: sellerQualityScore,
            adRank: sellerAdRank,
        };
        participants.push(sellerEntry);

        // Sort descending by Ad Rank.
        participants.sort((a, b) => b.adRank - a.adRank);

        // Find seller's position (1-indexed).
        const sellerIndex = participants.findIndex((p) => p.id === '__seller__');
        const position = sellerIndex + 1;
        const totalAdvertisers = participants.length;

        // GSP pricing ------------------------------------------------- //
        let estimatedCpc;

        if (sellerIndex < participants.length - 1) {
            // There is someone ranked below the seller.
            const nextBelow = participants[sellerIndex + 1];
            // Pay just enough to beat the next Ad Rank, divided by own QS.
            estimatedCpc = (nextBelow.adRank / sellerQualityScore) + 0.01;
        } else {
            // Seller is last -- pay bid floor + $0.01.
            estimatedCpc = bidFloor + 0.01;
        }

        // CPC can never exceed the seller's own bid.
        estimatedCpc = Math.min(estimatedCpc, sellerBid);
        // CPC must be at least the bid floor.
        estimatedCpc = Math.max(estimatedCpc, bidFloor);
        // Round to two decimals for currency.
        estimatedCpc = Math.round(estimatedCpc * 100) / 100;

        // Impression share -------------------------------------------- //
        const impressionShare = AuctionEngine._impressionShareForPosition(position);

        return {
            position,
            estimatedCpc,
            impressionShare,
            totalAdvertisers,
        };
    }

    // ------------------------------------------------------------------ //
    //  Competitive insights
    // ------------------------------------------------------------------ //

    /**
     * Aggregate competitive landscape data for a category.
     *
     * @param {string} categoryId
     * @returns {{ avgCpc: number, bidRange: { min: number, max: number },
     *             totalAdvertisers: number, topBidEstimate: number,
     *             bidDistribution: Array<{ range: string, count: number }> }}
     */
    getCompetitiveInsights(categoryId) {
        const categoryCompetitors = this.competitors[categoryId] || [];
        const bidFloor = this.bidFloors[categoryId] || 0.05;

        if (categoryCompetitors.length === 0) {
            return {
                avgCpc: bidFloor,
                bidRange: { min: bidFloor, max: bidFloor },
                totalAdvertisers: 0,
                topBidEstimate: bidFloor,
                bidDistribution: [],
            };
        }

        const bids = categoryCompetitors.map((c) => c.baseBid);
        const minBid = Math.min(...bids);
        const maxBid = Math.max(...bids);
        const avgBid = bids.reduce((sum, b) => sum + b, 0) / bids.length;

        // Estimate the top CPC -- the highest Ad Rank participant would
        // pay the second-highest Ad Rank divided by their own QS (GSP).
        const ranked = categoryCompetitors
            .map((c) => ({ ...c, adRank: c.baseBid * c.qualityScore }))
            .sort((a, b) => b.adRank - a.adRank);

        let topBidEstimate;
        if (ranked.length >= 2) {
            topBidEstimate = (ranked[1].adRank / ranked[0].qualityScore) + 0.01;
            topBidEstimate = Math.round(topBidEstimate * 100) / 100;
        } else {
            topBidEstimate = bidFloor + 0.01;
        }

        // Build a bid distribution histogram.
        const bidDistribution = AuctionEngine._buildBidDistribution(bids);

        return {
            avgCpc: Math.round(avgBid * 100) / 100,
            bidRange: {
                min: Math.round(minBid * 100) / 100,
                max: Math.round(maxBid * 100) / 100,
            },
            totalAdvertisers: categoryCompetitors.length,
            topBidEstimate,
            bidDistribution,
        };
    }

    // ------------------------------------------------------------------ //
    //  Quality score calculation
    // ------------------------------------------------------------------ //

    /**
     * Calculate a composite quality score from its component signals.
     *
     * Weights:
     *   - relevance   : 40%
     *   - ctr         : 30%
     *   - dataQuality : 20%
     *   - standing    : 10%
     *
     * Each component should be on a 1-10 scale.
     *
     * @param {{ relevance: number, ctr: number, dataQuality: number, standing: number }} breakdown
     * @returns {{ total: number, breakdown: { relevance: number, ctr: number, dataQuality: number, standing: number } }}
     */
    static calculateQualityScore(breakdown) {
        const weights = {
            relevance: 0.40,
            ctr: 0.30,
            dataQuality: 0.20,
            standing: 0.10,
        };

        const relevance = Math.max(1, Math.min(10, breakdown.relevance || 1));
        const ctr = Math.max(1, Math.min(10, breakdown.ctr || 1));
        const dataQuality = Math.max(1, Math.min(10, breakdown.dataQuality || 1));
        const standing = Math.max(1, Math.min(10, breakdown.standing || 1));

        const total =
            relevance * weights.relevance +
            ctr * weights.ctr +
            dataQuality * weights.dataQuality +
            standing * weights.standing;

        return {
            total: Math.round(total * 100) / 100,
            breakdown: { relevance, ctr, dataQuality, standing },
        };
    }

    // ------------------------------------------------------------------ //
    //  Suggested bid
    // ------------------------------------------------------------------ //

    /**
     * Recommend a bid that would land the seller at (or near) a target position.
     *
     * @param {string} categoryId
     * @param {number} targetPosition - Desired position (1 = top).
     * @param {number} qualityScore   - Seller's quality score.
     * @returns {number} Suggested bid rounded to two decimals.
     */
    getSuggestedBid(categoryId, targetPosition, qualityScore) {
        const categoryCompetitors = this.competitors[categoryId] || [];
        const bidFloor = this.bidFloors[categoryId] || 0.05;

        if (categoryCompetitors.length === 0 || targetPosition <= 0) {
            return Math.round((bidFloor + 0.01) * 100) / 100;
        }

        // Sort competitors by their average Ad Rank (using base bids, no variance).
        const ranked = categoryCompetitors
            .map((c) => ({ ...c, adRank: c.baseBid * c.qualityScore }))
            .sort((a, b) => b.adRank - a.adRank);

        // To reach targetPosition among competitors we need to beat the
        // competitor currently at that position (0-indexed: targetPosition - 1).
        const competitorIndex = targetPosition - 1; // position among competitors to beat

        if (competitorIndex >= ranked.length) {
            // Target position is beyond the number of competitors -- bid floor suffices.
            return Math.round((bidFloor + 0.01) * 100) / 100;
        }

        const competitorToBeat = ranked[competitorIndex];
        // Need: sellerBid * qualityScore > competitorToBeat.adRank
        // => sellerBid > competitorToBeat.adRank / qualityScore
        const requiredBid = (competitorToBeat.adRank / qualityScore) + 0.01;

        // Add a small buffer (5%) to account for bid variance in the market.
        const bufferedBid = requiredBid * 1.05;

        return Math.round(Math.max(bufferedBid, bidFloor) * 100) / 100;
    }

    // ------------------------------------------------------------------ //
    //  Bid change simulation
    // ------------------------------------------------------------------ //

    /**
     * Predict the impact of changing a bid.
     *
     * @param {string} categoryId
     * @param {number} currentBid
     * @param {number} newBid
     * @param {number} qualityScore
     * @param {number} currentDailyImpressions - Estimated daily impressions in this category.
     * @returns {{ oldPosition: number, newPosition: number, oldCpc: number, newCpc: number,
     *             estimatedDailyClicks: number, estimatedDailySpend: number }}
     */
    simulateBidChange(categoryId, currentBid, newBid, qualityScore, currentDailyImpressions) {
        // Run auctions for old and new bids (average several runs to smooth variance).
        const RUNS = 20;
        const aggregate = (bid) => {
            let totalPosition = 0;
            let totalCpc = 0;
            let totalShare = 0;
            for (let i = 0; i < RUNS; i++) {
                const result = this.runAuction(categoryId, bid, qualityScore);
                totalPosition += result.position;
                totalCpc += result.estimatedCpc;
                totalShare += result.impressionShare;
            }
            return {
                position: Math.round(totalPosition / RUNS),
                cpc: Math.round((totalCpc / RUNS) * 100) / 100,
                impressionShare: totalShare / RUNS,
            };
        };

        const oldResult = aggregate(currentBid);
        const newResult = aggregate(newBid);

        // Estimate clicks from impression share and a position-based CTR.
        const estimatedImpressions = currentDailyImpressions * newResult.impressionShare;
        const ctr = AuctionEngine._estimatedCtrForPosition(newResult.position);
        const estimatedDailyClicks = Math.round(estimatedImpressions * ctr);
        const estimatedDailySpend = Math.round(estimatedDailyClicks * newResult.cpc * 100) / 100;

        return {
            oldPosition: oldResult.position,
            newPosition: newResult.position,
            oldCpc: oldResult.cpc,
            newCpc: newResult.cpc,
            estimatedDailyClicks,
            estimatedDailySpend,
        };
    }

    // ------------------------------------------------------------------ //
    //  Private helpers
    // ------------------------------------------------------------------ //

    /**
     * Map a position to an impression share range and add slight randomness (+-5%).
     * @param {number} position
     * @returns {number} Impression share as a fraction (0-1).
     * @private
     */
    static _impressionShareForPosition(position) {
        let baseMin, baseMax;

        switch (position) {
            case 1:
                baseMin = 0.70;
                baseMax = 0.85;
                break;
            case 2:
                baseMin = 0.50;
                baseMax = 0.65;
                break;
            case 3:
                baseMin = 0.35;
                baseMax = 0.50;
                break;
            case 4:
                baseMin = 0.20;
                baseMax = 0.35;
                break;
            default:
                // Position 5+
                baseMin = 0.10;
                baseMax = 0.20;
                break;
        }

        // Pick a value within the range.
        const base = baseMin + Math.random() * (baseMax - baseMin);

        // Add +-5% randomness.
        const noise = (Math.random() * 2 - 1) * 0.05;
        const share = base + noise;

        // Clamp to [0.01, 1.0].
        return Math.round(Math.min(1.0, Math.max(0.01, share)) * 100) / 100;
    }

    /**
     * Rough CTR estimate by position (used for spend projections).
     * @param {number} position
     * @returns {number} Estimated CTR as a fraction.
     * @private
     */
    static _estimatedCtrForPosition(position) {
        const ctrByPosition = {
            1: 0.08,
            2: 0.05,
            3: 0.035,
            4: 0.025,
            5: 0.015,
        };
        return ctrByPosition[position] || 0.01;
    }

    /**
     * Build a histogram of bid values grouped into ranges.
     * @param {number[]} bids
     * @returns {Array<{ range: string, count: number }>}
     * @private
     */
    static _buildBidDistribution(bids) {
        if (bids.length === 0) return [];

        const minBid = Math.min(...bids);
        const maxBid = Math.max(...bids);

        // Create 5 equal-width buckets.
        const bucketCount = 5;
        const step = Math.max((maxBid - minBid) / bucketCount, 0.01);
        const buckets = [];

        for (let i = 0; i < bucketCount; i++) {
            const lo = minBid + i * step;
            const hi = i === bucketCount - 1 ? maxBid + 0.001 : minBid + (i + 1) * step;
            const label =
                '$' + lo.toFixed(2) + ' - $' + (i === bucketCount - 1 ? maxBid : hi).toFixed(2);
            const count = bids.filter((b) => b >= lo && b < hi).length;
            buckets.push({ range: label, count });
        }

        // Make sure the last bucket captures the exact max value.
        // (Already handled by the +0.001 above, but fix count if needed.)
        const lastBucket = buckets[buckets.length - 1];
        const countCheck = bids.filter(
            (b) => b >= minBid + (bucketCount - 1) * step && b <= maxBid
        ).length;
        if (lastBucket.count !== countCheck) {
            lastBucket.count = countCheck;
        }

        return buckets;
    }
}

// Export for browser usage.
window.AuctionEngine = AuctionEngine;
