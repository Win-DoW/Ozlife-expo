/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
export const listStores = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getOzlife = /* GraphQL */ `
  query GetOzlife($id: ID!) {
    getOzlife(id: $id) {
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
export const listOzlives = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
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
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
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
export const listChatRoomUsers = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const notificationByUser = /* GraphQL */ `
  query NotificationByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
