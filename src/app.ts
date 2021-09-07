import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProductsResolver } from "./resolvers/ProductsResolver";
import createConnection from "./database";
createConnection();

export async function startServer() {
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductsResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  return app;
}
startServer();
