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
      noti_token
      chat_noti_state
      ozlife_noti_state
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
          userID
          updatedAt
        }
        nextToken
      }
      notiItem {
        items {
          id
          userID
          title
          content
          image
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
      noti_token
      chat_noti_state
      ozlife_noti_state
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
          userID
          updatedAt
        }
        nextToken
      }
      notiItem {
        items {
          id
          userID
          title
          content
          image
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
      noti_token
      chat_noti_state
      ozlife_noti_state
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
          userID
          updatedAt
        }
        nextToken
      }
      notiItem {
        items {
          id
          userID
          title
          content
          image
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateOzlife = /* GraphQL */ `
  subscription OnCreateOzlife {
    onCreateOzlife {
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
        user {
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
          createdAt
          updatedAt
        }
        ozlifeItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateOzlife = /* GraphQL */ `
  subscription OnUpdateOzlife {
    onUpdateOzlife {
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
        user {
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
          createdAt
          updatedAt
        }
        ozlifeItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteOzlife = /* GraphQL */ `
  subscription OnDeleteOzlife {
    onDeleteOzlife {
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
        user {
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
          createdAt
          updatedAt
        }
        ozlifeItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
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
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
      id
      reviews
      status
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
      id
      reviews
      status
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
      id
      reviews
      status
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
          noti_token
          chat_noti_state
          ozlife_noti_state
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
        noti_token
        chat_noti_state
        ozlife_noti_state
        chatRoomUser {
          nextToken
        }
        reviewItem {
          nextToken
        }
        storeItem {
          nextToken
        }
        ozlifeItem {
          nextToken
        }
        notiItem {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      userID
      title
      content
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      userID
      title
      content
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      userID
      title
      content
      image
      createdAt
      updatedAt
    }
  }
`;
