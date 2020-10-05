import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { CLIENT_ID } from "../api";

const ClipSingle = ({ channelID, channelName, clipDate, AUTH_TOKEN }) => {
  const [loaded, setLoaded] = useState(false);
  const [clips, setClips] = useState([]);

  useEffect(() => {
    let mounted = true;

    if (clipDate) {
      getClips(channelID, clipDate).then((data) => {
        if (mounted) {
          setClips(data);
          setLoaded(true);
        }
      });
    }

    return () => (mounted = false);
  }, [channelID, clipDate]);

  const getClips = async (channelID, clipDate) => {
    try {
      const result = await axios({
        method: "get",
        url: `https://api.twitch.tv/helix/clips?broadcaster_id=${channelID}&first=3&started_at=${clipDate}&ended_at=${moment(
          Date.now()
        ).toISOString()}`,
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: "Bearer " + AUTH_TOKEN,
        },
      });

      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loaded ? (
        <div className="clips-container">
          {clips && clips[0] ? <h2>{channelName}</h2> : null}
          {clips
            ? clips.map((clip) => (
                <a
                  href={clip.url}
                  target="_blank"
                  key={clip.id}
                  rel="noopener noreferrer"
                >
                  <div className="clip-wrapper">
                    <div className="channel-container-img">
                      {clip.thumbnail_url ? (
                        <img src={clip.thumbnail_url} alt="Clip screen" />
                      ) : null}
                    </div>
                    <div className="channel-container-info">
                      <h3>
                        {clip.title.length > 30
                          ? clip.title.substr(0, 30) + "..."
                          : clip.title}
                      </h3>
                      <p>
                        <i className="fas fa-users"></i>
                        {clip.view_count}
                      </p>
                      <p>Created {moment(clip.created_at).fromNow()}</p>
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

export default ClipSingle;
