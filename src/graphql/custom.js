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
          ozlifeID
          userID
          reviews
          createdAt
          updatedAt
          ozlife {
            id
            owner
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
            storeID
            store {
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
            reviewItem {
              nextToken
            }
            createdAt
            updatedAt
          }
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
          ozlifeItem {
            items {
              id
              owner
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
              storeID
              store {
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
                ozlifeItem {
                  nextToken
                }
                updatedAt
              }
              createdAt
              updatedAt
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