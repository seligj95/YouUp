/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      shoutOut
      statusRoomUser {
        items {
          id
          userID
          statusRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageUri
        shoutOut
        statusRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStatusRoomUser = /* GraphQL */ `
  query GetStatusRoomUser($id: ID!) {
    getStatusRoomUser(id: $id) {
      id
      userID
      statusRoomID
      user {
        id
        name
        imageUri
        shoutOut
        statusRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      statusRoom {
        id
        statusRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStatusRoomUsers = /* GraphQL */ `
  query ListStatusRoomUsers(
    $filter: ModelStatusRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatusRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        statusRoomID
        user {
          id
          name
          imageUri
          shoutOut
          createdAt
          updatedAt
        }
        statusRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStatusRoom = /* GraphQL */ `
  query GetStatusRoom($id: ID!) {
    getStatusRoom(id: $id) {
      id
      statusRoomUsers {
        items {
          id
          userID
          statusRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStatusRooms = /* GraphQL */ `
  query ListStatusRooms(
    $filter: ModelStatusRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatusRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        statusRoomUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
