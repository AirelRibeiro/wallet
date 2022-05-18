import apiRequest from '../apiRequest';

const ACTION_LOGIN = 'ACTION_LOGIN';
const GET_CURRENCIES = 'GET_CURRENCIES';
const ACTION_SAVE_CURRENCIES = 'ACTION_SAVE_CURRENCIES';

const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  email,
});

const requestCurrencies = () => ({ type: GET_CURRENCIES });

const actionSaveCurrencies = (currencies) => ({
  type: ACTION_SAVE_CURRENCIES,
  currencies,
});

const fetchCurrencies = () => async (dispatch) => {
  const currenciesData = await apiRequest();
  const currenciesAbbreviations = Object.keys(currenciesData);
  const currenciesAbbreviationsFilter = currenciesAbbreviations
    .filter((coin) => coin !== 'USDT');
  dispatch(actionSaveCurrencies(currenciesAbbreviationsFilter));
};

export {
  actionLogin,
  ACTION_LOGIN,
  requestCurrencies,
  GET_CURRENCIES,
  fetchCurrencies,
  ACTION_SAVE_CURRENCIES,
};
