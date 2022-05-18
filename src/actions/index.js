// Coloque aqui suas actions
const ACTION_LOGIN = 'ACTION_LOGIN';

const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  email,
});

export {
  actionLogin,
  ACTION_LOGIN,
};
