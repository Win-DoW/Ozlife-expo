/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      nickname
      profile
      interest
      region
      image
      noti_token
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
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      nickname
      profile
      interest
      region
      image
      noti_token
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      nickname
      profile
      interest
      region
      image
      noti_token
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
      createdAt
      updatedAt
    }
  }
`;
export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
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
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
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
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
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
export const createOzlife = /* GraphQL */ `
  mutation CreateOzlife(
    $input: CreateOzlifeInput!
    $condition: ModelOzlifeConditionInput
  ) {
    createOzlife(input: $input, condition: $condition) {
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
export const updateOzlife = /* GraphQL */ `
  mutation UpdateOzlife(
    $input: UpdateOzlifeInput!
    $condition: ModelOzlifeConditionInput
  ) {
    updateOzlife(input: $input, condition: $condition) {
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
export const deleteOzlife = /* GraphQL */ `
  mutation DeleteOzlife(
    $input: DeleteOzlifeInput!
    $condition: ModelOzlifeConditionInput
  ) {
    deleteOzlife(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
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
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
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
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
