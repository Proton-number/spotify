import React from "react";
import useAuthenticationStore from "../../Store/authStore";

function Home() {
  const { user } = useAuthenticationStore();
  return <div>Welcome home! {user.display_name}</div>;
}

export default Home;
