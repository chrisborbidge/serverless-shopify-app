# Shopify Serverless App
A serverless Shopify App

[![Netlify Status](https://api.netlify.com/api/v1/badges/2e1d6a73-a647-416a-be8f-6151215446b4/deploy-status)](https://app.netlify.com/sites/shopify-serverless-app/deploys)

### Shopify App Setup

1. Sign up for a Shopify Partners account [here](https://www.shopify.com/partners).
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
19. Click "< Your App Name"
20. Take note of where to find your API key and API secret key, these will be needed later


### Deployment (Netlify)

1. Sign up for a Netlify account [here](https://www.netlify.com/).
2. Click "New site from Git"
3. Click "GitHub" (or other)
4. Select your clone of this Repo
5. Click "Show advanced"
6. Click "New variable"
7. Add the following variables:
```
SHOPIFY_API_KEY = YOUR SHOPIFY API KEY
SHOPIFY_API_SECRET = YOUR SHOPIFY API SECRET
```
8. Click "Deploy site"


### Install App on Shopify Store

1. Enter the following URL into a web browser:
```
{{netlify_url}}/.netlify/functions/app?shop={{shopify_store_url}}&redirect={{netlify_url}}/.netlify/functions/app
```
2. Copy the "redirectTo" url and paste it into your browser
3. Click "Install app"


### Proxy URL

When installed on a Shopify Store, endpoints can be accessed using the following URL structure:

```
{{shopify_url}}/apps/serverless/{{endpoint}}
```
