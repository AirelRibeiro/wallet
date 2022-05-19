// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ACTION_SAVE_CURRENCIES, GET_CURRENCIES, ACTION_SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, loading: true };
  case ACTION_SAVE_CURRENCIES:
    return { ...state, currencies: action.currencies, loading: false };
  case ACTION_SAVE_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return { ...state };
  }
};

export default wallet;
