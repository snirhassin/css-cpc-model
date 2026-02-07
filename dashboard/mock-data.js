/**
 * Mock Data Engine for CSS CPC Seller Dashboard
 * Royal Deals - Comparison Shopping Site
 *
 * Provides realistic demo data for the seller dashboard POC including
 * products, competitors, transactions, alerts, and history generators.
 */

// =============================================================================
// DEMO SELLER
// =============================================================================

const DEMO_SELLER = {
    id: 'S-RD-001',
    name: 'TechGear Direct',
    email: 'seller@techgear.com',
    marketplace: 'amazon.co.uk',
    status: 'active',
    joinDate: '2025-12-22',
    initialFunding: 500,
    currentBalance: 287.43,
    totalSpend: 212.57,
    lifetimeClicks: 1668,
    lifetimeConversions: 110,
    dailyBudgetCap: 25,
    todaySpend: 14.32,
    revShareQualification: {
        requiredSpend: 500,
        currentSpend: 212.57,
        requiredConversions: 50,
        currentConversions: 110,
        requiredRoas: 2.0,
        currentRoas: 8.2,
        requiredDays: 30,
        currentDays: 47,
        status: 'eligible',
        proposedRate: 5.5
    }
};

// =============================================================================
// DEMO PRODUCTS (8 products)
// =============================================================================

