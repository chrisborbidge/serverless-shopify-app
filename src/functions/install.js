require('dotenv').config()

exports.handler = async (event, context) => {
  const shop = event.queryStringParameters.shop
  const redirectUri = event.queryStringParameters.redirect
  const apiKey = process.env.SHOPIFY_API_KEY
  const scopes = "read_content,write_content,read_products,read_themes,write_themes"

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
        redirectTo: installUrl
      })
    }
  }

  return {
    statusCode: 400,
    body: "Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request"
  }
}