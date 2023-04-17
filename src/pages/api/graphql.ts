import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from './../../graphql/resolvers';
import { typeDefs } from './../../graphql/schema';
import { prisma } from './../../../prisma/db';

export type Context = {
  prisma: PrismaClient;
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res, prisma }),
});
