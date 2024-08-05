import React, { useState } from "react";

const MessageInput = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", marginTop: "10px" }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ flex: 1, padding: "10px" }}
      />
      <button type="submit" style={{ padding: "10px" }}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
