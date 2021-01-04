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
            lastUserStatus {
              id
              content
              updatedAt
              user {
                id
                name
              }
            }
            lastContactStatus {
              id
              content
              updatedAt
              user {
                id
                name
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
