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