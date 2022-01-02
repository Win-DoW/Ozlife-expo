import { listChatRoomUsersSearchOnChatScreen } from "graphql/custom";
import { createChatRoom, createChatRoomUser } from "graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export async function ReturnChatRoomID(userId, otherUserId) {
  // '채팅 시작'등 과 같은 버튼을 클릭했을 경우를 의미
  
  try {
    // 채팅을 시작할 때 그 사람과의 채팅방이 존재하는지 확인
    // 존재하면 그 채팅방으로 이동
    // 존재하지 않으면 새로운 채팅방 생성 후 이동

    const existChatRoom = await API.graphql(
      graphqlOperation(listChatRoomUsersSearchOnChatScreen, {
        filter: {
          userID: { eq: userId },
          otherUserID: { eq: otherUserId },
        },
      })
    );

    if (existChatRoom.data.listChatRoomUsers.items.length !== 0) {
      // 채팅방이 존재하면 존재하는 채팅방으로 이동하는 과정
      console.log("이미 채팅방이 존재");

      // navigation.navigate("ChatRoomScreen", {
      //   chatRoomId: existChatRoom.data.listChatRoomUsers.items[0].chatRoomID,
      // });
      return existChatRoom.data.listChatRoomUsers.items[0].chatRoomID
    } else {
      // 채팅방이 존재하지 않으면 새로운 채팅방을 생성하는 과정
      console.log("채팅방 생성");

      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {
          input: {
            lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16", // 필수로 ID를 넣어줘야하는데 임의의 ID로 생성
            messagesCount: 0, // 초기에 쌓인 메세지는 0개를 의미
          },
        })
      );

      if (!newChatRoomData.data) {
        console.log("채팅방 생성 실패");
        return;
      } // 채팅방 생성에 실패한 경우를 의미

      const newChatRoom = newChatRoomData.data.createChatRoom; // 새로 생성된 채팅방에 대한 실질적인 데이터를 의미

      // 2. 채팅이 이루어지는 상대를 채팅방에 추가시켜서 인식
      // 즉 생성된 채팅방과 유저를 이어주는 ChatRoomUser를 만드는 단계

      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: otherUserId,
            otherUserID: userId,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      // 3. 채팅을 시작한 유저를 채팅방에 추가시켜서 인식
      // 즉 생성된 채팅방과 유저를 이어주는 ChatRoomUser를 만드는 단계

      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userId,
            otherUserID: otherUserId,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      // navigation.navigate("ChatRoomScreen", {
      //   chatRoomId: newChatRoom.id,
      // });
      return newChatRoom.id
    }
  } catch (e) {
    console.log(e);
  }
}

export function ToDo(userId, otherUserID) {
  return userId
}
