const express = require('express');

//import ApolloServer
const { ApolloServer } = require('apollo-server-express')

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


//added to fix update

let apolloServer= null
async function startServer() {
  apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer()


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);

    console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  });
});
