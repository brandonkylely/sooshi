import decode from "jwt-decode";

const tokenUtil = {
  login: (token) => localStorage.setItem("id_token", token),
  logout: () => {
    // console.log("Logging Out")
    // console.log(localStorage.getItem("id_token"));
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
    // 7200 -> 2 hours
    return decoded.exp * 7200 < Date.now();
  },
};

export default tokenUtil;