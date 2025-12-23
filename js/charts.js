/**
 * SOCi Retention Dashboard - Charts Module
 * Interactive visualizations using Chart.js
 */

const Charts = {
    // Chart instances storage
    instances: {},

    // Color palette
    colors: {
        primary: '#6366f1',
        primaryLight: '#818cf8',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        gray: '#6b7280',
        gradientBlue: ['rgba(99, 102, 241, 0.8)', 'rgba(99, 102, 241, 0.2)'],
        gradientRed: ['rgba(239, 68, 68, 0.8)', 'rgba(239, 68, 68, 0.2)'],
        gradientGreen: ['rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.2)']
    },

    // Default chart options
    defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleFont: { size: 13, weight: '600' },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 8,
                displayColors: true
            }
        }
    },

    /**
     * Initialize all charts
     */
    init() {
        // Set Chart.js defaults
        Chart.defaults.font.family = "'Inter', sans-serif";

        // Create all charts
        this.createChurnByTierChart();
        this.createClientDistributionChart();
        this.createChurnByVerticalChart();
        this.createIndustryChurnChart();
        this.createArrDistributionChart();
        this.createChurnByArrChart();
        this.createEngagementRadarChart();
        this.createSocialMetricsChart();
        this.createNpsChart();
        this.createSupportTicketsChart();
    },

    /**
     * Create gradient for charts
     */
    createGradient(ctx, color1, color2, vertical = true) {
        const gradient = vertical
            ? ctx.createLinearGradient(0, 0, 0, 300)
            : ctx.createLinearGradient(0, 0, 300, 0);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    },

    /**
     * Churn Rate by Customer Tier - Horizontal Bar Chart
     */
    createChurnByTierChart() {
        const ctx = document.getElementById('churnByTierChart');
        if (!ctx) return;

        const data = {
            labels: ['Tier 5 (SMB)', 'Tier 4', 'Tier 3', 'Tier 2', 'Tier 1 (Enterprise)'],
            datasets: [{
                label: 'Churn Rate %',
                data: [36.8, 20.9, 10.5, 8.7, 7.5],
                backgroundColor: [
                    this.colors.danger,
                    '#f97316',
                    this.colors.warning,
                    '#84cc16',
                    this.colors.success
                ],
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 32
            }]
        };

        this.instances.churnByTier = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: (context) => `Churn Rate: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: (value) => value + '%'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Client Distribution - Doughnut Chart
     */
    createClientDistributionChart() {
        const ctx = document.getElementById('clientDistributionChart');
        if (!ctx) return;

        const data = {
            labels: ['Active Clients', 'Former Clients'],
            datasets: [{
                data: [833, 168],
                backgroundColor: [this.colors.primary, this.colors.danger],
                borderWidth: 0,
                cutout: '70%'
            }]
        };

        this.instances.clientDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: ${context.raw} (${percentage}%)`;
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'centerText',
                beforeDraw: (chart) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = "bold 24px Inter";
                    ctx.fillStyle = '#1f2937';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillText('1,001', width / 2, height / 2 - 10);
                    ctx.font = "13px Inter";
                    ctx.fillStyle = '#6b7280';
                    ctx.fillText('Total Accounts', width / 2, height / 2 + 15);
                    ctx.save();
                }
            }]
        });
    },

    /**
     * Churn by Vertical - Bar Chart
     */
    createChurnByVerticalChart() {
        const ctx = document.getElementById('churnByVerticalChart');
        if (!ctx) return;

        const data = {
            labels: ['Property', 'Prop. Full Svc', 'Agency Local', 'Prop. SaaS', 'Brands Corp', 'Brands Fran.'],
            datasets: [{
                label: 'Churn Rate',
                data: [83.3, 26.3, 25.0, 20.8, 17.9, 8.1],
                backgroundColor: (context) => {
                    const value = context.raw;
                    if (value >= 50) return this.colors.danger;
                    if (value >= 25) return '#f97316';
                    if (value >= 15) return this.colors.warning;
                    return this.colors.success;
                },
                borderRadius: 4,
                barThickness: 28
            }]
        };

        this.instances.churnByVertical = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: (context) => `Churn Rate: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    },

    /**
     * Industry Churn Chart
     */
    createIndustryChurnChart() {
        const ctx = document.getElementById('industryChurnChart');
        if (!ctx) return;

        const data = {
            labels: ['Property', 'Healthcare', 'Retail', 'Mfg & Trade', 'Financial', 'Food & Bev'],
            datasets: [
                {
                    label: 'Clients',
                    data: [144, 67, 89, 70, 58, 130],
                    backgroundColor: this.colors.primary,
                    borderRadius: 4
                },
                {
                    label: 'Former Clients',
                    data: [50, 17, 18, 13, 7, 13],
                    backgroundColor: this.colors.danger,
                    borderRadius: 4
                }
            ]
        };

        this.instances.industryChurn = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    },

    /**
     * ARR Distribution Chart
     */
    createArrDistributionChart() {
        const ctx = document.getElementById('arrDistributionChart');
        if (!ctx) return;

        const data = {
            labels: ['<$20k', '$20k-$50k', '$50k-$100k', '$100k-$200k', '$200k+'],
            datasets: [
                {
                    label: 'Active Clients',
                    data: [103, 201, 229, 126, 174],
                    backgroundColor: this.colors.primary,
                    borderRadius: 4
                },
                {
                    label: 'Former Clients',
                    data: [60, 53, 27, 12, 16],
                    backgroundColor: this.colors.danger,
                    borderRadius: 4
                }
            ]
        };

        this.instances.arrDistribution = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Accounts'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'ARR Range'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Churn by ARR Tier - Horizontal Bar
     */
    createChurnByArrChart() {
        const ctx = document.getElementById('churnByArrChart');
        if (!ctx) return;

        const data = {
            labels: ['<$20k', '$20k-$50k', '$50k-$100k', '$100k-$200k', '$200k+'],
            datasets: [{
                label: 'Churn Rate',
                data: [36.8, 20.9, 10.5, 8.7, 8.4],
                backgroundColor: [
                    this.colors.danger,
                    '#f97316',
                    this.colors.warning,
                    '#84cc16',
                    this.colors.success
                ],
                borderRadius: 6
            }]
        };

        this.instances.churnByArr = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: (context) => `Churn Rate: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: (value) => value + '%'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Engagement Radar Chart
     */
    createEngagementRadarChart() {
        const ctx = document.getElementById('engagementRadarChart');
        if (!ctx) return;

        const data = {
            labels: ['Ads Spend', 'Social Posts', 'Impressions', 'Engagement Rate', 'Reviews'],
            datasets: [
                {
                    label: 'Active Clients',
                    data: [100, 100, 100, 100, 100],
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: this.colors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: this.colors.primary,
                    pointBorderColor: '#fff',
                    pointRadius: 4
                },
                {
                    label: 'Former Clients',
                    data: [10, 38, 13, 32, 95],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: this.colors.danger,
                    borderWidth: 2,
                    pointBackgroundColor: this.colors.danger,
                    pointBorderColor: '#fff',
                    pointRadius: 4
                }
            ]
        };

        this.instances.engagementRadar = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            display: false
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    },

    /**
     * Social Metrics Chart
     */
    createSocialMetricsChart() {
        const ctx = document.getElementById('socialMetricsChart');
        if (!ctx) return;

        const data = {
            labels: ['Avg Posts', 'Avg Reach (k)', 'Engagement %'],
            datasets: [
                {
                    label: 'Clients',
                    data: [330, 102, 11.4],
                    backgroundColor: this.colors.primary,
                    borderRadius: 4
                },
                {
                    label: 'Former Clients',
                    data: [126, 11, 3.6],
                    backgroundColor: this.colors.danger,
                    borderRadius: 4
                }
            ]
        };

        this.instances.socialMetrics = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * NPS Chart
     */
    createNpsChart() {
        const ctx = document.getElementById('npsChart');
        if (!ctx) return;

        const data = {
            labels: ['Promoters', 'Passives', 'Detractors'],
            datasets: [
                {
                    label: 'Clients',
                    data: [4966, 1949, 3177],
                    backgroundColor: [this.colors.success, this.colors.warning, this.colors.danger],
                    borderRadius: 4
                }
            ]
        };

        this.instances.nps = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Support Tickets Chart
     */
    createSupportTicketsChart() {
        const ctx = document.getElementById('supportTicketsChart');
        if (!ctx) return;

        const data = {
            labels: ['Tier 1', 'Tier 2', 'Tier 3'],
            datasets: [
                {
                    label: 'Clients',
                    data: [6604, 4539, 3750],
                    backgroundColor: this.colors.primary,
                    borderRadius: 4
                },
                {
                    label: 'Former Clients',
                    data: [291, 228, 122],
                    backgroundColor: this.colors.danger,
                    borderRadius: 4
                }
            ]
        };

        this.instances.supportTickets = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Destroy all charts (useful for cleanup)
     */
    destroyAll() {
        Object.values(this.instances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.instances = {};
    },

    /**
     * Update all charts based on filtered data
     */
    updateAllCharts(filters) {
        const filteredAccounts = Data.getFilteredAccounts(filters);
        const stats = Data.getSummaryStats(filteredAccounts);

        // Update Client Distribution Chart
        this.updateClientDistribution(filteredAccounts, stats);

        // Update Churn by Tier Chart
        this.updateChurnByTier(filteredAccounts);

        // Update Churn by Vertical Chart
        this.updateChurnByVertical(filteredAccounts);

        // Update Industry Churn Chart
        this.updateIndustryChurn(filteredAccounts);
    },

    /**
     * Update Client Distribution Chart
     */
    updateClientDistribution(filteredAccounts, stats) {
        if (!this.instances.clientDistribution) return;

        this.instances.clientDistribution.data.datasets[0].data = [stats.activeClients, stats.formerClients];

        // Update center text plugin
        this.instances.clientDistribution.options.plugins = {
            ...this.instances.clientDistribution.options.plugins
        };

        // Update center text
        const totalAccounts = stats.activeClients + stats.formerClients;
        this.instances.clientDistribution.config.plugins = [{
            id: 'centerText',
            beforeDraw: (chart) => {
                const { width, height, ctx } = chart;
                ctx.restore();
                ctx.font = "bold 24px Inter";
                ctx.fillStyle = '#1f2937';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillText(totalAccounts.toLocaleString(), width / 2, height / 2 - 10);
                ctx.font = "13px Inter";
                ctx.fillStyle = '#6b7280';
                ctx.fillText('Total Accounts', width / 2, height / 2 + 15);
                ctx.save();
            }
        }];

        this.instances.clientDistribution.update();
    },

    /**
     * Update Churn by Tier Chart
     */
    updateChurnByTier(filteredAccounts) {
        if (!this.instances.churnByTier) return;

        // Calculate churn rate per tier
        const tiers = [5, 4, 3, 2, 1];
        const churnRates = tiers.map(tier => {
            const tierAccounts = filteredAccounts.filter(a => a.tier === tier);
            if (tierAccounts.length === 0) return 0;
            const churned = tierAccounts.filter(a => a.accountType.includes('Former')).length;
            return parseFloat(((churned / tierAccounts.length) * 100).toFixed(1));
        });

        this.instances.churnByTier.data.datasets[0].data = churnRates;
        this.instances.churnByTier.update();
    },

    /**
     * Update Churn by Vertical Chart
     */
    updateChurnByVertical(filteredAccounts) {
        if (!this.instances.churnByVertical) return;

        const verticals = ['Property', 'Property - Full Service', 'Agency - Local', 'Property - SaaS', 'Brands - Corporate Owned', 'Brands - Franchise'];
        const shortLabels = ['Property', 'Prop. Full Svc', 'Agency Local', 'Prop. SaaS', 'Brands Corp', 'Brands Fran.'];

        const churnRates = verticals.map(vertical => {
            const verticalAccounts = filteredAccounts.filter(a => a.vertical === vertical);
            if (verticalAccounts.length === 0) return 0;
            const churned = verticalAccounts.filter(a => a.accountType.includes('Former')).length;
            return parseFloat(((churned / verticalAccounts.length) * 100).toFixed(1));
        });

        this.instances.churnByVertical.data.labels = shortLabels;
        this.instances.churnByVertical.data.datasets[0].data = churnRates;
        this.instances.churnByVertical.update();
    },

    /**
     * Update Industry Churn Chart
     */
    updateIndustryChurn(filteredAccounts) {
        if (!this.instances.industryChurn) return;

        const industries = ['Property', 'Healthcare & Other Related Services', 'Retail', 'Manufacturing & Wholesale Trade', 'Financial Services', 'Food & Beverage Services'];
        const shortLabels = ['Property', 'Healthcare', 'Retail', 'Mfg & Trade', 'Financial', 'Food & Bev'];

        const clientCounts = industries.map(industry => {
            return filteredAccounts.filter(a => a.industry === industry && !a.accountType.includes('Former')).length;
        });

        const formerCounts = industries.map(industry => {
            return filteredAccounts.filter(a => a.industry === industry && a.accountType.includes('Former')).length;
        });

        this.instances.industryChurn.data.labels = shortLabels;
        this.instances.industryChurn.data.datasets[0].data = clientCounts;
        this.instances.industryChurn.data.datasets[1].data = formerCounts;
        this.instances.industryChurn.update();
    }
};
