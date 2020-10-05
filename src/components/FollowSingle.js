import React, { useEffect, useState } from "react";
import { CLIENT_ID } from "../api";
import axios from "axios";
import moment from "moment";

const FollowSingle = ({ AUTH_TOKEN, channel }) => {
  const [games, setGame] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getGame(channel.game_id).then((res) => {
      setGame(res);
      setLoaded(true);
    });
  }, []);

  const getGame = async (id) => {
    try {
      const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/games?id=${id}`,
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: "Bearer " + AUTH_TOKEN,
        },
      });

      return result.data.data[0].name;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loaded ? (
        <div className="channels-container">
          <div className="channel-container">
            <a
              href={`https://www.twitch.tv/${channel.user_name}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="channel-container-img">
                <img
                  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.user_name.toLowerCase()}-250x150.jpg`}
                  alt="Channel screen"
                />
              </div>

              <div className="channel-container-info">
                <h2>{channel.user_name}</h2>

                <p className="stream-title">
                  <strong>Title:</strong>
                  {channel.title.length > 30
                    ? channel.title.substr(0, 30) + "..."
                    : channel.title}
                </p>
                <p>
                  <i className="fas fa-users"></i>
                  <span className="viewers-count">{channel.viewer_count}</span>
                </p>
                <p className="stream-time">
                  <strong>Started:</strong>{" "}
                  {moment(channel.started_at).fromNow()}
                </p>
                <p className="game-title">Game: {games}</p>
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div className="loading-gif">
          <img src="images/loading.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default FollowSingle;
