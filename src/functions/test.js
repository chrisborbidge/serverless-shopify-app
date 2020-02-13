require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")

exports.handler = async (event, context) => {
  const query = event.queryStringParameters
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (shop && path_prefix && timestamp) {
    var parameters = [];
    for (var key in query) {
      if (key != 'signature') {
        parameters.push(key + '=' + query[key])
      }
    }
    const message = parameters.sort().join('');

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
        body: "HMAC validation error"
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