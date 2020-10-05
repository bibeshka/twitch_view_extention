import React from "react";

const Login = ({ CLIENT_ID }) => {
  return (
    <form className="usernameForm">
      <h1>Login</h1>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="login_btn"
        href={`https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=token&scope=user:edit:follows`}
      >
        Login
      </a>
      <p>
        For login you need accout on
        <span>
          <a
            href="https://www.twitch.tv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitch
          </a>
        </span>
      </p>
    </form>
  );
};

export default Login;
