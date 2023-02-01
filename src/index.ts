import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_CONNECTION_STR = process.env.DB_CONNECTION_STR || '';
export const API_SECRET = process.env.API_SECRET || '';

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apolloServer.start();
  app.use(bodyParser.json());
  app.use(
    '/graphql',
    cors(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.authorization })
    })
  );

  await mongoose.connect(DB_CONNECTION_STR);
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

startServer();