const DEMO_PRODUCTS = [
    {
        id: 'P001',
        asin: 'B0CXRT7V9K',
        title: 'TechGear USB-C Docking Station 12-in-1',
        brand: 'TechGear',
        category: 'electronics',
        price: 54.99,
        currency: 'GBP',
        bidType: 'manual',
        maxCpcBid: 0.35,
        currentEstimatedCpc: 0.28,
        estimatedPosition: 2,
        impressionShare: 0.42,
        status: 'active',
        qualityScore: 0.85,
        qualityBreakdown: {
            relevance: 0.90,
            ctr: 0.82,
            dataQuality: 0.88,
            standing: 0.80
        },
        clicks: 412,
        impressions: 5890,
        ctr: 6.99,
        conversions: 29,
        conversionRate: 7.04,
        spend: 115.36,
        revenue: 1594.71,
        roas: 13.82
    },
    {
        id: 'P002',
        asin: 'B0D3HNP8QL',
        title: 'TechGear Bluetooth Noise Cancelling Headphones',
        brand: 'TechGear',
        category: 'electronics',
        price: 39.99,
        currency: 'GBP',
        bidType: 'manual',
        maxCpcBid: 0.25,
        currentEstimatedCpc: 0.19,
        estimatedPosition: 4,
        impressionShare: 0.31,
        status: 'active',
        qualityScore: 0.78,
        qualityBreakdown: {
            relevance: 0.82,
            ctr: 0.74,
            dataQuality: 0.80,
            standing: 0.76
        },
        clicks: 318,
        impressions: 5120,
        ctr: 6.21,
        conversions: 18,
        conversionRate: 5.66,
        spend: 60.42,
        revenue: 719.82,
        roas: 11.91
    },
    {
        id: 'P003',
        asin: 'B0CW5KFMT2',
        title: 'TechGear Wireless Charging Pad 15W Fast Charge',
        brand: 'TechGear',
        category: 'electronics',
        price: 18.99,
        currency: 'GBP',
        bidType: 'category_default',
        maxCpcBid: 0.20,
        currentEstimatedCpc: 0.15,
        estimatedPosition: 6,
        impressionShare: 0.22,
        status: 'active',
        qualityScore: 0.72,
        qualityBreakdown: {
            relevance: 0.75,
            ctr: 0.68,
            dataQuality: 0.74,
            standing: 0.71
        },
        clicks: 287,
        impressions: 5340,
        ctr: 5.37,
        conversions: 21,
        conversionRate: 7.32,
        spend: 43.05,
        revenue: 398.79,
        roas: 9.26
    },
    {
        id: 'P004',
        asin: 'B0DFLR29XW',
        title: 'TechGear Mechanical Keyboard RGB Compact 75%',
        brand: 'TechGear',
        category: 'electronics',
        price: 64.99,
        currency: 'GBP',
        bidType: 'manual',
        maxCpcBid: 0.45,
        currentEstimatedCpc: 0.38,
        estimatedPosition: 3,
        impressionShare: 0.37,
        status: 'active',
        qualityScore: 0.88,
        qualityBreakdown: {
            relevance: 0.92,
            ctr: 0.86,
            dataQuality: 0.90,
            standing: 0.84
        },
        clicks: 196,
        impressions: 2640,
        ctr: 7.42,
        conversions: 15,
        conversionRate: 7.65,
        spend: 74.48,
        revenue: 974.85,
        roas: 13.09
    },
    {
        id: 'P005',
        asin: 'B0C9MTZ4PH',
        title: 'TechGear 4K Webcam with Auto-Focus and Ring Light',
        brand: 'TechGear',
        category: 'electronics',
        price: 44.99,
        currency: 'GBP',
        bidType: 'manual',
        maxCpcBid: 0.30,
        currentEstimatedCpc: 0.22,
        estimatedPosition: 5,
        impressionShare: 0.28,
        status: 'active',
        qualityScore: 0.76,
        qualityBreakdown: {
            relevance: 0.80,
            ctr: 0.72,
            dataQuality: 0.78,
            standing: 0.74
        },
        clicks: 164,
        impressions: 2730,
        ctr: 6.01,
        conversions: 9,
        conversionRate: 5.49,
        spend: 36.08,
        revenue: 404.91,
        roas: 11.22
    },
    {
        id: 'P006',
        asin: 'B0DHGW63LS',
        title: 'TechGear Ergonomic Laptop Stand Adjustable Aluminium',
        brand: 'TechGear',
        category: 'home_office',
        price: 29.99,
        currency: 'GBP',
        bidType: 'category_default',
        maxCpcBid: 0.18,
        currentEstimatedCpc: 0.14,
        estimatedPosition: 3,
        impressionShare: 0.35,
        status: 'active',
        qualityScore: 0.80,
        qualityBreakdown: {
            relevance: 0.84,
            ctr: 0.78,
            dataQuality: 0.82,
            standing: 0.76
        },
        clicks: 168,
        impressions: 2800,
        ctr: 6.00,
        conversions: 12,
        conversionRate: 7.14,
        spend: 23.52,
        revenue: 359.88,
        roas: 15.30
    },
    {
        id: 'P007',
        asin: 'B0DJKR72NB',
        title: 'TechGear USB-C to HDMI Cable 2m Braided 4K@60Hz',
        brand: 'TechGear',
        category: 'electronics',
        price: 12.99,
        currency: 'GBP',
        bidType: 'category_default',
        maxCpcBid: 0.15,
        currentEstimatedCpc: 0.11,
        estimatedPosition: 8,
        impressionShare: 0.18,
        status: 'paused',
        qualityScore: 0.55,
        qualityBreakdown: {
            relevance: 0.60,
            ctr: 0.48,
            dataQuality: 0.58,
            standing: 0.54
        },
        clicks: 56,
        impressions: 1320,
        ctr: 4.24,
        conversions: 2,
        conversionRate: 3.57,
        spend: 6.16,
        revenue: 25.98,
        roas: 4.22
    },
    {
        id: 'P008',
        asin: 'B0DKL8P3QV',
        title: 'TechGear Monitor Arm Single Gas Spring Desk Mount',
        brand: 'TechGear',
        category: 'home_office',
        price: 34.99,
        currency: 'GBP',
        bidType: 'manual',
        maxCpcBid: 0.55,
        currentEstimatedCpc: 0.42,
        estimatedPosition: 1,
        impressionShare: 0.48,
        status: 'active',
        qualityScore: 0.82,
        qualityBreakdown: {
            relevance: 0.86,
            ctr: 0.80,
            dataQuality: 0.84,
            standing: 0.78
        },
        clicks: 67,
        impressions: 980,
        ctr: 6.84,
        conversions: 4,
        conversionRate: 5.97,
        spend: 28.14,
        revenue: 139.96,
        roas: 4.97
    }
];

// =============================================================================
// MOCK COMPETITORS (keyed by category)
// =============================================================================

