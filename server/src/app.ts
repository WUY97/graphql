import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

import connectDB from './db';
import { graphqlRouter } from './routes';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    // const corsOptions = {
    //     origin: process.env.CLIENT_ORIGIN,
    //     credentials: true,
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // };

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(graphqlRouter);

    server.applyMiddleware({ app });

    connectDB();

    const PORT = process.env.NODE_DOCKER_PORT || 6868;
    app.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
}

startServer();
