import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import { CLIENT_ID } from "./api";
import Login from "./components/Login";
import Follows from "./components/Follows";
import Navigation from "./components/Navigation";
import Clips from "./components/Clips";
import Vods from "./components/Vods";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [userFollows, setUserFollows] = useState([]);
  const [onlineChannels, setOnlineChannels] = useState([]);

  useEffect(() => {
    getUserData().then((res) => {
      getUserFollows(res.data.data[0].id);
    });
  }, []);

  //get token from URL
  const getToken = (name) => {
    let s = window.location.href;
    s = s.match(new RegExp(name + "=([^&=]+)"));
    return s ? s[1] : false;
  };

  const AUTH_TOKEN = getToken("access_token");

  if (AUTH_TOKEN) {
    localStorage.setItem("twitch_view_token", AUTH_TOKEN);
  }

  let LS_AUTH_TOKEN = localStorage.getItem("twitch_view_token");

  //get nickname and user_id
  const getUserData = async () => {
    const result = await axios({
      method: "get",
      url: `https://api.twitch.tv/helix/users`,
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: "Bearer " + LS_AUTH_TOKEN,
      },
    });

    setUserData(result);
    return result;
  };

  //get channel user follow
  const getUserFollows = async (id) => {
    const result = await axios({
      method: "get",
      url: `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=100`,
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: "Bearer " + LS_AUTH_TOKEN,
      },
    });

    setUserFollows(result);

    result.data.data.map((channel) => {
      getOnlineChannels(channel.to_id);
    });
  };

  //get follow channels who live now
  const getOnlineChannels = async (user_id) => {
    try {
      const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/streams?user_id=${user_id}`,
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: "Bearer " + LS_AUTH_TOKEN,
        },
      });

      if (result.data.data.length !== 0) {
        setOnlineChannels((onlineChannels) => [
          ...onlineChannels,
          result.data.data[0],
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div>
        <Navigation userData={userData} AUTH_TOKEN={LS_AUTH_TOKEN} />
        <Switch>
          <Route path="/" exact>
            {LS_AUTH_TOKEN ? (
              <Follows
                AUTH_TOKEN={LS_AUTH_TOKEN}
                onlineChannels={onlineChannels}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/clips" exact>
            {LS_AUTH_TOKEN ? (
              <Clips AUTH_TOKEN={LS_AUTH_TOKEN} follows={userFollows} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/vods" exact>
            {LS_AUTH_TOKEN ? (
              <Vods AUTH_TOKEN={LS_AUTH_TOKEN} follows={userFollows} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/login" exact>
            <Login CLIENT_ID={CLIENT_ID} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
