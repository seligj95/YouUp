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
                  statusRoomUser {
                    items {
                      statusRoom {
                        statuses {
                          items {
                            id
                            content
                            updatedAt
                            user {
                              name
                              id
                            }
                          }
                        }
                      }
                    }
                  }
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
