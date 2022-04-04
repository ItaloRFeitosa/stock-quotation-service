const Request = (props) => ({
  traceId: props.traceId,
  body: props.body,
  headers: props.headers,
  query: props.query,
  params: props.params,
  user: props.user,
})

module.exports = { Request }
