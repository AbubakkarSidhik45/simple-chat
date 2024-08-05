import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../actions/fetchMessagesActions";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const { roomId, messageId } = useParams();
  const dispatch = useDispatch();
  const fetchedMessages = useSelector(
    (state) => state.chatMessages.messages || []
  );
  const fetchedNewMessages = useSelector(
    (state) => state.chatMessages.messages || []
  );
  const islastChunkLoaded = useSelector(
    (state) => state.chatMessages.islastChunkLoaded
  );
  const loading = useSelector((state) => state.chatMessages.loading);
  const error = useSelector((state) => state.chatMessages.error);
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messageId) {
      dispatch(fetchMessages(roomId, 1, messageId));
    } else {
      dispatch(fetchMessages(roomId, 1, 0));
    }
  }, [dispatch, roomId, messageId]);

  useEffect(() => {
    if (!messageId) {
      const intervalId = setInterval(() => {
        // dispatch(fetchNewMessages(roomId)); Need to add Action & Reducer file
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, roomId, messageId]);

  useEffect(() => {
    if (fetchedMessages.length > 0) {
      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
    }
    if (fetchedNewMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...fetchedNewMessages]);
    }
  }, [fetchedMessages, fetchedNewMessages]);

  const loadOlderMessages = useCallback(() => {
    const newPage = page + 1;
    if (messageId) {
      dispatch(fetchMessages(roomId, newPage, messageId));
    } else {
      dispatch(fetchMessages(roomId, newPage, 0));
    }
    setPage(newPage);
  }, [dispatch, roomId, page, messageId]);

  const addMessage = useCallback((newMessage) => {
    // dispatch(fetchAddMessages(roomId, newMesage) Need to add Action & Reducer file
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  return (
    <div>
      <h2>Room {roomId}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ChatMessages
        messages={messages}
        loadOlderMessages={loadOlderMessages}
        islastChunkLoaded={islastChunkLoaded}
      />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatRoom;
