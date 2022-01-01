export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      nickname
      profile
      interest
      region
      image
      chatRoomUser {
        items {
          id
          userID
          otherUserID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
            id
            messagesCount
            chatRoomUsers {
              items {
                user {
                  id
                  nickname
                  image
                }
              }
            }
            lastMessage {
              id
              content
              updatedAt
              user {
                id
                nickname
              }
            }
          }
        }
        nextToken
      }
      reviewItem {
        items {
          id
          ozlifeID
          userID
          reviews
          createdAt
          updatedAt
        }
        nextToken
      }
      storeItem {
        items {
          id
          userID
          owner
          name
          profile
          images
          tel
          address
          license
          url
          longitude
          latitude
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

export const getChatRoomCount = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      messagesCount
      lastMessage {
        userID
      }
    }
  }
`;

export const getChatRoomLast = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      lastMessageID
      lastMessage {
        userID
      }
    }
  }
`;

export const listChatRoomUsersSearch = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        otherUserID
        chatRoomID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;