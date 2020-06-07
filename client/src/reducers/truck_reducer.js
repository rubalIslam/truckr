import {
  GET_TRUCKS,
  ADD_TRUCKS,
  GET_BRANDS,
  ADD_BRAND,
  CLEAR_TRUCKS,
  GET_TRUCKTYPE,
  ADD_TRUCKTYPE,
  GET_CAPACITY,
  GET_TRUCK_DETAIL,
  CLEAR_TRUCK_DETAIL,
  ADD_TRUCK_COMMENTS,
  GET_TRUCK_COMMENTS
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case ADD_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands,
      };
    case GET_TRUCKS:
      return {
        ...state,
        trucks: action.payload,
      };
    case GET_TRUCKTYPE:
      return { ...state, trucktype: action.payload };
    case ADD_TRUCKTYPE:
      return {
        ...state,
        addTrucktype: action.payload.success,
        trucktype: action.payload.woods,
      };
    case GET_TRUCK_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_TRUCK_COMMENTS:
      return {
        ...state,
        commentsData: {
          ...state.commentsData,
          comments: action.payload,
        },
      };
    case ADD_TRUCKS:
      return { ...state, addTrucks: action.payload };
    case CLEAR_TRUCKS:
      return { ...state, addTrucks: action.payload };
    case GET_TRUCK_DETAIL:
      return { ...state, truckDetail: action.payload };
    case CLEAR_TRUCK_DETAIL:
      return { ...state, truckDetail: action.payload };
    default:
      return state;
  }
}
