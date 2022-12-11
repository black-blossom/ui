export const getLocalStorage = (key: string, defaultValue: any) => {
  const value = localStorage.getItem(key);
  if(value === null || value === undefined) return defaultValue;
  return JSON.parse(value);
};

export const setLocalStorage = (key: string, value: any) => {
  if(value === null || value === undefined) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
