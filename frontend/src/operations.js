// src/operations.js
import { gql } from '@apollo/client';

export const START_SESSION_MUTATION = gql`
mutation StartSession($sessionId: String) {
  startSession(sessionId: $sessionId) {
    id
    sessionId
    score
    completed
  }
}
`;

export const GENERATE_TEST_ITEMS_MUTATION = gql`
mutation GenerateTestItems($sessionId: String!) {
  generateTestItems(sessionId: $sessionId) {
    id
    sessionId
    word
    color
    correctAnswer
    distractors
  }
}
`;

export const GET_TEST_ITEMS_QUERY = gql`
query TestItemsBySession($sessionId: String!) {
  testItemsBySession(sessionId: $sessionId) {
    id
    word
    color
    correctAnswer
    distractors
  }
}
`;

export const SUBMIT_RESPONSE_MUTATION = gql`
mutation SubmitResponse($sessionId: String!, $testItemId: ID!, $selectedAnswer: String!) {
  submitResponse(sessionId: $sessionId, testItemId: $testItemId, selectedAnswer: $selectedAnswer) {
    id
    isConsistent
  }
}
`;

export const FINALIZE_SESSION  = gql`
mutation FinalizeSession($sessionId: String!) {
    finalizeSession(sessionId: $sessionId) {
    score
    totalTime
    completed
  }
}
`;
