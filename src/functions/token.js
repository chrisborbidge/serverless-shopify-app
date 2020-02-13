require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")
const fetch = require("isomorphic-fetch")

exports.handler = async (event, context) => {
  const { shop, hmac, code, timestamp } = event.queryStringParameters
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET


  if (shop && hmac && code) {
    const map = { code, shop, timestamp }
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

    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    }

    const tokenRes = await fetch(accessTokenRequestUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accessTokenPayload)
    })

    const tokenJson = await tokenRes.json()

    const shopifyToken = tokenJson.access_token

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopifyToken })
    }
  } else {
    return {
      statusCode: 400,
      body: "Required parameters missing"
    }
  }
}