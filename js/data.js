/**
 * SOCi Retention Dashboard - Data Module
 * Contains account data and filter options
 */

const Data = {
    // Filter options
    filterOptions: {
        industries: [
            "Advertising & Marketing",
            "Amusement & Recreation Services",
            "Auto Services",
            "Business Services",
            "Construction Services",
            "Education Services",
            "Financial Services",
            "Food & Beverage Services",
            "Healthcare & Other Related Services",
            "Home Services",
            "Hospitality Services",
            "Insurance Services",
            "Manufacturing & Wholesale Trade",
            "Media and Telecommunications",
            "Other",
            "Other Consumer Services",
            "Property",
            "Retail",
            "Transportation Services"
        ],
        verticals: [
            "Agency - Brand",
            "Agency - Local",
            "Agency - Reseller",
            "Brands - Affiliate",
            "Brands - Corporate Owned",
            "Brands - Franchise",
            "Other",
            "Property",
            "Property - Full Service",
            "Property - SaaS"
        ],
        accountTypes: [
            "Client",
            "Former Client",
            "Client Under Parent Account",
            "Client Under Agency",
            "Prospect",
            "Disqualified"
        ],
        tiers: ["1", "2", "3", "4", "5"],
        riskLevels: ["Critical", "High", "Medium", "Low"]
    },

    // All accounts data (sample - in production this would be loaded from API/JSON)
    accounts: [
        { id: "6095", name: "Farmers Insurance", tier: 1, accountType: "Client", industry: "Insurance Services", vertical: "Other", arr: 3778525, locations: 11993, riskScore: 15 },
        { id: "4338", name: "Pet Supplies Plus", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Franchise", arr: 2557104, locations: 801, riskScore: 12 },
        { id: "3952", name: "Ford", tier: 1, accountType: "Client", industry: "Advertising & Marketing", vertical: "Brands - Franchise", arr: 1675000, locations: 16286, riskScore: 18 },
        { id: "4708", name: "AT&T", tier: 1, accountType: "Client", industry: "Media and Telecommunications", vertical: "Brands - Franchise", arr: 1470540, locations: 24600, riskScore: 22 },
        { id: "3566", name: "Carquest", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Franchise", arr: 1075200, locations: 1037, riskScore: 25 },
        { id: "4068", name: "Jersey Mike's Subs", tier: 1, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 765073, locations: 3128, riskScore: 20 },
        { id: "5793", name: "Bitstop", tier: 1, accountType: "Former Client", industry: "Financial Services", vertical: null, arr: 511636, locations: null, riskScore: 95 },
        { id: "3711", name: "Motto Franchising, LLC", tier: 1, accountType: "Client", industry: "Financial Services", vertical: "Brands - Franchise", arr: 453576, locations: 2190, riskScore: 28 },
        { id: "4654", name: "Dick's Sporting Goods", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Corporate Owned", arr: 452325, locations: 885, riskScore: 15 },
        { id: "5196", name: "Papa John's International", tier: 1, accountType: "Former Client", industry: "Food & Beverage Services", vertical: null, arr: 412560, locations: null, riskScore: 92 },
        { id: "3924", name: "TechNet Professional", tier: 1, accountType: "Client", industry: "Auto Services", vertical: "Brands - Franchise", arr: 385022, locations: 887, riskScore: 30 },
        { id: "6382", name: "Batteries Plus, LLC", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Corporate Owned", arr: 375840, locations: 939, riskScore: 22 },
        { id: "5670", name: "National Vision (Stores)", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Franchise", arr: 366393, locations: 2024, riskScore: 25 },
        { id: "6411", name: "Comparion", tier: 1, accountType: "Client", industry: "Insurance Services", vertical: "Brands - Franchise", arr: 355200, locations: 2460, riskScore: 18 },
        { id: "4031", name: "Mattress Firm", tier: 1, accountType: "Client", industry: "Retail", vertical: "Brands - Franchise", arr: 353400, locations: 4614, riskScore: 35 },
        { id: "3479", name: "The Goddard School", tier: 1, accountType: "Client", industry: "Education Services", vertical: "Brands - Franchise", arr: 348258, locations: 674, riskScore: 20 },
        { id: "5497", name: "Smoothie King", tier: 1, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 342864, locations: 1277, riskScore: 22 },
        { id: "5320", name: "Asurion", tier: 1, accountType: "Former Client", industry: "Other Consumer Services", vertical: "Brands - Corporate Owned", arr: 228629, locations: 1667, riskScore: 88 },
        { id: "3741", name: "BIBIBOP Asian Grill", tier: 1, accountType: "Former Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 226872, locations: 70, riskScore: 90 },
        { id: "3740", name: "Charleys Philly Steaks", tier: 1, accountType: "Former Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 226872, locations: 977, riskScore: 85 },
        { id: "5080", name: "Dollar Tree", tier: 1, accountType: "Former Client", industry: "Advertising & Marketing", vertical: "Agency - Local", arr: 225092, locations: 8955, riskScore: 92 },
        { id: "3276", name: "BH Management", tier: 1, accountType: "Former Client", industry: "Property", vertical: "Property - Full Service", arr: 208018, locations: 502, riskScore: 88 },
        { id: "4091", name: "Red Robin Gourmet Burgers", tier: 2, accountType: "Former Client", industry: "Food & Beverage Services", vertical: "Brands - Corporate Owned", arr: 198522, locations: 1042, riskScore: 85 },
        { id: "4350", name: "Millennia Housing Management", tier: 2, accountType: "Former Client", industry: "Property", vertical: "Property - SaaS", arr: 187440, locations: 285, riskScore: 82 },
        { id: "4826", name: "Tidal Wave Auto Spa", tier: 2, accountType: "Former Client", industry: "Auto Services", vertical: "Brands - Corporate Owned", arr: 177216, locations: 292, riskScore: 80 },
        { id: "3176", name: "Sunridge Management", tier: 2, accountType: "Former Client", industry: "Property", vertical: "Property - SaaS", arr: 162840, locations: 272, riskScore: 78 },
        { id: "782", name: "Fogelman", tier: 2, accountType: "Former Client", industry: "Property", vertical: "Property - SaaS", arr: 157764, locations: 213, riskScore: 82 },
        { id: "6656", name: "Hyatt Hotels", tier: 2, accountType: "Former Client", industry: "Hospitality Services", vertical: "Brands - Corporate Owned", arr: 144400, locations: 2782, riskScore: 75 },
        { id: "3948", name: "Your CBD Store | SUNMED", tier: 2, accountType: "Former Client", industry: "Retail", vertical: "Brands - Franchise", arr: 129809, locations: 1228, riskScore: 88 },
        { id: "4472", name: "Rotech Healthcare", tier: 2, accountType: "Former Client", industry: "Advertising & Marketing", vertical: null, arr: 127704, locations: null, riskScore: 85 },
        // Active clients with varying risk
        { id: "4884", name: "Bob Evans", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Corporate Owned", arr: 427680, locations: 446, riskScore: 35 },
        { id: "5249", name: "Skechers", tier: 1, accountType: "Client", industry: "Retail", vertical: "Agency - Brand", arr: 413337, locations: 14998, riskScore: 28 },
        { id: "3515", name: "RPM Living", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 569004, locations: 770, riskScore: 42 },
        { id: "1343", name: "Highmark Residential", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 557388, locations: 678, riskScore: 45 },
        { id: "3901", name: "Express Services, Inc", tier: 1, accountType: "Client", industry: "Business Services", vertical: "Brands - Franchise", arr: 544720, locations: 667, riskScore: 32 },
        { id: "3723", name: "Avenue5 Residential", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 253422, locations: 980, riskScore: 48 },
        { id: "6055", name: "Olympus Property", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 248824, locations: 115, riskScore: 38 },
        { id: "4474", name: "Kairoi Residential", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 248160, locations: 125, riskScore: 52 },
        { id: "1214", name: "Gene B. Glick Company", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 245573, locations: 287, riskScore: 55 },
        { id: "1072", name: "Morgan Properties", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - Full Service", arr: 173340, locations: 739, riskScore: 48 },
        { id: "761", name: "Waterton", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - Full Service", arr: 173220, locations: 183, riskScore: 52 },
        { id: "3284", name: "Adara Communities", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 180845, locations: 93, riskScore: 58 },
        { id: "4084", name: "Valiant Residential", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 139059, locations: 219, riskScore: 62 },
        { id: "3059", name: "Mill Creek Residential", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 130111, locations: 166, riskScore: 55 },
        { id: "5628", name: "Inland Residential", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 169512, locations: 85, riskScore: 45 },
        { id: "5527", name: "Royal American Management", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 163215, locations: 378, riskScore: 50 },
        { id: "3382", name: "Price Brothers", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - Full Service", arr: 122755, locations: 99, riskScore: 58 },
        { id: "3233", name: "Draper and Kramer", tier: 2, accountType: "Client", industry: "Property", vertical: "Property - Full Service", arr: 141504, locations: 22, riskScore: 42 },
        { id: "1027", name: "WinnResidential", tier: 1, accountType: "Client", industry: "Property", vertical: "Property - Full Service", arr: 215580, locations: 403, riskScore: 38 },
        // Tier 3 accounts
        { id: "5782", name: "QC Kinetix", tier: 3, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Brands - Franchise", arr: 237224, locations: 277, riskScore: 35 },
        { id: "6960", name: "Next Care Inc", tier: 3, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Brands - Corporate Owned", arr: 182290, locations: 203, riskScore: 42 },
        { id: "3936", name: "Loyalty Brands", tier: 3, accountType: "Client Under Parent Account", industry: "Other Consumer Services", vertical: "Brands - Franchise", arr: 192960, locations: 2, riskScore: 55 },
        // Tier 4 accounts
        { id: "4029", name: "Firehouse Subs", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 305490, locations: 1423, riskScore: 28 },
        { id: "3889", name: "Code Ninjas", tier: 2, accountType: "Client", industry: "Education Services", vertical: "Brands - Franchise", arr: 303120, locations: 539, riskScore: 45 },
        { id: "6641", name: "Captain D's Seafood", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 173784, locations: 546, riskScore: 32 },
        { id: "4334", name: "Rita's Italian Ice", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 164405, locations: 618, riskScore: 38 },
        { id: "3631", name: "Teriyaki Madness", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 140784, locations: 245, riskScore: 42 },
        { id: "4814", name: "Kona Ice", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 139392, locations: 767, riskScore: 35 },
        { id: "3275", name: "Cinnaholic", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Corporate Owned", arr: 136896, locations: 150, riskScore: 48 },
        { id: "3251", name: "Nekter Juice Bar", tier: 2, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 123174, locations: 329, riskScore: 52 },
        // Tier 5 (SMB) - Higher risk
        { id: "90001", name: "Local Pizza Shop", tier: 5, accountType: "Client", industry: "Food & Beverage Services", vertical: "Brands - Franchise", arr: 12000, locations: 3, riskScore: 72 },
        { id: "90002", name: "Downtown Dental", tier: 5, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Brands - Corporate Owned", arr: 8500, locations: 1, riskScore: 78 },
        { id: "90003", name: "Quick Auto Repair", tier: 5, accountType: "Client", industry: "Auto Services", vertical: "Other", arr: 6200, locations: 2, riskScore: 82 },
        { id: "90004", name: "Family Chiropractic", tier: 5, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Other", arr: 9800, locations: 1, riskScore: 75 },
        { id: "90005", name: "Sunrise Apartments", tier: 5, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 15000, locations: 5, riskScore: 68 },
        { id: "90006", name: "Metro Fitness", tier: 5, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Other", arr: 7500, locations: 1, riskScore: 85 },
        { id: "90007", name: "Happy Paws Vet", tier: 5, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Other", arr: 11000, locations: 2, riskScore: 70 },
        { id: "90008", name: "Corner Bakery", tier: 5, accountType: "Client", industry: "Food & Beverage Services", vertical: "Other", arr: 5500, locations: 1, riskScore: 88 },
        { id: "90009", name: "Elite Salon", tier: 5, accountType: "Client", industry: "Other Consumer Services", vertical: "Other", arr: 4200, locations: 1, riskScore: 90 },
        { id: "90010", name: "City Storage", tier: 5, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 18000, locations: 8, riskScore: 65 },
        { id: "90011", name: "Premier Cleaning", tier: 5, accountType: "Former Client", industry: "Home Services", vertical: "Other", arr: 3800, locations: 1, riskScore: 95 },
        { id: "90012", name: "Local Insurance Agency", tier: 5, accountType: "Former Client", industry: "Insurance Services", vertical: "Other", arr: 6500, locations: 1, riskScore: 92 },
        { id: "90013", name: "Budget Auto Sales", tier: 5, accountType: "Former Client", industry: "Auto Services", vertical: "Other", arr: 8000, locations: 2, riskScore: 88 },
        { id: "90014", name: "Main St. Pharmacy", tier: 5, accountType: "Former Client", industry: "Retail", vertical: "Other", arr: 12500, locations: 1, riskScore: 85 },
        { id: "90015", name: "Community Bank Branch", tier: 5, accountType: "Former Client", industry: "Financial Services", vertical: "Other", arr: 9000, locations: 3, riskScore: 90 },
        // Tier 4 additional
        { id: "80001", name: "Regional Healthcare Group", tier: 4, accountType: "Client", industry: "Healthcare & Other Related Services", vertical: "Brands - Corporate Owned", arr: 45000, locations: 25, riskScore: 55 },
        { id: "80002", name: "State Farm Agents Group", tier: 4, accountType: "Client", industry: "Insurance Services", vertical: "Brands - Franchise", arr: 38000, locations: 45, riskScore: 48 },
        { id: "80003", name: "Metro Apartments LLC", tier: 4, accountType: "Client", industry: "Property", vertical: "Property - SaaS", arr: 52000, locations: 30, riskScore: 62 },
        { id: "80004", name: "Fresh Foods Market", tier: 4, accountType: "Client", industry: "Retail", vertical: "Brands - Corporate Owned", arr: 42000, locations: 18, riskScore: 58 },
        { id: "80005", name: "Comfort Suites Regional", tier: 4, accountType: "Client", industry: "Hospitality Services", vertical: "Brands - Franchise", arr: 35000, locations: 12, riskScore: 65 },
        { id: "80006", name: "Quick Lube Network", tier: 4, accountType: "Former Client", industry: "Auto Services", vertical: "Brands - Franchise", arr: 28000, locations: 22, riskScore: 88 },
        { id: "80007", name: "Downtown Properties", tier: 4, accountType: "Former Client", industry: "Property", vertical: "Property - Full Service", arr: 48000, locations: 15, riskScore: 82 },
        { id: "80008", name: "Family Dental Partners", tier: 4, accountType: "Former Client", industry: "Healthcare & Other Related Services", vertical: "Brands - Corporate Owned", arr: 55000, locations: 28, riskScore: 78 }
    ],

    /**
     * Get filtered accounts
     */
    getFilteredAccounts(filters = {}) {
        return this.accounts.filter(account => {
            // Industry filter
            if (filters.industry && filters.industry !== 'all') {
                if (account.industry !== filters.industry) return false;
            }

            // Vertical filter
            if (filters.vertical && filters.vertical !== 'all') {
                if (account.vertical !== filters.vertical) return false;
            }

            // Account type filter
            if (filters.accountType && filters.accountType !== 'all') {
                if (account.accountType !== filters.accountType) return false;
            }

            // Tier filter
            if (filters.tier && filters.tier !== 'all') {
                if (account.tier !== parseInt(filters.tier)) return false;
            }

            // Risk level filter
            if (filters.riskLevel && filters.riskLevel !== 'all') {
                const riskClass = this.getRiskLevel(account.riskScore);
                if (riskClass !== filters.riskLevel) return false;
            }

            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                if (!account.name.toLowerCase().includes(searchLower)) return false;
            }

            return true;
        });
    },

    /**
     * Get risk level from score
     */
    getRiskLevel(score) {
        if (score >= 85) return 'Critical';
        if (score >= 70) return 'High';
        if (score >= 50) return 'Medium';
        return 'Low';
    },

    /**
     * Get risk factors based on score and data
     */
    getRiskFactors(account) {
        const factors = [];
        if (account.riskScore >= 80) factors.push('Low engagement');
        if (account.riskScore >= 70) factors.push('Usage declining');
        if (account.tier >= 4) factors.push('Small account');
        if (account.industry === 'Property') factors.push('High-risk vertical');
        if (account.accountType.includes('Former')) factors.push('Churned');
        if (factors.length === 0) factors.push('Healthy');
        return factors.slice(0, 3);
    },

    /**
     * Get summary statistics
     */
    getSummaryStats(filteredAccounts = null) {
        const accounts = filteredAccounts || this.accounts;

        const clients = accounts.filter(a => a.accountType === 'Client' || a.accountType.includes('Client Under'));
        const formerClients = accounts.filter(a => a.accountType.includes('Former'));

        return {
            totalAccounts: accounts.length,
            activeClients: clients.length,
            formerClients: formerClients.length,
            churnRate: ((formerClients.length / accounts.length) * 100).toFixed(1),
            totalArr: clients.reduce((sum, a) => sum + (a.arr || 0), 0),
            lostArr: formerClients.reduce((sum, a) => sum + (a.arr || 0), 0),
            criticalRisk: accounts.filter(a => a.riskScore >= 85).length,
            highRisk: accounts.filter(a => a.riskScore >= 70 && a.riskScore < 85).length,
            mediumRisk: accounts.filter(a => a.riskScore >= 50 && a.riskScore < 70).length,
            lowRisk: accounts.filter(a => a.riskScore < 50).length
        };
    }
};
