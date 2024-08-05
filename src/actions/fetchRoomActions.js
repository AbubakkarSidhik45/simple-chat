import axios from "axios";

export const FETCH_ROOMS_REQUEST = "FETCH_ROOMS_REQUEST";
export const FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS";
export const FETCH_ROOMS_FAILURE = "FETCH_ROOMS_FAILURE";

export const fetchRoomsRequest = () => ({
  type: FETCH_ROOMS_REQUEST,
});

export const fetchRoomsSuccess = (rooms) => ({
  type: FETCH_ROOMS_SUCCESS,
  payload: rooms,
});

export const fetchRoomsFailure = (error) => ({
  type: FETCH_ROOMS_FAILURE,
  payload: error,
});

export const fetchRooms = () => {
  return async (dispatch) => {
    const userId = 123456;
    dispatch(fetchRoomsRequest());
    try {
      const response = await axios.get(`/api/rooms`, {
        params: { userId },
      });
      dispatch(fetchRoomsSuccess(response.data));
    } catch (error) {
      dispatch(fetchRoomsFailure(error.message));
    }
  };
};
