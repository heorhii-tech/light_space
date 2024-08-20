// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return undefined;
    }
    return { user: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem("user", serializedState);
  } catch (err) {}
};
