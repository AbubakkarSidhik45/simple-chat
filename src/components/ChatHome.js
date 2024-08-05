import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRooms } from "../actions/fetchRoomActions";
const ChatHome = () => {
  const dispatch = useDispatch();
  const allrooms = useSelector((state) => state.chatRooms.rooms);
  // Assume rooms = [room1, room2, room3, room4, room5]
  const loading = useSelector((state) => state.chatRooms.loading);
  const error = useSelector((state) => state.chatRooms.error);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div>
      <h1>Chat Rooms</h1>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {allrooms.map((room) => (
          <li key={room}>
            <Link to={`/room/${room}`}>Room {room}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHome;
