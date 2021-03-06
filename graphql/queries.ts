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
        statuses {
          nextToken
        }
        tags {
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
      statuses {
        items {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          createdAt
          content
          userID
          statusRoomID
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
        statuses {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStatus = /* GraphQL */ `
  query GetStatus($id: ID!) {
    getStatus(id: $id) {
      id
      createdAt
      content
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
        statuses {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listStatuss = /* GraphQL */ `
  query ListStatuss(
    $filter: ModelStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatuss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        content
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      createdAt
      content
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
        statuses {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        content
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const statusesByStatusRoom = /* GraphQL */ `
  query StatusesByStatusRoom(
    $statusRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    statusesByStatusRoom(
      statusRoomID: $statusRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        content
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const tagsByStatusRoom = /* GraphQL */ `
  query TagsByStatusRoom(
    $statusRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByStatusRoom(
      statusRoomID: $statusRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        content
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
        updatedAt
      }
      nextToken
    }
  }
`;
