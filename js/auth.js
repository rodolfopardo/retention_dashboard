/**
 * SOCi Retention Dashboard - Authentication Module
 * Simple client-side authentication for GitHub Pages deployment
 */

const Auth = {
    // Configuration - Change these credentials as needed
    credentials: {
        // Username: password pairs (you can add multiple users)
        users: {
            'soci': 'retention2025',
            'admin': 'searchmas2025',
            'demo': 'demo123'
        }
    },

    // Session duration in milliseconds (30 minutes)
    sessionDuration: 30 * 60 * 1000,

    /**
     * Initialize authentication
     */
    init() {
        this.checkSession();
        this.bindEvents();
    },

    /**
     * Bind login form events
     */
    bindEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    /**
     * Handle login form submission
     */
    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.toLowerCase().trim();
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('loginError');

        // Validate credentials
        if (this.validateCredentials(username, password)) {
            this.createSession(username);
            this.showDashboard(username);
            errorElement.textContent = '';
        } else {
            errorElement.textContent = 'Invalid username or password';
            this.shakeLoginForm();
        }
    },

    /**
     * Validate user credentials
     */
    validateCredentials(username, password) {
        return this.credentials.users[username] === password;
    },

    /**
     * Create a new session
     */
    createSession(username) {
        const session = {
            username: username,
            loginTime: Date.now(),
            expiresAt: Date.now() + this.sessionDuration
        };

        // Store session in sessionStorage (cleared when browser closes)
        sessionStorage.setItem('soci_session', JSON.stringify(session));
    },

    /**
     * Check if there's a valid session
     */
    checkSession() {
        const sessionData = sessionStorage.getItem('soci_session');

        if (sessionData) {
            const session = JSON.parse(sessionData);

            // Check if session is still valid
            if (Date.now() < session.expiresAt) {
                this.showDashboard(session.username);
                this.extendSession();
                return true;
            } else {
                // Session expired
                this.logout();
            }
        }

        return false;
    },

    /**
     * Extend session on activity
     */
    extendSession() {
        const sessionData = sessionStorage.getItem('soci_session');

        if (sessionData) {
            const session = JSON.parse(sessionData);
            session.expiresAt = Date.now() + this.sessionDuration;
            sessionStorage.setItem('soci_session', JSON.stringify(session));
        }
    },

    /**
     * Show dashboard and hide login
     */
    showDashboard(username) {
        const loginScreen = document.getElementById('loginScreen');
        const dashboard = document.getElementById('dashboard');
        const userNameElement = document.getElementById('userName');

        if (loginScreen) loginScreen.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
        if (userNameElement) {
            userNameElement.textContent = username.charAt(0).toUpperCase() + username.slice(1);
        }

        // Initialize dashboard after showing
        if (typeof App !== 'undefined' && App.init) {
            App.init();
        }
    },

    /**
     * Logout user
     */
    logout() {
        sessionStorage.removeItem('soci_session');

        const loginScreen = document.getElementById('loginScreen');
        const dashboard = document.getElementById('dashboard');

        if (dashboard) dashboard.classList.add('hidden');
        if (loginScreen) loginScreen.classList.remove('hidden');

        // Clear form
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
    },

    /**
     * Shake animation for invalid login
     */
    shakeLoginForm() {
        const container = document.querySelector('.login-container');
        container.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }
};

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => Auth.init());
