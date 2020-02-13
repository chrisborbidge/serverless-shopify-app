require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")

exports.handler = async (event, context) => {
  const { shop, path_prefix, timestamp, signature } = event.queryStringParameters
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (shop && path_prefix && timestamp) {
    const map = { path_prefix, shop, timestamp }
    const message = querystring.stringify(map)
    const providedHmac = Buffer.from(signature, 'utf-8')
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
        body: JSON.stringify({
          params: event.queryStringParameters
        })
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        params: event.queryStringParameters
      })
    }
  }
}