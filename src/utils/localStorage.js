export const setToLocalStorage = (user) => {
  localStorage.setItem('user', user);
};

export const getLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? result : null;

  return user;
};
