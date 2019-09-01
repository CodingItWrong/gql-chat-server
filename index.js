require('dotenv').config()
const express = require('express')
const http = require('http')
const graphql = require('./graphql')

let app = express()
const httpServer = http.createServer(app)
graphql.applyMiddleware({ app })

const port = process.env.PORT || 80
httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${graphql.graphqlPath}`
  )
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${graphql.subscriptionsPath}`
  )
})
