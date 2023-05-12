import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { authRouter } from './routes/auth.js';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import { verifyUserToken } from './services/jwt.js';
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_CONNECTION_STR = process.env.DB_CONNECTION_STR || '';
export const API_SECRET = process.env.API_SECRET || '';

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer<object>({
    typeDefs,
    resolvers,
    introspection: false,
    includeStacktraceInErrorResponses: false,
  });

  await apolloServer.start();
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use(
    '/graphql',
    cors(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const bearer = req.headers.authorization;

        if (!bearer || !bearer.startsWith('Bearer ') || !await verifyUserToken(bearer)) {
          throw new GraphQLError('Unauthorized.');
        }

        return { };
      }
    })
  );

  await mongoose.connect(DB_CONNECTION_STR);
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

startServer();
