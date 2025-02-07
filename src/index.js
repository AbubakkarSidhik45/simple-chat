import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import fetchMessagesReducers from "./reducers/fetchMessagesReducers";
import fetchRoomsReducers from "./reducers/fetchRoomsReducers";

const rootReducer = combineReducers({
  chatMessages: fetchMessagesReducers,
  chatRooms: fetchRoomsReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
