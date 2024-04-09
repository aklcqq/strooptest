// resolvers
const { createAndSaveTestItem } = require('../utils/testItemGenerator');

const { TestItem, Session, Response } = require('../models'); // Assuming you have a Session model

const resolvers = {
  Query: {
    // Other resolvers...
    async testItemsBySession(_, { sessionId }) {
        try {
          const testItems = await TestItem.find({ sessionId });
          return testItems;
        } catch (error) {
          console.error('Failed to fetch test items for session:', sessionId, error);
          throw new Error('Failed to fetch test items.');
        }
      },

      async sessionInfo(_, { sessionId }) {
        try {
          const session = await Session.findOne({ sessionId: sessionId });
          if (!session) {
            throw new Error('Session not found.');
          }

          const testItems = await TestItem.find({ sessionId });
          const responses = await Response.find({ sessionId });
          const score = responses.filter(response => response.isConsistent).length;

          return session;
        } catch (error) {
          console.error(error);
          console.error('Failed to fetch session info for:', sessionId, error);
          throw new Error('Error fetching session information.');
        }
      },
      
  },
  // Mutation resolvers...
  Mutation: {
    async startSession(_, { sessionId }) {
        // Check if a session with the provided ID already exists
        if (sessionId) {
          const existingSession = await Session.findOne({ sessionId });
          if (existingSession) {
            throw new Error('Session with this ID already exists.');
          }
        } else {
          // Generate a new sessionId server-side, or use any other logic you prefer
        //   sessionId = generateUniqueId(); // Ensure this function generates a unique ID
        }
        console.log(sessionId);
  
        // Create a new session
        const newSession = new Session({ sessionId, score: 0, completed: false });
        await newSession.save();
  
        return newSession;
      },

    async generateTestItems(_, { sessionId }) {
        // Assume we want to generate and return a single test item for simplicity
        const session = await Session.findOne({ sessionId: sessionId });
        // const testItems = [];
        if(!session) {
          throw new Error(`Session with ID ${sessionId} does not exist.`);
        }
        
        let testItems = await TestItem.find({ sessionId });
        if (testItems.length === 0) {
          try {
            for (let i = 0; i < 5; i++) {
              const testItem = await createAndSaveTestItem(sessionId);
              testItems.push(testItem);
            }
            return testItems; // Return an array to match the expected schema
          } catch (error) {
            console.error('Failed to gen test items for session:', sessionId, error);
            throw new Error('Failed to gen test items.');
          }
        }
  
        return testItems;
      },

      async submitResponse(_, { sessionId, testItemId, selectedAnswer, musicGenre }) {
        try {
          // Create a new response document
          const session = await Session.findOne({ sessionId: sessionId });
          if (!session) {
            throw new Error('Session not found.');
          }
          const testItem = await TestItem.findById(testItemId);

          if (!testItem) {
            throw new Error('Test item not found.');
          }
  
          const isConsistent = (testItem.correctAnswer === selectedAnswer);

          const newResponse = new Response({
            sessionId,
            testItemId,
            selectedAnswer,
            musicGenre,
            isConsistent,
          });
  
          // Save the response document to the database
          await newResponse.save();
          // Return the saved document
          return newResponse;
        } catch (error) {
          console.error("Failed to submit response:", error);
          throw new Error("Error submitting response.");
        }
      },

      async finalizeSession(_, { sessionId}) {
        try {
          const session = await Session.findOne({ sessionId });
          const firstResponse = await Response.findOne({ sessionId }).sort({ createdAt: 1 });
          const lastResponse = await Response.findOne({ sessionId }).sort({ createdAt: -1 });
          const responses = await Response.find({ sessionId });

          const score = responses.filter(response => response.isConsistent).length;
          if (!session || !firstResponse || !lastResponse) {
            throw new Error('Session or responses not found');
          }
          const totalTime = Math.round((lastResponse.createdAt - firstResponse.createdAt) / 1000); // Time in seconds
          const completed = true; // Mark the session as completed
     
          await Session.updateOne({ sessionId }, { $set: { score, totalTime, completed } });
      
          // Return the updated session
          return Session.findOne({ sessionId });

        }
        catch (error) {
          console.error("Failed to finalize session:", error);
          throw new Error("Error finalizing session.");
        }
      },
  }
};

module.exports = resolvers;
