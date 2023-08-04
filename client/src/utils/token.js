import decode from "jwt-decode";

const tokenUtil = {
  login: (token) => localStorage.setItem("id_token", token),
  logout: () => {
    console.log("Logging Out")
    console.log(localStorage.getItem("id_token"));
    localStorage.removeItem("id_token");
  },
  getToken: () => {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const isExpired = tokenUtil.isExpired(idToken);
      if (isExpired) {
        tokenUtil.logout();
      }
      return tokenUtil.decode(idToken);
    }
    return null;
  },
  decode: (token) => decode(token),
  isExpired: (token) => {
    const decoded = decode(token);
    return decoded.exp * 1000 < Date.now();
  },
};

export default tokenUtil;