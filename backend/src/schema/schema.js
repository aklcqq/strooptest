/**
 * Consider splitting your type definitions into separate files 
 * based on their domain (e.g., TestItem.graphql, Response.graphql,
 *  Session.graphql) and then merging them. Using graphql-tools
 */

const typeDefs = `#graphql
  type TestItem {
    id: ID!
    sessionId: String!
    word: String!
    color: String!
    correctAnswer: String!
    distractors: [String!]!
    createdAt: String
  }

  type Response {
    id: ID!
    sessionId: String!
    testItemId: ID!
    selectedAnswer: String!
    musicGenre: String!
    responseTime: Int!
    isConsistent: Boolean
    createdAt: String
  }

  # Assuming a session could be tracked for completion and scoring
  type Session {
    id: ID!
    sessionId: String!
    score: Int
    totalTime: Int
    completed: Boolean!
    createdAt: String
  }

  # Queries represent read-only fetch operations
  type Query {
    getTestItem(id: ID!): TestItem
    testItemsBySession(sessionId: String!): [TestItem!]! # Fetch all test items for a session
    sessionInfo(sessionId: String!): Session # Fetch session information
  }

  # Mutations represent operations that create or modify data
  type Mutation {
    startSession(sessionId: String): Session!
    generateTestItems(sessionId: String!): [TestItem!]!
    submitResponse(sessionId: String!, testItemId: ID!, selectedAnswer: String!, musicGenre: String!): Response
    # Potential mutation for updating session information could be added here
    finalizeSession(sessionId: String!): Session!
  }
`;

module.exports = typeDefs;
