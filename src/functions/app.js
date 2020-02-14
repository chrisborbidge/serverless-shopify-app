require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")

exports.handler = async (event, context) => {
  const { hmac, locale, session, shop, timestamp } = event.queryStringParameters
  const params = event.queryStringParameters
  const redirectUri = event.queryStringParameters.redirect
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET
  const scopes = "read_content,write_content,read_products,read_themes,write_themes"

  if (hmac && locale && session && shop && timestamp) {
    const map = { locale, session, shop, timestamp }
    const message = querystring.stringify(map)
    const providedHmac = Buffer.from(hmac, 'utf-8')
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
      'utf-8'
    )

    let hashEquals = false

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    } catch (e) {
      hashEquals = false
    };

    if (!hashEquals) {
      return {
        statusCode: 400,
        body: "HMAC validation failed"
      }
    }

    return {
      statusCode: 200,
      body: "Serverless Shopify App!"
    }

  }

  if (shop) {
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&redirect_uri=' + redirectUri

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        redirectTo: installUrl,
        params: params
      })
    }
  }

  return {
    statusCode: 400,
    body: "Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request"
  }
}