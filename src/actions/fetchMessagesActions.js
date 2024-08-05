import axios from "axios";

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const fetchMessagesRequest = () => ({
  type: FETCH_MESSAGES_REQUEST,
});

export const fetchMessagesSuccess = ({ messages, islastChunkLoaded }) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: {
    messgaes: messages,
    islastChunkLoaded: islastChunkLoaded, // it can be used to retrict the api, when all messages is loaded
  },
});

export const fetchMessagesFailure = (error) => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: error,
});

export const fetchMessages = (roomId, page, messageId) => {
  // roomId = room1
  // page = 1 or 2 , 3 .. so on
  // messageId = it is used for get particular message Id when user the click the link
  return async (dispatch) => {
    const userId = 123456;
    dispatch(fetchMessagesRequest());
    try {
      const response = await axios.get(`/api/messages`, {
        params: { roomId, page, messageId, userId },
      });
      // response will have 15 messages or it will have less than that once it reaches the last chunk
      // Assume when message id is passed it will have 5 messages before and 9 messages after the message id from backend
      dispatch(fetchMessagesSuccess(response.data));
    } catch (error) {
      dispatch(fetchMessagesSuccess(error.message));
    }
  };
};
