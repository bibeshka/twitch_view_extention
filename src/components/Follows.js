import React from "react";
import FollowSingle from "./FollowSingle";

const Follows = ({ AUTH_TOKEN, onlineChannels }) => {
  return (
    <div className="container">
      {onlineChannels &&
        onlineChannels.map((channel) => (
          <FollowSingle
            key={channel.id}
            channel={channel}
            AUTH_TOKEN={AUTH_TOKEN}
          />
        ))}
    </div>
  );
};

export default Follows;
