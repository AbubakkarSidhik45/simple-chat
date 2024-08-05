import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../actions/fetchMessagesActions";

const initialState = {
  loading: false,
  error: null,
  messages: [],
  islastChunkLoaded: false,
};

const fetchMessagesReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: payload.messages,
        islastChunkLoaded: payload.islastChunkLoaded,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default: {
      return state;
    }
  }
};

export default fetchMessagesReducers;
