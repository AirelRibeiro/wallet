// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ACTION_SAVE_CURRENCIES,
  GET_CURRENCIES, ACTION_SAVE_EXPENSE,
  ACTION_DELETE_EXPENSE,
  ACTION_EDIT_EXPENSE,
  ACTION_SAVE_EXPENSE_AFTER_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  editing: false,
  idForEdit: -1,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, loading: true };
  case ACTION_SAVE_CURRENCIES:
    return { ...state, currencies: action.currencies, loading: false };
  case ACTION_SAVE_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case ACTION_DELETE_EXPENSE:
    return { ...state, expenses: action.expenses };
  case ACTION_EDIT_EXPENSE:
    return { ...state, editing: true, idForEdit: action.idForEdit };
  case ACTION_SAVE_EXPENSE_AFTER_EDITING:
    return {
      ...state, editing: false, idForEdit: -1, expenses: action.expenses };
  default:
    return { ...state };
  }
};

export default wallet;
