import React from "react";
import useAuthenticationStore from "../../Store/authStore";
import TopNav from "../TopNav";

function Home() {
  const { user } = useAuthenticationStore();
  return (
    <div>
    </div>
  );
}

export default Home;
