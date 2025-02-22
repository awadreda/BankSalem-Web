
export const SaveCurrentUserIDINLocalStorage = (userID: number) => {
  localStorage.setItem("currentUserID", userID.toString());
};

export const SaveCurrentClientIDINLocalStorage = (clientID: number) => {
  localStorage.setItem("currentClientID", clientID.toString());
};

export const GetCurrentUserIDFromLocalStorage = () => {
  return localStorage.getItem("currentUserID");
};

export const GetCurrentClientIDFromLocalStorage = () => {
  return localStorage.getItem("currentClientID");
};


export const RemoveCurrentUserIDFromLocalStorage = () => {
  localStorage.removeItem("currentUserID");
};

export const RemoveCurrentClientIDFromLocalStorage = () => {
  localStorage.removeItem("currentClientID");
};

