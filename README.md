# SOCi Retention Analytics Dashboard

Interactive dashboard for customer retention and churn analysis.

## Features

- **Executive Overview**: KPI cards with animated counters, churn rates by tier and vertical
- **Churn Analysis**: ARR distribution, tier analysis, vertical breakdown
- **Engagement Metrics**: Product usage comparison between active and churned customers
- **Customer Health**: NPS scores, support ticket analysis
- **At-Risk Accounts**: Filterable table with risk scoring and export functionality

## Tech Stack

- HTML5 / CSS3 / JavaScript (Vanilla)
- Chart.js for interactive visualizations
- D3.js for advanced charts
- GitHub Pages for hosting

## Login Credentials

| Username | Password |
|----------|----------|
| soci | retention2025 |
| admin | searchmas2025 |
| demo | demo123 |

## Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Deployment

This dashboard is configured for GitHub Pages deployment:

1. Go to repository Settings > Pages
2. Select "Deploy from a branch"
3. Choose `main` branch and `/ (root)` folder
4. Save and wait for deployment

## Data Sources

Data is sourced from BigQuery (searchmas-gmb-data-extract.retention dataset):
- account_details
- ads
- listings
- reviews
- social
- pendo
- zendesk

## Author

Searchmas Analytics Team
December 2025
