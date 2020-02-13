const crypto = require("crypto")
const querystring = require("querystring")
exports.handler = async (event, context) => {
  const shop = event.queryStringParameters.shop
  const path_prefix = event.queryStringParameters.path_prefix
  const timestamp = event.queryStringParameters.timestamp
  const signature = event.queryStringParameters.signature

  if (shop && path_prefix && timestamp) {
    const map = { shop, path_prefix, timestamp }
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
        body: "HMAC validation failed"
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        params: params
      })
    }
  }
}