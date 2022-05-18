// Coloque aqui suas actions
const ACTION_SAVE_EMAIL = 'ACTION_SAVE_EMAIL';

const actionSaveEmail = (email) => ({
  type: ACTION_SAVE_EMAIL,
  email,
});

export {
  actionSaveEmail,
  ACTION_SAVE_EMAIL,
};
