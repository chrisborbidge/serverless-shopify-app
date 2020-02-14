# Shopify Serverless App
A serverless Shopify App

[![Netlify Status](https://api.netlify.com/api/v1/badges/2e1d6a73-a647-416a-be8f-6151215446b4/deploy-status)](https://app.netlify.com/sites/shopify-serverless-app/deploys)

### Setup

1. Sign up for a Shopify Partners account (here)[https://www.shopify.com/partners]
2. Log in
3. Click "Apps" in the left hand side menu
4. Click "Create app"
5. Click "Public app"
6. Enter an "App name"
7. Enter "App URL":
```
{{netlify_url}}/.netlify/functions/app
```
8. Enter "Whitelisted redirection URL(s)":
```
{{netlify_url}}/.netlify/functions/token
```
9. Click "Create app"
10. Click "Extensions"
11. Click "Manage extension areas"
12. Navigate to "Online store" and click "Enable extension area"
13. Click "< Extensions"
14. Click "Online store"
15. Click "Manage app proxy"
16. Enter a "Subpath prefix", for example:
```
apps
```
17. Enter a "Subpath", for example:
```
app_name
```
18. Enter the following "Proxy URL":
```
{{netlify_url}}/.netlify/functions
```




### Proxy URL

When installed on a Shopify Store, endpoints can be accessed using the following URL structure:

```
{{shopify_url}}/apps/serverless/{{endpoint}}
```
