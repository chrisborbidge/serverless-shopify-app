# Shopify Serverless App
A serverless Shopify App

[![Netlify Status](https://api.netlify.com/api/v1/badges/2e1d6a73-a647-416a-be8f-6151215446b4/deploy-status)](https://app.netlify.com/sites/shopify-serverless-app/deploys)

### Setup

```
APP URL = {{netlify_url}}/.netlify/functions/app
Whitelisted redirection URL(s) = {{netlify_url}}/.netlify/functions/token
```

### Proxy

When installed on a Shopify Store, endpoints can be accessed using the following URL structure:

```
{{shopify_url}}/apps/wishlist/{{endpoint}}
```
