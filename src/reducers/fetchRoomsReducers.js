import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,
} from "../actions/fetchRoomActions";

const initialState = {
  loading: false,
  error: null,
  rooms: [],
};
const fetchRoomsReducers = (state = initialState, action) => {
  switch (action?.type) {
    case FETCH_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action?.payload,
      };
    case FETCH_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    default: {
      return state;
    }
  }
};

export default fetchRoomsReducers;
