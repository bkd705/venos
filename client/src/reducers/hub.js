import { HUB_CREATE_SUCCESS, HUB_CREATE_ERROR } from '../actions';


const initialState = {
	created: false,
	hub: null,
	error: undefined
};

export default function hub(state = initialState, action) {
  switch (action.type){
    case HUB_CREATE_SUCCESS:
      return {
        ...state,
		hub: action.hub,
        created: true,
        error: null
      };
    case HUB_CREATE_ERROR:
	console.log(action.payload.message);
      return {
        ...state,
		hub: null,
        created: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
