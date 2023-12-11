export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

//Refresh .............................................. 
export const getRefreshToken = () => {
  return localStorage.getItem("refreshtoken");
};

export const setRefreshToken = (Refreshtoken) => {
  localStorage.setItem("refreshtoken", Refreshtoken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshtoken");
};
