/**
 * SOCi Retention Dashboard - Main Application
 */

const App = {
    // Risk accounts data
    riskAccounts: [
        { name: 'Property Solutions Inc', tier: 5, vertical: 'Property', arr: 18500, riskScore: 92, factors: ['Low engagement', 'No ads', 'Support issues'] },
        { name: 'LocalBiz Agency', tier: 4, vertical: 'Agency - Local', arr: 24000, riskScore: 88, factors: ['Declining usage', 'Low NPS'] },
        { name: 'RealEstate Pro', tier: 5, vertical: 'Property - SaaS', arr: 15200, riskScore: 85, factors: ['No social posts', 'Low reviews'] },
        { name: 'Healthcare Connect', tier: 4, vertical: 'Healthcare', arr: 32000, riskScore: 82, factors: ['Support escalations', 'Low adoption'] },
        { name: 'Retail Dynamics', tier: 3, vertical: 'Retail', arr: 45000, riskScore: 78, factors: ['Decreasing ARR', 'Low engagement'] },
        { name: 'FoodService Group', tier: 4, vertical: 'Food & Beverage', arr: 28500, riskScore: 76, factors: ['No ads spend', 'Low impressions'] },
        { name: 'Manufacturing Plus', tier: 4, vertical: 'Manufacturing', arr: 22000, riskScore: 74, factors: ['Low social', 'No reviews reply'] },
        { name: 'Finance Solutions', tier: 3, vertical: 'Financial Services', arr: 55000, riskScore: 72, factors: ['Support tickets up', 'Low NPS'] },
        { name: 'Property Management Co', tier: 5, vertical: 'Property - Full Service', arr: 19800, riskScore: 71, factors: ['Low engagement', 'Declining usage'] },
        { name: 'Local Agency Partners', tier: 4, vertical: 'Agency - Brand', arr: 35000, riskScore: 70, factors: ['No recent activity', 'Low adoption'] }
    ],

    initialized: false,

    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;

        // Initialize charts
        Charts.init();

        // Bind events
        this.bindEvents();

        // Animate KPIs
        this.animateKPIs();

        // Populate risk table
        this.populateRiskTable();

        // Set up activity tracking for session extension
        this.trackActivity();

        this.initialized = true;
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

        // Search accounts
        const searchInput = document.getElementById('searchAccounts');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterAccounts(e.target.value));
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToCSV());
        }
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
     * Populate risk accounts table
     */
    populateRiskTable() {
        const tbody = document.getElementById('riskTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.riskAccounts.map(account => `
            <tr>
                <td><strong>${account.name}</strong></td>
                <td>Tier ${account.tier}</td>
                <td>${account.vertical}</td>
                <td>$${account.arr.toLocaleString()}</td>
                <td>
                    <span class="risk-badge ${this.getRiskClass(account.riskScore)}">
                        ${account.riskScore}
                    </span>
                </td>
                <td>
                    <div class="risk-factors">
                        ${account.factors.map(f => `<span class="factor-tag">${f}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <button class="btn-view" onclick="App.viewAccount('${account.name}')">
                        View
                    </button>
                </td>
            </tr>
        `).join('');
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
     * Filter accounts in table
     */
    filterAccounts(searchTerm) {
        const term = searchTerm.toLowerCase();
        const rows = document.querySelectorAll('#riskTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    },

    /**
     * View account details (placeholder)
     */
    viewAccount(accountName) {
        alert(`Account Details: ${accountName}\n\nThis would open a detailed view modal in the full implementation.`);
    },

    /**
     * Export data to CSV
     */
    exportToCSV() {
        const headers = ['Account Name', 'Tier', 'Vertical', 'ARR', 'Risk Score', 'Risk Factors'];
        const rows = this.riskAccounts.map(a => [
            a.name,
            `Tier ${a.tier}`,
            a.vertical,
            a.arr,
            a.riskScore,
            a.factors.join('; ')
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
        a.download = `soci-risk-accounts-${new Date().toISOString().split('T')[0]}.csv`;
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
