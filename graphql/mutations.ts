/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createStatusRoomUser = /* GraphQL */ `
  mutation CreateStatusRoomUser(
    $input: CreateStatusRoomUserInput!
    $condition: ModelStatusRoomUserConditionInput
  ) {
    createStatusRoomUser(input: $input, condition: $condition) {
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
export const updateStatusRoomUser = /* GraphQL */ `
  mutation UpdateStatusRoomUser(
    $input: UpdateStatusRoomUserInput!
    $condition: ModelStatusRoomUserConditionInput
  ) {
    updateStatusRoomUser(input: $input, condition: $condition) {
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
export const deleteStatusRoomUser = /* GraphQL */ `
  mutation DeleteStatusRoomUser(
    $input: DeleteStatusRoomUserInput!
    $condition: ModelStatusRoomUserConditionInput
  ) {
    deleteStatusRoomUser(input: $input, condition: $condition) {
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
export const createStatusRoom = /* GraphQL */ `
  mutation CreateStatusRoom(
    $input: CreateStatusRoomInput!
    $condition: ModelStatusRoomConditionInput
  ) {
    createStatusRoom(input: $input, condition: $condition) {
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
export const updateStatusRoom = /* GraphQL */ `
  mutation UpdateStatusRoom(
    $input: UpdateStatusRoomInput!
    $condition: ModelStatusRoomConditionInput
  ) {
    updateStatusRoom(input: $input, condition: $condition) {
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
export const deleteStatusRoom = /* GraphQL */ `
  mutation DeleteStatusRoom(
    $input: DeleteStatusRoomInput!
    $condition: ModelStatusRoomConditionInput
  ) {
    deleteStatusRoom(input: $input, condition: $condition) {
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
