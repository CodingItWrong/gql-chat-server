const { ApolloServer, gql } = require('apollo-server-express')
const { PubSub } = require('apollo-server')
const repo = require('./repo')

const pubsub = new PubSub()

const typeDefs = gql`
  type Message {
    text: String
    timestamp: Int
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    sendMessage(text: String): Message
  }

  type Subscription {
    messageSent: Message
  }
`

const MESSAGE_SENT = 'MESSAGE_SENT'

const resolvers = {
  Query: {
    messages: () => repo.all(),
  },
  Mutation: {
    sendMessage: (_, args) => {
      pubsub.publish(MESSAGE_SENT, { messageSent: args })
      repo.create(args)
      return args
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_SENT]),
    },
  },
}

const graphql = new ApolloServer({ typeDefs, resolvers })

module.exports = graphql
