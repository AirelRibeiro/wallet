// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ACTION_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return { ...state, email: action.email };
  default:
    return { ...state };
  }
};

export default user;
