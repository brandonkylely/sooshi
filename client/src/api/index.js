import axios from "axios";

axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "id_token"
)}`;

export const post = async (
  endpoint,
  params = {}
) => {
  const res = await axios.post(endpoint, params);
  return res.data;
};
