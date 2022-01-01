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
        }
        nextToken
      }
      reviewItem {
        items {
          id
          reviews
          createdAt
          ozlifeID
          ozlife {
            id
            title
            profile
            images
            section
            tag
            question
            member
            visit_date
            name
            original_price
            discount_price
            promotion
            address
            createdAt
            storeID
            store {
              id
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
              userID
              updatedAt
            }
            userID
            user {
              id
              email
              nickname
              profile
              interest
              region
              image
              createdAt
              updatedAt
            }
            reviewItem {
              nextToken
            }
            updatedAt
          }
          userID
          user {
            id
            email
            nickname
            profile
            interest
            region
            image
            createdAt
            updatedAt
          }
          updatedAt
        }
        nextToken
      }
      storeItem {
        items {
          id
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
          userID
          user {
            id
            email
            nickname
            profile
            interest
            region
            image
            createdAt
            updatedAt
          }
          ozlifeItem {
            nextToken
          }
          updatedAt
        }
        nextToken
      }
      ozlifeItem {
        items {
          id
          title
          profile
          images
          section
          tag
          question
          member
          visit_date
          name
          original_price
          discount_price
          promotion
          address
          createdAt
          storeID
          store {
            id
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
            userID
            updatedAt
          }
          userID
          user {
            id
            email
            nickname
            profile
            interest
            region
            image
            createdAt
            updatedAt
          }
          reviewItem {
            nextToken
          }
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

// Chat queries
export const getUserOnChatScreen = /* GraphQL */ `
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
            lastMessageID
            lastMessage {
              id
              createdAt
              content
              userID
              updatedAt
            }
            chatRoomUsers {
              items {
                user {
                  id
                  nickname
                  image
                }
              }
            }
            messagesCount
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getChatRoomCountOnChatScreen = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      messagesCount
      lastMessage {
        userID
      }
    }
  }
`;

export const getChatRoomLastOnChatScreen = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      lastMessageID
      lastMessage {
        userID
      }
    }
  }
`;

export const listChatRoomUsersSearchOnChatScreen = /* GraphQL */ `
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
// Chat queries


// Chat mutations
export const updateChatRoomCountOnChatScreen = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      messagesCount
    }
  }
`;
// Chat mutations

// Profile queries
export const getUserOnProfileScreen = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      nickname
      profile
      interest
      region
      image
      storeItem {
        items {
          id
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
          userID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getUserOnProfileInformationEditScreen = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      nickname
      profile
      interest
      region
      image
      createdAt
      updatedAt
    }
  }
`;
// Profile queries