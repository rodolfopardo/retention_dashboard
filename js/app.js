/**
 * SOCi Retention Dashboard - Main Application
 * With filtering support
 */

const App = {
    initialized: false,
    currentFilters: {
        industry: 'all',
        vertical: 'all',
        tier: 'all',
        accountType: 'all',
        riskLevel: 'all',
        search: ''
    },

    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;

        // Initialize filter dropdowns
        this.initFilters();

        // Initialize charts
        Charts.init();

        // Bind events
        this.bindEvents();

        // Animate KPIs
        this.animateKPIs();

        // Populate risk table with all data
        this.populateRiskTable();

        // Update risk summary counts
        this.updateRiskSummary();

        // Set up activity tracking for session extension
        this.trackActivity();

        this.initialized = true;
    },

    /**
     * Initialize filter dropdowns with data
     */
    initFilters() {
        // Populate Industry filter
        const industrySelect = document.getElementById('filterIndustry');
        if (industrySelect && Data.filterOptions.industries) {
            Data.filterOptions.industries.forEach(industry => {
                const option = document.createElement('option');
                option.value = industry;
                option.textContent = industry;
                industrySelect.appendChild(option);
            });
        }

        // Populate Vertical filter
        const verticalSelect = document.getElementById('filterVertical');
        if (verticalSelect && Data.filterOptions.verticals) {
            Data.filterOptions.verticals.forEach(vertical => {
                const option = document.createElement('option');
                option.value = vertical;
                option.textContent = vertical;
                verticalSelect.appendChild(option);
            });
        }
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Sidebar toggle (mobile)
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Global filters
        const filterIndustry = document.getElementById('filterIndustry');
        const filterVertical = document.getElementById('filterVertical');
        const filterTier = document.getElementById('filterTier');
        const filterType = document.getElementById('filterType');
        const clearFilters = document.getElementById('clearFilters');

        if (filterIndustry) filterIndustry.addEventListener('change', (e) => this.handleFilterChange('industry', e.target.value));
        if (filterVertical) filterVertical.addEventListener('change', (e) => this.handleFilterChange('vertical', e.target.value));
        if (filterTier) filterTier.addEventListener('change', (e) => this.handleFilterChange('tier', e.target.value));
        if (filterType) filterType.addEventListener('change', (e) => this.handleFilterChange('accountType', e.target.value));
        if (clearFilters) clearFilters.addEventListener('click', () => this.clearAllFilters());

        // Risk level filter
        const filterRiskLevel = document.getElementById('filterRiskLevel');
        if (filterRiskLevel) filterRiskLevel.addEventListener('change', (e) => this.handleFilterChange('riskLevel', e.target.value));

        // Search accounts
        const searchInput = document.getElementById('searchAccounts');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleFilterChange('search', e.target.value));
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToCSV());
        }

        // Risk cards clickable
        const riskCards = document.querySelectorAll('.risk-card');
        riskCards.forEach(card => {
            card.addEventListener('click', () => {
                const riskLevel = card.classList.contains('critical') ? 'Critical' :
                                  card.classList.contains('high') ? 'High' :
                                  card.classList.contains('medium') ? 'Medium' : 'Low';
                const riskSelect = document.getElementById('filterRiskLevel');
                if (riskSelect) {
                    riskSelect.value = riskLevel;
                    this.handleFilterChange('riskLevel', riskLevel);
                }
            });
            card.style.cursor = 'pointer';
        });
    },

    /**
     * Handle filter change
     */
    handleFilterChange(filterName, value) {
        this.currentFilters[filterName] = value;
        this.applyFilters();
    },

    /**
     * Apply all current filters
     */
    applyFilters() {
        this.populateRiskTable();
        this.updateRiskSummary();
    },

    /**
     * Clear all filters
     */
    clearAllFilters() {
        this.currentFilters = {
            industry: 'all',
            vertical: 'all',
            tier: 'all',
            accountType: 'all',
            riskLevel: 'all',
            search: ''
        };

        // Reset select elements
        document.getElementById('filterIndustry').value = 'all';
        document.getElementById('filterVertical').value = 'all';
        document.getElementById('filterTier').value = 'all';
        document.getElementById('filterType').value = 'all';
        document.getElementById('filterRiskLevel').value = 'all';
        document.getElementById('searchAccounts').value = '';

        this.applyFilters();
    },

    /**
     * Handle navigation between sections
     */
    handleNavigation(e) {
        e.preventDefault();

        const target = e.currentTarget;
        const sectionId = target.getAttribute('data-section');

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        target.classList.add('active');

        // Show target section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = target.querySelector('span').textContent;
        }

        // Close sidebar on mobile
        if (window.innerWidth < 1024) {
            this.toggleSidebar(false);
        }
    },

    /**
     * Toggle sidebar (mobile)
     */
    toggleSidebar(show = null) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            if (show === null) {
                sidebar.classList.toggle('open');
            } else {
                sidebar.classList.toggle('open', show);
            }
        }
    },

    /**
     * Animate KPI counters
     */
    animateKPIs() {
        const kpiValues = document.querySelectorAll('.kpi-value');

        kpiValues.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const isCurrency = element.classList.contains('kpi-currency');
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                if (isCurrency) {
                    element.textContent = '$' + this.formatNumber(current);
                } else {
                    element.textContent = this.formatNumber(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    },

    /**
     * Format number with commas
     */
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        return num.toLocaleString();
    },

    /**
     * Update risk summary cards
     */
    updateRiskSummary() {
        const filteredAccounts = Data.getFilteredAccounts(this.currentFilters);
        const stats = Data.getSummaryStats(filteredAccounts);

        // Update risk counts
        const criticalCount = document.querySelector('.risk-card.critical .risk-count');
        const highCount = document.querySelector('.risk-card.high .risk-count');
        const mediumCount = document.querySelector('.risk-card.medium .risk-count');
        const lowCount = document.querySelector('.risk-card.low .risk-count');

        if (criticalCount) criticalCount.textContent = stats.criticalRisk;
        if (highCount) highCount.textContent = stats.highRisk;
        if (mediumCount) mediumCount.textContent = stats.mediumRisk;
        if (lowCount) lowCount.textContent = stats.lowRisk;
    },

    /**
     * Populate risk accounts table
     */
    populateRiskTable() {
        const tbody = document.getElementById('riskTableBody');
        if (!tbody) return;

        // Get filtered accounts
        const filteredAccounts = Data.getFilteredAccounts(this.currentFilters);

        // Sort by risk score descending
        const sortedAccounts = [...filteredAccounts].sort((a, b) => b.riskScore - a.riskScore);

        if (sortedAccounts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                        No accounts match the current filters
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = sortedAccounts.map(account => {
            const riskClass = this.getRiskClass(account.riskScore);
            const factors = Data.getRiskFactors(account);

            return `
                <tr>
                    <td><strong>${account.name}</strong></td>
                    <td>Tier ${account.tier || '-'}</td>
                    <td>${account.vertical || '-'}</td>
                    <td>$${(account.arr || 0).toLocaleString()}</td>
                    <td>
                        <span class="risk-badge ${riskClass}">
                            ${account.riskScore}
                        </span>
                    </td>
                    <td>
                        <div class="risk-factors">
                            ${factors.map(f => `<span class="factor-tag">${f}</span>`).join('')}
                        </div>
                    </td>
                    <td>
                        <button class="btn-view" onclick="App.viewAccount('${account.name}')">
                            View
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    /**
     * Get risk class based on score
     */
    getRiskClass(score) {
        if (score >= 85) return 'critical';
        if (score >= 70) return 'high';
        if (score >= 50) return 'medium';
        return 'low';
    },

    /**
     * View account details (placeholder)
     */
    viewAccount(accountName) {
        const account = Data.accounts.find(a => a.name === accountName);
        if (account) {
            alert(`Account Details: ${accountName}\n\nTier: ${account.tier}\nIndustry: ${account.industry || 'N/A'}\nVertical: ${account.vertical || 'N/A'}\nARR: $${(account.arr || 0).toLocaleString()}\nRisk Score: ${account.riskScore}\nType: ${account.accountType}`);
        }
    },

    /**
     * Export data to CSV
     */
    exportToCSV() {
        const filteredAccounts = Data.getFilteredAccounts(this.currentFilters);
        const sortedAccounts = [...filteredAccounts].sort((a, b) => b.riskScore - a.riskScore);

        const headers = ['Account Name', 'Tier', 'Vertical', 'Industry', 'ARR', 'Risk Score', 'Account Type', 'Risk Factors'];
        const rows = sortedAccounts.map(a => [
            a.name,
            `Tier ${a.tier || '-'}`,
            a.vertical || '-',
            a.industry || '-',
            a.arr || 0,
            a.riskScore,
            a.accountType,
            Data.getRiskFactors(a).join('; ')
        ]);

        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `soci-accounts-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    /**
     * Track user activity to extend session
     */
    trackActivity() {
        const events = ['click', 'keypress', 'scroll', 'mousemove'];
        let lastActivity = Date.now();

        const checkActivity = () => {
            if (Date.now() - lastActivity > 1000) {
                lastActivity = Date.now();
                if (typeof Auth !== 'undefined') {
                    Auth.extendSession();
                }
            }
        };

        events.forEach(event => {
            document.addEventListener(event, checkActivity, { passive: true });
        });
    }
};

// Initialize when DOM is ready (if already authenticated)
document.addEventListener('DOMContentLoaded', () => {
    // App.init() is called by Auth.showDashboard() after successful login
});
