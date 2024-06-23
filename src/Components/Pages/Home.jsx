import React from "react";
import useAuthenticationStore from "../../Store/authStore";

function Home() {
  const { user } = useAuthenticationStore();
  return (
    <div>
      <h2> Hello, {user.display_name} Good Evening! </h2>
    </div>
  );
}

export default Home;
