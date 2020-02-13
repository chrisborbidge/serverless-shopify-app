exports.handler = async (event, context) => {
  const params = event.queryStringParameters

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