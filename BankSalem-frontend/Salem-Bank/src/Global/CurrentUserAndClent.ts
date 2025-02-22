export const SaveCurrentUserIDINLocalStorage = (userID: number) => {
  localStorage.setItem("currentUserID", userID.toString());
  // console.log("Saved currentUserID:", userID);
};

export const SaveCurrentClientIDINLocalStorage = (clientID: number) => {
  localStorage.setItem("currentClientID", clientID.toString());
  // console.log("Saved currentClientID:", clientID);
};

export const GetCurrentUserIDFromLocalStorage = () => {
  const userID = localStorage.getItem("currentUserID");
  // console.log("Retrieved currentUserID:", userID);
  return userID;
};

export const GetCurrentClientIDFromLocalStorage = () => {
  const clientID = localStorage.getItem("currentClientID");
  // console.log("Retrieved currentClientID:", clientID);
  return clientID;
};

export const RemoveCurrentUserIDFromLocalStorage = () => {
  localStorage.removeItem("currentUserID");
  // console.log("Removed currentUserID from localStorage");
};

export const RemoveCurrentClientIDFromLocalStorage = () => {
  localStorage.removeItem("currentClientID");
  // console.log("Removed currentClientID from localStorage");
};
