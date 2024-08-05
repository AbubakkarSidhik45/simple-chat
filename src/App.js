import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import ChatHome from "./components/ChatHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<ChatHome />} />
          <Route path="/room/:roomId/:messageId?" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
