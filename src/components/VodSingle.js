import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { CLIENT_ID } from "../api";

const VodSingle = ({ channelID, channelName, AUTH_TOKEN }) => {
  const [videos, setVideos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getVideo(channelID).then(() => setLoaded(true));
  }, [channelID]);

  const sliceImageString = (str) => {
    const result = str.substr(0, str.length - 22);
    return `${result}250x150.jpg`;
  };

  const timeChange = (str) => {
    let arr = [];
    let result = str.split("");
    result.map((res) => {
      if (res === "h" || res === "m") {
        res = `${res} `;
        return arr.push(res);
      } else {
        return arr.push(res);
      }
    });
    return arr.join("");
  };

  const getVideo = async (channelID) => {
    try {
      const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/videos?user_id=${channelID}&first=3`,
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: "Bearer " + AUTH_TOKEN,
        },
      });

      setVideos(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loaded ? (
        <div className="clips-container">
          {videos[0] ? <h2>{channelName}</h2> : null}
          {videos
            ? videos.map((video) => (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={video.id}
                >
                  <div className="clip-wrapper">
                    <div className="channel-container-img">
                      <img
                        src={sliceImageString(video.thumbnail_url)}
                        alt="Clip screen"
                      />
                    </div>
                    <div className="channel-container-info">
                      <h3>
                        {video.title.length > 30
                          ? video.title.substr(0, 30) + "..."
                          : video.title}
                      </h3>
                      <p>Duration: {timeChange(video.duration)}</p>
                      <p style={{ fontSize: "0.8rem" }}>
                        Created {moment(video.created_at).fromNow()}
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        <i className="fas fa-users"></i>
                        {video.view_count}
                      </p>
                    </div>
                  </div>
                </a>
              ))
            : null}
        </div>
      ) : (
        <div className="loading-gif">
          <img src="images/loading.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default VodSingle;
