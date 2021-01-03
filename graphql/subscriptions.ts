/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateStatusRoomUser = /* GraphQL */ `
  subscription OnCreateStatusRoomUser {
    onCreateStatusRoomUser {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatusRoomUser = /* GraphQL */ `
  subscription OnUpdateStatusRoomUser {
    onUpdateStatusRoomUser {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatusRoomUser = /* GraphQL */ `
  subscription OnDeleteStatusRoomUser {
    onDeleteStatusRoomUser {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStatusRoom = /* GraphQL */ `
  subscription OnCreateStatusRoom {
    onCreateStatusRoom {
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
      lastUserStatusID
      lastUserStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      lastContactStatusID
      lastContactStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatusRoom = /* GraphQL */ `
  subscription OnUpdateStatusRoom {
    onUpdateStatusRoom {
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
      lastUserStatusID
      lastUserStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      lastContactStatusID
      lastContactStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatusRoom = /* GraphQL */ `
  subscription OnDeleteStatusRoom {
    onDeleteStatusRoom {
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
      lastUserStatusID
      lastUserStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      lastContactStatusID
      lastContactStatus {
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
          lastUserStatusID
          lastContactStatusID
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStatus = /* GraphQL */ `
  subscription OnCreateStatus {
    onCreateStatus {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateStatus = /* GraphQL */ `
  subscription OnUpdateStatus {
    onUpdateStatus {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteStatus = /* GraphQL */ `
  subscription OnDeleteStatus {
    onDeleteStatus {
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
        lastUserStatusID
        lastUserStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        lastContactStatusID
        lastContactStatus {
          id
          createdAt
          content
          userID
          statusRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
