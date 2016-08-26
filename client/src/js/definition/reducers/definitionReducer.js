import { CHANGE_WORD } from '../../store/ActionType';

const initialState = {
  currentWord: '',
  hints: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_WORD :
      return {
        ...state,
        hints: action.payload,
      };
    default:
      return state;
  }
};
