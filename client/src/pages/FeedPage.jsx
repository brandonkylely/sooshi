import token from "../utils/token";
import { useEffect } from "react";

function FeedPage() {
  // useEffect(() => {
  //   console.log(token.isExpired());
  // }, []);
  // if (token.isExpired()) {
  //   token.logout();
  //   window.location.href = "/";
  // }
  return (
    <div>
      <h1>Feed Page</h1>
      {/* <div>{token.isExpired}</div> */}
    </div>
  );
}

export default FeedPage;