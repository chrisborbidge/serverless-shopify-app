const crypto = require("crypto")
exports.handler = async (event, context) => {
  const params = event.queryStringParameters

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