require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")

exports.handler = async (event, context) => {
  const params = event.queryStringParameters
  const signature = event.queryStringParameters.signature
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (signature) {
    var parameters = [];
    for (var key in params) {
      if (key != 'signature') {
        parameters.push(key + '=' + query[key])
      }
    }
    var message = parameters.sort().join('');
    const providedHmac = Buffer.from(signature)
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex')
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