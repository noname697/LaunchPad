const USER_KEY = "launchpad_user";

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};
