import React from 'react';
import VodSingle from './VodSingle';

const Vods = ({ follows, AUTH_TOKEN }) => {
    return (
        <div className="container">
            {
                follows && follows.data && follows.data.data.map(channel => (
                    <VodSingle 
                        key={channel.to_id}
                        channelName={channel.to_name}
                        channelID={channel.to_id}
                        AUTH_TOKEN={AUTH_TOKEN}
                    />
                ))
            }
        </div>
    )
}

export default Vods;
