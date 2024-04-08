require('./config/env');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

// Function that creates and configures the ApolloServer

// Function that creates the Express app and applies Apollo middleware
async function createServer(options = { port: 4000 }) {

    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, { listen: options });

    return {server , url}; // Return the configured app
};

module.exports = { createServer };
