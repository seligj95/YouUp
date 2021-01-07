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
          statusRoom {
            id
            statusRoomUsers {
              items {
                user {
                  id
                  name
                  imageUri
                  shoutOut
                }
              }
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getStatusRoomStatuses = /* GraphQL */ `
  query GetStatusRoomStatuses($id: ID!) {
    getStatusRoom(id: $id) {
      id
      statuses {
        items {
          id
          content
          userID
          createdAt
        }
      }
    }
  }
`;

export const myStatusRooms = /* GraphQL */ `
  query MyStatusRooms($id: ID!) {
    getUser(id: $id) {
      statusRoomUser {
        items {
          statusRoom {
            statusRoomUsers {
              items {
                statusRoomID
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getStatusRoomLastStatuses = /* GraphQL */ `
  query GetStatusRoomLastStatuses($id: ID!) {
    getStatusRoom(id: $id) {
      statusRoomUsers {
        items {
          lastStatus {
            id
            content
            userID
            createdAt
          }
        }
      }
    }
  }
`;

export const getStatusRoomData = /* GraphQL */ `
  query GetStatusRoom($id: ID!) {
    getStatusRoom(id: $id) {
      id
      statusRoomUsers {
        items {
          id
          userID
          lastStatus {
            id
            content
            updatedAt
          }
        }
      }
    }
  }
`;