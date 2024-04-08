/**
 * curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { startSession(sessionId: \"test-session-1\") { sessionId score completed createdAt } }" }' http://localhost:4000/graphql
 * curl -X POST -H "Content-Type: application/json" \
--data '{ "query": "query { sessionInfo(sessionId: \"your-session-id\") { sessionId score completed createdAt } }" }' \
http://localhost:4000/graphql

 * 
 */

const request = require('supertest');
// Import the createServer function from the updated server.js
const { createServer } = require('../../src/server'); // Adjust the path as needed
const { connectDB, disconnectDB } = require('../../src/config/db'); // Adjust the path as needed
const { v4: uuidv4 } = require('uuid');

const sessionInfoQD = `query SessionInfo($sessionId: String!) {
  sessionInfo(sessionId: $sessionId) {
    score,
    id,
    sessionId
  }
}`

const startSessionQD = `mutation Mutation($sessionId: String) {
  startSession(sessionId: $sessionId) {
    id
    score
    sessionId
  }
}`;

const genTestItemsQD = `mutation GenerateTestItems($sessionId: String!) {
  generateTestItems(sessionId: $sessionId) {
    id
    word
    color
    correctAnswer
    distractors
  }
}`;

const submitResQD = `mutation SubmitResponse($sessionId: String!, $testItemId: ID!, $selectedAnswer: String!) {
  submitResponse(sessionId: $sessionId, testItemId: $testItemId, selectedAnswer: $selectedAnswer) {
    id
    sessionId
    testItemId
    selectedAnswer
    isConsistent
  }
}
`;

describe('GraphQL API Integration Tests', () => {

    let server, url;
    const testUUID = uuidv4();
    console.log(testUUID);
    let testItemId, selectedAnswer, responseTime;

    beforeAll(async () => {
        await connectDB();
        // Note we must wrap our object destructuring in parentheses because we already declared these variables
        // We pass in the port as 0 to let the server pick its own ephemeral port for testing
        ({ server, url } = await createServer({ port: 0 }));
      });

    afterAll(async () => {
        await server?.stop();
        await disconnectDB();
      });

    it('test start session', async() => {
      const testData = {query: startSessionQD, variables: {sessionId: testUUID}};
      const response = await request(url).post('/')
      .send(testData)
      .expect(200);

      expect(response.body.data.startSession.sessionId).toBe(testUUID);
      expect(response.body.data.startSession).toHaveProperty('score');
    })

    it('generates test items for a session', async () => {
      // Test the generateTestItems mutation
      // genTestItemsQD
      const testData = {query: genTestItemsQD, variables: {sessionId: testUUID}};
      const response = await request(url).post('/')
      .send(testData)
      .expect(200);

  // Assertions to verify that test items were generated
  // Note: Adjust these assertions based on your actual API response and data structure
  expect(response.body.data.generateTestItems.length).toBeGreaterThan(2);
  response.body.data.generateTestItems.forEach(item => {

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('word');
    expect(item).toHaveProperty('color');
    expect(item).toHaveProperty('correctAnswer');
    expect(item.distractors).toBeInstanceOf(Array);
    testItemId = item.id;
    selectedAnswer = item.correctAnswer;

  });
    });
  
    it('submits a response', async () => {
      // Test the submitResponse mutation
      const variables = { sessionId: testUUID, testItemId: testItemId, selectedAnswer: selectedAnswer };
      const response = await request(url).post('/graphql').send({
        query: submitResQD,
        variables
      }).expect(200);
    
      expect(response.body.data.submitResponse).toHaveProperty('id');
      expect(response.body.data.submitResponse.sessionId).toBe(testUUID);
      expect(response.body.data.submitResponse.testItemId).toBe(testItemId);
      expect(response.body.data.submitResponse.selectedAnswer).toBe(selectedAnswer);
    

    });
  
    it('fetches test items by session', async () => {
      // Test the testItemsBySession query
    });
  
    it('test query session' , async () => {
      const testData = {query: sessionInfoQD, variables: {sessionId: testUUID}};
      const response = await request(url).post('/')
        .send(testData)
        .expect(200);

        expect(response.body.data.sessionInfo.sessionId).toBe(testUUID);
        expect(response.body.data.sessionInfo).toHaveProperty('score');
      })

  // Add more tests for other queries and mutations as needed
});

