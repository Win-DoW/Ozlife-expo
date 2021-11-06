/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
      id
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
      ozlifes {
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
          storeId
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
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
      id
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
      ozlifes {
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
          storeId
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
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
      id
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
      ozlifes {
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
          storeId
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
export const onCreateOzlife = /* GraphQL */ `
  subscription OnCreateOzlife {
    onCreateOzlife {
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
      storeId
      store {
        id
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
        ozlifes {
          nextToken
        }
        createdAt
        updatedAt
      }
      reviews {
        items {
          id
          reviewer
          reviews
          ozlifeId
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
export const onUpdateOzlife = /* GraphQL */ `
  subscription OnUpdateOzlife {
    onUpdateOzlife {
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
      storeId
      store {
        id
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
        ozlifes {
          nextToken
        }
        createdAt
        updatedAt
      }
      reviews {
        items {
          id
          reviewer
          reviews
          ozlifeId
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
export const onDeleteOzlife = /* GraphQL */ `
  subscription OnDeleteOzlife {
    onDeleteOzlife {
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
      storeId
      store {
        id
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
        ozlifes {
          nextToken
        }
        createdAt
        updatedAt
      }
      reviews {
        items {
          id
          reviewer
          reviews
          ozlifeId
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
      id
      reviewer
      reviews
      ozlifeId
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
        storeId
        store {
          id
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
        reviews {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
      id
      reviewer
      reviews
      ozlifeId
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
        storeId
        store {
          id
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
        reviews {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
      id
      reviewer
      reviews
      ozlifeId
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
        storeId
        store {
          id
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
        reviews {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      userID
      otherUserID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      userID
      otherUserID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      userID
      otherUserID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      chatRoomUsers {
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
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
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
        chatRoom {
          id
          lastMessageID
          messagesCount
          createdAt
          updatedAt
        }
        updatedAt
      }
      messagesCount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      chatRoomUsers {
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
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
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
        chatRoom {
          id
          lastMessageID
          messagesCount
          createdAt
          updatedAt
        }
        updatedAt
      }
      messagesCount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      chatRoomUsers {
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
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
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
        chatRoom {
          id
          lastMessageID
          messagesCount
          createdAt
          updatedAt
        }
        updatedAt
      }
      messagesCount
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        nickname
        profile
        interest
        region
        image
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        messagesCount
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
