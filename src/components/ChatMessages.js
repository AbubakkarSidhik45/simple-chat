import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const ChatMessages = ({ messages, loadOlderMessages, islastChunkLoaded }) => {
  const chatRef = useRef(null);
  const prevHeightRef = useRef(0);

  const handleScroll = useCallback(() => {
    if (chatRef.current.scrollTop === 0 && !islastChunkLoaded) {
      prevHeightRef.current = chatRef.current.scrollHeight;
      loadOlderMessages();
    }
  }, [loadOlderMessages, islastChunkLoaded]);

  useEffect(() => {
    const chat = chatRef.current;
    chat.addEventListener("scroll", handleScroll);
    return () => chat.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (chatRef.current) {
      if (prevHeightRef.current) {
        const newHeight = chatRef.current.scrollHeight;
        chatRef.current.scrollTop = newHeight - prevHeightRef.current;
        prevHeightRef.current = 0;
      } else {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div
      ref={chatRef}
      style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc" }}
    >
      {islastChunkLoaded && <h1>Messages are NOT encrypted</h1>}
      {messages.map((message) => (
        <div
          key={message.id}
          style={{ padding: "10px", borderBottom: "1px solid #eee" }}
        >
          {message.text} <Link to={message.link}>Share</Link>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
