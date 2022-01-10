import { getUser } from 'graphql/queries'
import { createNotification } from 'graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { SendNotification } from 'utils/Noti';

export async function createAlarm(ReceiveUserId, title, content, image) {
    try {
        await API.graphql(graphqlOperation(createNotification, {
            input: {
                userID: ReceiveUserId,
                title: title,
                content: content,
                image: image
            }
        }))
        const receiveUserData = await API.graphql(graphqlOperation(getUser, {
            id: ReceiveUserId
        }))
        const receiveUser = receiveUserData.data.getUser;
        if(receiveUser.ozlife_noti_state == 1) {
            SendNotification(receiveUser.noti_token, title, content);
        }
    } catch (e) {
      console.log(e);
    }
  }
  