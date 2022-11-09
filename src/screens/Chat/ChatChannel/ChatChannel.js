import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useAuthContext } from "../../../utils/auth/AuthContext";
import { firestoreDb } from "../../../utils/dbs/FireStore";
import { onSnapshot, collection } from "firebase/firestore";
import YouMessage from "./YouMessage";
import MeMessage from "./MeMessage";
import InputBox from "./InputBox";

export default function ChatChannel({ route }) {
  const { user } = useAuthContext();
  const [channelMessages, setChannelMessages] = useState([]);

  const renderMessageDb = (messageObject, i) => {
    // check messageObject that it's a chat messageor not
    if (messageObject.photo === "" || messageObject.location === "") {
      if (messageObject.sender === user.uid) {
        return <MeMessage key={i} message={messageObject.text} />;
      } else {
        return <YouMessage key={i} message={messageObject.text} />;
      }
    }
    // if it's not a chat message
    else {
      // return location photo assistance or emergency here
    }
  };
  const sortMessage = (messageArray) => {
    let sortedArray = [];
    if (messageArray.length != undefined || messageArray.length != 0) {
      sortedArray = messageArray.sort(
        (a, b) => a.timestamp.seconds - b.timestamp.seconds
      );
    }
    return sortedArray;
  };

  const filterMessage = async (messageArray, uid1, uid2) => {
    let filtered = [];
    messageArray.map((e) => {
      if (e.sender == uid1 && e.receiver == uid2) {
        filtered.push(e);
      } else if (e.sender == uid2 && e.receiver == uid1) {
        filtered.push(e);
      }
    });
    return filtered;
  };

  // get all message from db
  const getAllMessages = async (userId) => {
    try {
      // listening for any changes in message collection
      const unsub = onSnapshot(
        collection(firestoreDb, "Message"),
        (snapShot) => {
          let messages = [];
          snapShot.docs.forEach((doc) => {
            messages.push(doc.data());
          });
          console.log([...messages]);
          filterMessage(
            messages,
            user.uid,
            route.params.friendData.userId
          ).then((filtered) => {
            setChannelMessages([...sortMessage(filtered)]);
          });
        },
        (error) => {
          console.log(error.message);
        }
      );

      if (channelMessages.length === 0) {
        console.log(`getAllMessages: No chat found for ${userId}`);
        return [];
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(
        `getAllMessages: Failed to get user's chat for ${userId}`
      );
    }
  };
  useEffect(() => {
    getAllMessages(user.uid);
  }, []);
  return (
    <View style={styles.page}>
      <ScrollView style={styles.content}>
        {channelMessages.map((e, i) => {
          return renderMessageDb(e, i);
        })}
      </ScrollView>
      <InputBox
        setChannelMessages={setChannelMessages}
        friendData={route.params.friendData}
        userChat={route.params.userChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "88%",
    height: "80%",
    overflow: "scroll",
    flexDirection: "column",
  },
});