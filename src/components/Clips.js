import React, { useState, useEffect } from 'react'
import moment from 'moment';
import ClipSingle from './ClipSingle';

const Clips = ({ follows, AUTH_TOKEN }) => {

    const [clipDate, setClipDate] = useState({
        started_at: `${moment('1970-01-01T00:00:00Z').toISOString()}`
    });

    const clipsDate = (date) => {
        let dateProp = new Date();
        switch(date) {
          case 'allTime':
            setClipDate({started_at: `${moment('1970-01-01T00:00:00Z').toISOString()}`});
            break;
          case 'mounth':
            setClipDate({started_at: `${moment(dateProp.setMonth(dateProp.getMonth() - 1)).toISOString()}`});
            break;
          case 'week':
            setClipDate({started_at: `${moment(dateProp.setDate(dateProp.getDate() - 7)).toISOString()}`});
            break;
          case 'today':
            setClipDate({started_at: `${moment(dateProp.setDate(dateProp.getDate() - 1)).toISOString()}`});
            break;
          default:
            break;
        }
      }


    return (
        <div className="container">
            <>
                <div className="clips-time-buttons">
                    <button onClick={(e) => clipsDate(e.target.name)} name="allTime">All time</button>
                    <button onClick={(e) => clipsDate(e.target.name)} name="mounth">Mounth</button>
                    <button onClick={(e) => clipsDate(e.target.name)} name="week">Week</button>
                    <button onClick={(e) => clipsDate(e.target.name)} name="today">Today</button>
                </div>
                {
                    follows && follows.data && follows.data.data.map(channel => (
                        <ClipSingle
                            AUTH_TOKEN={AUTH_TOKEN}  
                            key={channel.to_id} 
                            channelName={channel.to_name} 
                            channelID={channel.to_id}
                            clipDate={clipDate.started_at} 
                        />
                    ))
                }
            </>
        </div>
    )
}

export default Clips;