const MOCK_COMPETITORS = {
    electronics: [
        { name: 'GadgetWorld UK', baseBid: 0.32, qualityScore: 0.81 },
        { name: 'ByteShop Direct', baseBid: 0.28, qualityScore: 0.74 },
        { name: 'CircuitHub', baseBid: 0.41, qualityScore: 0.69 },
        { name: 'PixelMart', baseBid: 0.22, qualityScore: 0.86 },
        { name: 'VoltEdge', baseBid: 0.37, qualityScore: 0.72 },
        { name: 'SmartBuys Electronics', baseBid: 0.19, qualityScore: 0.78 },
        { name: 'NovaTech Deals', baseBid: 0.45, qualityScore: 0.65 }
    ],
    home_office: [
        { name: 'DeskPro UK', baseBid: 0.24, qualityScore: 0.83 },
        { name: 'WorkSpace Essentials', baseBid: 0.18, qualityScore: 0.77 },
        { name: 'OfficeFit Direct', baseBid: 0.30, qualityScore: 0.70 }
    ]
};

// =============================================================================
// BID FLOORS (by category)
// =============================================================================

const BID_FLOORS = {
    electronics: 0.08,
    home_office: 0.06,
    kitchen: 0.07,
    health_beauty: 0.05,
    sports_outdoors: 0.06,
    toys_games: 0.05,
    garden: 0.05,
    automotive: 0.09,
    clothing: 0.04,
    books_media: 0.03
};

// =============================================================================
// DEMO ALERTS (6 alerts)
// =============================================================================

const DEMO_ALERTS = [
    {
        id: 'A001',
        type: 'warning',
        message: 'Product B0DJKR72NB (USB-C to HDMI Cable) has been paused due to low quality score (0.55). Improve data quality to reactivate.',
        time: '2026-02-07T09:14:00Z',
        read: false
    },
    {
        id: 'A002',
        type: 'success',
        message: 'Congratulations! You are now eligible for Revenue Share. Your Account Manager will reach out to discuss a proposed rate of 5.5%.',
        time: '2026-02-06T16:30:00Z',
        read: false
    },
    {
        id: 'A003',
        type: 'info',
        message: 'Your daily budget cap of $25.00 was reached yesterday. Consider increasing your cap to capture more high-intent traffic.',
        time: '2026-02-06T08:00:00Z',
        read: true
    },
    {
        id: 'A004',
        type: 'success',
        message: 'Product B0CXRT7V9K (USB-C Docking Station) achieved a 13.82x ROAS this month. Top performer in the electronics category.',
        time: '2026-02-05T11:22:00Z',
        read: true
    },
    {
        id: 'A005',
        type: 'info',
        message: 'New competitor detected in electronics category. Average CPC in your category has increased by 4.2% this week.',
        time: '2026-02-04T14:45:00Z',
        read: true
    },
    {
        id: 'A006',
        type: 'warning',
        message: 'Your account balance is below $300. Consider topping up to maintain uninterrupted traffic. Current balance: $287.43.',
        time: '2026-02-03T10:00:00Z',
        read: true
    }
];

// =============================================================================
// DEMO TRANSACTIONS (15 transactions: deposits and daily CPC charges)
// =============================================================================

