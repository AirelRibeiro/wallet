// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ACTION_SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SAVE_EMAIL:
    return { ...state, email: action.email };
  default:
    return { ...state };
  }
};

export default user;
