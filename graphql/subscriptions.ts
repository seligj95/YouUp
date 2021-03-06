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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
