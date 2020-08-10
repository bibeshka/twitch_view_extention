import React from 'react';
import FollowSingle from './FollowSingle';

const Follows = ({ AUTH_TOKEN, onlineChannels }) => {

    // const[onlineChannels, setOnlineChannels] = useState([]);

    // const getOnlineChannels = async (user_id) => {
    //     try {
    //         const result = await axios({
    //             method: 'get',
    //             url: `https://api.twitch.tv/helix/streams?user_id=${user_id}`,
    //             headers: {
    //                 'Client-ID': CLIENT_ID,
    //                 'Authorization' : "Bearer " + AUTH_TOKEN
    //             }
    //         });

    //         if (result.data.data.length !== 0) {
    //             // console.log(result.data.data[0]);
    //             return result.data.data[0];
    //             // setOnlineChannels(result.data.data);
    //         }
    //         // return result;
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     userFollows.data && userFollows.data.data.map(element => {
    //         getOnlineChannels(element.to_id).then(res => {
    //             // res !== undefined && arr.push(res);
    //             // console.log(arr);
    //             res !== undefined && setOnlineChannels([...onlineChannels, res]);
    //             // res.data && res.data.data.length !== 0 &&  console.log(res.data.data[0]);
    //             // res.data && res.data.data.length !== 0 &&  setOnlineChannels(res.data.data[0]);
    //         })
    //     });
    // });


    return (
        <div className="container">
            {
                onlineChannels && onlineChannels.map(channel => 
                    <FollowSingle key={channel.id} channel = {channel} AUTH_TOKEN={AUTH_TOKEN} />
                )
            }
        </div>
    )
}

export default Follows;

//<FollowSingle channel = {channel} AUTH_TOKEN={AUTH_TOKEN} />