import apiRequest from '../apiRequest';

const ACTION_LOGIN = 'ACTION_LOGIN';
const GET_CURRENCIES = 'GET_CURRENCIES';
const ACTION_SAVE_CURRENCIES = 'ACTION_SAVE_CURRENCIES';
const ACTION_SAVE_EXPENSE = 'ACTION_SAVE_EXPENSE';
const ACTION_DELETE_EXPENSE = 'ACTION_DELETE_EXPENSE';

const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  email,
});

const requestCurrencies = () => ({ type: GET_CURRENCIES });

const actionSaveCurrencies = (currencies) => ({
  type: ACTION_SAVE_CURRENCIES,
  currencies,
});

const actionSaveExpense = (expense) => ({
  type: ACTION_SAVE_EXPENSE,
  expense,
});

const fetchCurrencies = () => async (dispatch) => {
  const currenciesData = await apiRequest();
  const currenciesAbbreviations = Object.keys(currenciesData);
  const currenciesAbbreviationsFilter = currenciesAbbreviations
    .filter((coin) => coin !== 'USDT');
  dispatch(actionSaveCurrencies(currenciesAbbreviationsFilter));
};

const actionDeleteExpense = (expenses) => ({
  type: ACTION_DELETE_EXPENSE,
  expenses,
});

export {
  actionLogin,
  ACTION_LOGIN,
  requestCurrencies,
  GET_CURRENCIES,
  fetchCurrencies,
  ACTION_SAVE_CURRENCIES,
  actionSaveExpense,
  ACTION_SAVE_EXPENSE,
  actionDeleteExpense,
  ACTION_DELETE_EXPENSE,
};
