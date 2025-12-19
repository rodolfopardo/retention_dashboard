# SOCi Retention Analytics Dashboard

## Documentation

### Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Authentication](#authentication)
4. [Dashboard Sections](#dashboard-sections)
5. [Filtering System](#filtering-system)
6. [Data Sources](#data-sources)
7. [Risk Scoring Model](#risk-scoring-model)
8. [Technical Architecture](#technical-architecture)
9. [Deployment](#deployment)
10. [Maintenance](#maintenance)

---

## Overview

The SOCi Retention Analytics Dashboard is an interactive web application designed to provide comprehensive insights into customer retention, churn analysis, and account health metrics. It enables stakeholders to identify at-risk accounts, understand churn patterns, and make data-driven decisions to improve customer retention.

### Key Objectives
- Monitor customer churn rates across different segments
- Identify accounts at risk of churning
- Analyze engagement patterns between active and churned customers
- Provide actionable insights for customer success teams
- Track revenue impact of customer churn

---

## Features

### Executive Overview
- **KPI Cards**: Animated counters displaying key metrics
  - Active Clients count
  - Former Clients count
  - Total ARR (Annual Recurring Revenue)
  - Lost ARR from churned accounts
- **Churn Rate by Tier**: Visual breakdown of churn rates across customer tiers
- **Client Distribution**: Pie chart showing customer segmentation
- **Industry Analysis**: Churn risk by industry vertical

### Churn Analysis
- **ARR Distribution**: Comparison of revenue between active and churned customers
- **Churn by ARR Tier**: Understanding which revenue segments are most affected
- **Key Insights**: Automated insights highlighting critical findings

### Engagement Metrics
- **Radar Chart**: Multi-dimensional comparison of engagement metrics
- **Social Media Metrics**: Analysis of social engagement patterns
- **Metric Comparison**: Side-by-side comparison of key engagement indicators
  - Average Ads Spend
  - Average Social Posts
  - Average Impressions
  - Engagement Rate

### Customer Health
- **NPS Score Distribution**: Net Promoter Score analysis
- **Support Tickets Analysis**: Ticket volume comparison
- **Health Gauges**: Visual indicators of customer health metrics

### At-Risk Accounts
- **Risk Summary Cards**: Quick view of accounts by risk level
  - Critical Risk (Score 85+)
  - High Risk (Score 70-84)
  - Medium Risk (Score 50-69)
  - Low Risk (Score <50)
- **Filterable Account Table**: Complete list of all accounts with filtering
- **Search Functionality**: Quick account lookup
- **CSV Export**: Download filtered data for further analysis

---

## Authentication

### Login Credentials

| Username | Password | Access Level |
|----------|----------|--------------|
| soci | retention2025 | Full Access |
| admin | searchmas2025 | Full Access |
| demo | demo123 | Full Access |

### Session Management
- Sessions automatically extend with user activity
- Logout button available in the sidebar
- Session timeout after 30 minutes of inactivity

---

## Dashboard Sections

### 1. Overview
The main landing page providing a high-level summary of retention metrics. Includes:
- 4 KPI cards with animated counters
- Churn rate visualization by customer tier
- Client distribution pie chart
- Industry and vertical churn analysis

### 2. Churn Analysis
Deep dive into churn patterns and revenue impact:
- ARR distribution comparison
- Churn segmentation by revenue tier
- Key insights cards with actionable recommendations

### 3. Engagement
Product usage and engagement analysis:
- Radar chart comparing active vs churned customer engagement
- Social media metrics breakdown
- Detailed metric comparisons with percentage changes

### 4. Customer Health
Health indicators and satisfaction metrics:
- NPS score analysis and distribution
- Support ticket volume comparison
- Visual gauges for quick health assessment

### 5. At-Risk Accounts
Account-level risk identification:
- Risk summary cards (clickable for filtering)
- Complete account table with sorting
- Multi-filter capability
- Export functionality

---

## Filtering System

### Global Filters
Located at the top of the dashboard, these filters affect all sections:

| Filter | Options | Description |
|--------|---------|-------------|
| Industry | All Industries, 19 specific industries | Filter by business industry |
| Vertical | All Verticals, 10 specific verticals | Filter by business model type |
| Tier | All Tiers, Tier 1-5 | Filter by customer tier (1=Enterprise, 5=SMB) |
| Account Type | All Types, Client, Former Client | Filter by current status |

### At-Risk Section Filters
Additional filters specific to the At-Risk Accounts section:

| Filter | Options | Description |
|--------|---------|-------------|
| Risk Level | All, Critical, High, Medium, Low | Filter by calculated risk score |
| Search | Text input | Search accounts by name |

### Filter Behavior
- Filters are cumulative (AND logic)
- Clear button resets all filters
- Risk cards are clickable to quick-filter by risk level
- Filtered results update in real-time

---

## Data Sources

### BigQuery Dataset
**Project**: `searchmas-gmb-data-extract`
**Dataset**: `retention`

### Source Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| `account_details` | Master account information | account_id, name, tier, industry, vertical, arr, account_type |
| `ads` | Advertising metrics | account_id, total_spend, impressions, clicks |
| `listings` | Business listing data | account_id, total_listings, claimed_listings |
| `reviews` | Review metrics | account_id, total_reviews, avg_rating, response_rate |
| `social` | Social media metrics | account_id, posts, impressions, engagements |
| `pendo` | Product usage data | account_id, feature_usage, session_count |
| `zendesk` | Support ticket data | account_id, ticket_count, avg_resolution_time |

### Data Refresh
- Data is currently static (loaded from `js/data.js`)
- For production, implement API endpoints to fetch real-time data from BigQuery

---

## Risk Scoring Model

### Score Ranges

| Risk Level | Score Range | Description |
|------------|-------------|-------------|
| Critical | 85-100 | Immediate intervention required |
| High | 70-84 | Close monitoring needed |
| Medium | 50-69 | Watch list |
| Low | 0-49 | Healthy account |

### Risk Factors
The risk score is calculated based on multiple factors:

1. **Engagement Decline**
   - Reduced product usage
   - Decreased social posting
   - Lower ad spend

2. **Account Characteristics**
   - Tier level (smaller accounts = higher risk)
   - Industry vertical risk profile
   - Time since last activity

3. **Health Indicators**
   - NPS score trends
   - Support ticket patterns
   - Feature adoption rate

### Risk Factor Tags
Each account displays relevant risk factors:
- `Low engagement` - Below threshold product usage
- `Usage declining` - Negative trend in activity
- `Small account` - Tier 4-5 accounts
- `High-risk vertical` - Industry with higher churn rates
- `Churned` - Already former client
- `Healthy` - No significant risk factors

---

## Technical Architecture

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) | ES6+ |
| Charts | Chart.js | 4.x |
| Advanced Visualizations | D3.js | 7.x |
| Icons | Font Awesome | 6.4.0 |
| Fonts | Google Fonts (Inter) | - |
| Hosting | GitHub Pages | - |

### File Structure

```
retention_dashboard/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── auth.js             # Authentication logic
│   ├── app.js              # Main application logic
│   ├── charts.js           # Chart configurations
│   └── data.js             # Account data and filters
├── assets/
│   └── soci-logo.jpg       # SOCi logo
├── README.md               # Quick start guide
└── DOCUMENTATION.md        # This file
```

### Key JavaScript Modules

#### auth.js
- User authentication
- Session management
- Login/logout handling

#### app.js
- Application initialization
- Filter management
- Table population
- Export functionality
- Navigation handling

#### charts.js
- Chart.js configurations
- All dashboard visualizations
- Chart update methods

#### data.js
- Account data storage
- Filter options
- Data filtering logic
- Summary statistics calculations

---

## Deployment

### GitHub Pages Deployment

1. **Repository Setup**
   ```bash
   git clone https://github.com/rodolfopardo/retention_dashboard.git
   cd retention_dashboard
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Save

3. **Access URL**
   ```
   https://rodolfopardo.github.io/retention_dashboard/
   ```

### Local Development

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Access at http://localhost:8000
```

---

## Maintenance

### Updating Data

To update account data, modify the `js/data.js` file:

```javascript
// Update filter options
Data.filterOptions.industries = ['Industry1', 'Industry2', ...];

// Update account data
Data.accounts = [
    {
        id: "1234",
        name: "Account Name",
        tier: 1,
        accountType: "Client",
        industry: "Industry",
        vertical: "Vertical",
        arr: 100000,
        locations: 50,
        riskScore: 25
    },
    // ... more accounts
];
```

### Adding New Filters

1. Add filter HTML in `index.html`
2. Add filter options in `data.js`
3. Update `getFilteredAccounts()` function in `data.js`
4. Add event listener in `app.js`

### Modifying Risk Calculation

Update the `getRiskLevel()` and `getRiskFactors()` functions in `data.js`:

```javascript
getRiskLevel(score) {
    if (score >= 85) return 'Critical';
    if (score >= 70) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
}
```

---

## Support

### Common Issues

| Issue | Solution |
|-------|----------|
| Charts not loading | Check browser console for errors, ensure Chart.js CDN is accessible |
| Filters not working | Clear browser cache, check JavaScript console |
| Login not working | Verify credentials, check auth.js configuration |
| Export not downloading | Check browser download permissions |

### Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome | Yes (recommended) |
| Firefox | Yes |
| Safari | Yes |
| Edge | Yes |
| IE11 | No |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2025 | Initial release |
| 1.1.0 | Dec 2025 | Added global filters, risk level filtering, removed sidebar logo |

---

## Contact

**Searchmas Analytics Team**
December 2025

For questions or support, contact the Analytics Team.
