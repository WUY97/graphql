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

    const corsOptions = {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };

    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());

    app.use(graphqlRouter);

    server.applyMiddleware({ app });

    connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
}

startServer();
