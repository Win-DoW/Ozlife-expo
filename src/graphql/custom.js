export const getUserOnHomeScreen = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      nickname
      region
      reviewItem {
        items {
          id
          reviews
          status
          createdAt
          ozlifeID
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

export const getUserOnOzlifeScreen = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      reviewItem {
        items {
          id
          reviews
          status
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
              nickname
              image
            }
            reviewItem {
              items {
                id
                reviews
                status
                createdAt
                ozlifeID
                userID
                user {
                  id
                  email
                  nickname
                  profile
                  interest
                  region
                  image
                  noti_token
                  createdAt
                  updatedAt
                }
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
          userID
          user {
            id
            nickname
            image
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
            nickname
            image
          }
          reviewItem {
            items {
              id
              reviews
              status
              createdAt
              ozlifeID
              userID
              user {
                id
                email
                nickname
                profile
                interest
                region
                image
                noti_token
                createdAt
                updatedAt
              }
              updatedAt
            }
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

export const getChatRoomCountOnChatRoomScreen = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      messagesCount
      lastMessage {
        userID
      }
    }
  }
`;

export const getChatRoomLastOnChatRoomScreen = /* GraphQL */ `
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

export const getUserOnChatNotification = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      noti_token
      chat_noti_state
      createdAt
      updatedAt
    }
  }
`;
// Chat queries


// Chat mutations
export const updateChatRoomCountOnChatRoomScreen = /* GraphQL */ `
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
      noti_token
      chat_noti_state
      ozlife_noti_state
      reviewItem {
        items {
          id
          reviews
          status
          createdAt
          ozlifeID
          userID
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
          updatedAt
          user {
            id
            nickname
            image
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
              userID
              updatedAt
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
                user {
                  id
                  nickname
                  image
                }
                updatedAt
              }
              user {
                id
                nickname
                image
              }
              reviewItem {
                items {
                  id
                  reviews
                  status
                  createdAt
                  ozlifeID
                  userID
                  user {
                    id
                    email
                    nickname
                    profile
                    interest
                    region
                    image
                    noti_token
                    createdAt
                    updatedAt
                  }
                  updatedAt
                }
                nextToken
              } 
            }
            nextToken
          }
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
      noti_token
      createdAt
      updatedAt
    }
  }
`;
// Profile queries


export const listStoresOnSearchScreen = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
              items {
                id
                reviews
                status
                createdAt
                ozlifeID
                userID
                user {
                  id
                  email
                  nickname
                  profile
                  interest
                  region
                  image
                  noti_token
                  createdAt
                  updatedAt
                }
                updatedAt
              }
              nextToken
            }
            updatedAt
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
            }
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;

export const listOzlivesOnSearchScreen = /* GraphQL */ `
  query ListOzlives(
    $filter: ModelOzlifeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOzlives(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          noti_token
          createdAt
          updatedAt
        }
        reviewItem {
          items {
            id
            reviews
            status
            createdAt
            ozlifeID
            userID
            user {
              id
              email
              nickname
              profile
              interest
              region
              image
              noti_token
              createdAt
              updatedAt
            }
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;