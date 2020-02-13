require('dotenv').config()
const crypto = require("crypto")
const querystring = require("querystring")

exports.handler = async (event, context) => {
  const params = event.queryStringParameters
  const shop = event.queryStringParameters.shop
  const apiSecret = process.env.SHOPIFY_API_SECRET

  const { signature } = params.query;
  const map = Object.assign({}, req.query);
  delete map.signature;
  let message = Object.keys(map).map(function (i) {
    return `${i}=${map[i]}`;
  }).sort().join('');
  const providedSignature = Buffer.from(signature, 'utf-8');
  const generatedHash = Buffer.from(
    crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex'),
    'utf-8'
  );
  let hashEquals = false;
  console.log('generatedHash', generatedHash);
  console.log('providedSignature', providedSignature);
  // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
  try {
    hashEquals = crypto.timingSafeEqual(generatedHash, providedSignature);
    // timingSafeEqual will return an error if the input buffers are not the same length.
  } catch (e) {
    hashEquals = false;
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
      shop: shop
    })
  }
}