const DEMO_TRANSACTIONS = [
    {
        id: 'TXN-001',
        type: 'deposit',
        amount: 500.00,
        balance: 500.00,
        description: 'Initial account funding',
        date: '2025-12-22T10:30:00Z'
    },
    {
        id: 'TXN-002',
        type: 'cpc_charge',
        amount: -3.78,
        balance: 496.22,
        description: 'Daily CPC charges - 27 clicks across 3 products',
        date: '2025-12-23T23:59:00Z'
    },
    {
        id: 'TXN-003',
        type: 'cpc_charge',
        amount: -2.94,
        balance: 493.28,
        description: 'Daily CPC charges - 21 clicks across 4 products',
        date: '2025-12-24T23:59:00Z'
    },
    {
        id: 'TXN-004',
        type: 'cpc_charge',
        amount: -1.26,
        balance: 492.02,
        description: 'Daily CPC charges - 9 clicks across 2 products (Christmas Day dip)',
        date: '2025-12-25T23:59:00Z'
    },
    {
        id: 'TXN-005',
        type: 'cpc_charge',
        amount: -4.15,
        balance: 487.87,
        description: 'Daily CPC charges - 32 clicks across 5 products',
        date: '2025-12-26T23:59:00Z'
    },
    {
        id: 'TXN-006',
        type: 'cpc_charge',
        amount: -5.67,
        balance: 482.20,
        description: 'Daily CPC charges - 38 clicks across 6 products',
        date: '2025-12-30T23:59:00Z'
    },
    {
        id: 'TXN-007',
        type: 'cpc_charge',
        amount: -6.23,
        balance: 475.97,
        description: 'Daily CPC charges - 41 clicks across 7 products',
        date: '2026-01-03T23:59:00Z'
    },
    {
        id: 'TXN-008',
        type: 'cpc_charge',
        amount: -5.89,
        balance: 470.08,
        description: 'Daily CPC charges - 39 clicks across 6 products',
        date: '2026-01-07T23:59:00Z'
    },
    {
        id: 'TXN-009',
        type: 'cpc_charge',
        amount: -7.12,
        balance: 462.96,
        description: 'Daily CPC charges - 46 clicks across 8 products',
        date: '2026-01-10T23:59:00Z'
    },
    {
        id: 'TXN-010',
        type: 'cpc_charge',
        amount: -6.84,
        balance: 456.12,
        description: 'Daily CPC charges - 44 clicks across 7 products',
        date: '2026-01-14T23:59:00Z'
    },
    {
        id: 'TXN-011',
        type: 'cpc_charge',
        amount: -8.05,
        balance: 448.07,
        description: 'Daily CPC charges - 52 clicks across 8 products (January sale boost)',
        date: '2026-01-17T23:59:00Z'
    },
    {
        id: 'TXN-012',
        type: 'cpc_charge',
        amount: -7.43,
        balance: 440.64,
        description: 'Daily CPC charges - 48 clicks across 7 products',
        date: '2026-01-21T23:59:00Z'
    },
    {
        id: 'TXN-013',
        type: 'cpc_charge',
        amount: -6.91,
        balance: 433.73,
        description: 'Daily CPC charges - 45 clicks across 7 products',
        date: '2026-01-28T23:59:00Z'
    },
    {
        id: 'TXN-014',
        type: 'cpc_charge',
        amount: -7.68,
        balance: 426.05,
        description: 'Daily CPC charges - 49 clicks across 8 products',
        date: '2026-02-03T23:59:00Z'
    },
    {
        id: 'TXN-015',
        type: 'cpc_charge',
        amount: -14.32,
        balance: 287.43,
        description: 'Daily CPC charges - 58 clicks across 8 products (today, in-progress)',
        date: '2026-02-07T14:00:00Z'
    }
];

// =============================================================================
// DAILY HISTORY GENERATOR (account-level)
// =============================================================================

/**
 * Generates daily mock performance data for the full account.
 * Includes weekend dips and random variance for realism.
 *
 * @param {Array} products - Array of product objects (DEMO_PRODUCTS)
 * @param {number} days - Number of days of history to generate
 * @returns {Array} Array of daily data objects sorted oldest-to-newest
 */
function generateDailyHistory(products, days) {
    const history = [];
    const today = new Date('2026-02-07');
    const activeProducts = products.filter(p => p.status === 'active');

    // Compute a weighted average CPC from all active products
    const totalClicks = activeProducts.reduce((sum, p) => sum + p.clicks, 0);
    const weightedCpc = activeProducts.reduce((sum, p) => sum + (p.currentEstimatedCpc * p.clicks), 0) / totalClicks;

    // Average daily baseline derived from lifetime stats spread across the seller's active days
    const baselineDailyClicks = DEMO_SELLER.lifetimeClicks / DEMO_SELLER.revShareQualification.currentDays;
    const baselineConversionRate = DEMO_SELLER.lifetimeConversions / DEMO_SELLER.lifetimeClicks;

    // Weighted average product price for revenue estimation
    const weightedPrice = activeProducts.reduce((sum, p) => sum + (p.price * p.conversions), 0)
        / activeProducts.reduce((sum, p) => sum + p.conversions, 0);

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Weekend dip: ~35% reduction in traffic
        const weekendMultiplier = isWeekend ? 0.65 : 1.0;

        // Random daily variance: +/- 20%
        const variance = 0.8 + (Math.random() * 0.4);

        // Gradual ramp-up for early days (first 2 weeks of account life)
        const daysSinceJoin = Math.floor((date - new Date('2025-12-22')) / (1000 * 60 * 60 * 24));
        const rampUp = daysSinceJoin < 14 ? 0.4 + (daysSinceJoin / 14) * 0.6 : 1.0;

        const dailyClicks = Math.max(1, Math.round(baselineDailyClicks * weekendMultiplier * variance * rampUp));
        const dailyImpressions = Math.round(dailyClicks / (0.055 + Math.random() * 0.025)); // CTR between 5.5-8%
        const dailySpend = parseFloat((dailyClicks * weightedCpc * (0.9 + Math.random() * 0.2)).toFixed(2));
        const dailyConversions = Math.max(0, Math.round(dailyClicks * baselineConversionRate * (0.7 + Math.random() * 0.6)));
        const dailyRevenue = parseFloat((dailyConversions * weightedPrice * (0.85 + Math.random() * 0.3)).toFixed(2));
        const dailyRoas = dailySpend > 0 ? parseFloat((dailyRevenue / dailySpend).toFixed(2)) : 0;

        history.push({
            date: date.toISOString().split('T')[0],
            clicks: dailyClicks,
            impressions: dailyImpressions,
            spend: dailySpend,
            conversions: dailyConversions,
            revenue: dailyRevenue,
            roas: dailyRoas
        });
    }

    return history;
}

// =============================================================================
// PER-PRODUCT DAILY HISTORY GENERATOR
// =============================================================================

/**
 * Generates daily mock performance data for a single product.
 * Includes weekend dips and random variance for realism.
 *
 * @param {Object} product - A single product object from DEMO_PRODUCTS
 * @param {number} days - Number of days of history to generate
 * @returns {Array} Array of daily data objects sorted oldest-to-newest
 */
function generateProductDailyHistory(product, days) {
    const history = [];
    const today = new Date('2026-02-07');

    // Derive daily baseline from the product's lifetime stats
    const sellerActiveDays = DEMO_SELLER.revShareQualification.currentDays;
    const baselineDailyClicks = product.clicks / sellerActiveDays;
    const productConversionRate = product.conversions / product.clicks;

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Weekend dip
        const weekendMultiplier = isWeekend ? 0.65 : 1.0;

        // Random variance +/- 25%
        const variance = 0.75 + (Math.random() * 0.5);

        // Ramp-up for early days
        const daysSinceJoin = Math.floor((date - new Date('2025-12-22')) / (1000 * 60 * 60 * 24));
        const rampUp = daysSinceJoin < 14 ? 0.4 + (daysSinceJoin / 14) * 0.6 : 1.0;

        // Paused products get zero traffic for recent days
        let pausedMultiplier = 1.0;
        if (product.status === 'paused' && i < 7) {
            pausedMultiplier = 0;
        }

        const dailyClicks = Math.max(0, Math.round(baselineDailyClicks * weekendMultiplier * variance * rampUp * pausedMultiplier));
        const dailyImpressions = dailyClicks > 0
            ? Math.round(dailyClicks / ((product.ctr / 100) * (0.85 + Math.random() * 0.3)))
            : 0;
        const dailySpend = parseFloat((dailyClicks * product.currentEstimatedCpc * (0.9 + Math.random() * 0.2)).toFixed(2));
        const dailyConversions = dailyClicks > 0
            ? Math.max(0, Math.round(dailyClicks * productConversionRate * (0.6 + Math.random() * 0.8)))
            : 0;
        const dailyRevenue = parseFloat((dailyConversions * product.price).toFixed(2));
        const dailyRoas = dailySpend > 0 ? parseFloat((dailyRevenue / dailySpend).toFixed(2)) : 0;

        history.push({
            date: date.toISOString().split('T')[0],
            clicks: dailyClicks,
            impressions: dailyImpressions,
            spend: dailySpend,
            conversions: dailyConversions,
            revenue: dailyRevenue,
            roas: dailyRoas
        });
    }

    return history;
}

// =============================================================================
// EXPORT / MAKE AVAILABLE GLOBALLY
// =============================================================================

// Support both module exports and browser global scope
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEMO_SELLER,
        DEMO_PRODUCTS,
        MOCK_COMPETITORS,
        BID_FLOORS,
        DEMO_ALERTS,
        DEMO_TRANSACTIONS,
        generateDailyHistory,
        generateProductDailyHistory
    };
}
