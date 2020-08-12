import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userData, AUTH_TOKEN }) => {

    const logoutFn = () => {
        localStorage.removeItem('twitch_view_token');
        window.location = '';
    }

    return (
        <div>
            {
                AUTH_TOKEN ?
                <div>
                    <header>
                        <a href="https://www.twitch.tv/"><i className="fab fa-twitch"></i></a>
                        <Link to="/"><h1>Twitch view</h1></Link>
                        <h2>{userData.data && userData.data.data[0].display_name}</h2>
                        <button type="submit" className="logout-button" onClick={ () => logoutFn() }>
                            <i className="fas fa-sign-out-alt" style={{fontSize: '20px'}} />
                        </button>
                    </header> 
                    <nav>
                        <div>
                            <Link to="/"><h1>Follow</h1></Link>
                        </div>
                        <div>
                            <Link to="/clips"><h1>Clips</h1></Link>
                        </div>
                        <div>
                            <Link to="/vods"><h1>VODs</h1></Link>
                        </div>
                    </nav>
                </div> :
                <header>
                    <a href="https://www.twitch.tv/"><i className="fab fa-twitch"></i></a>
                    <Link to="/"><h1>Twitch view</h1></Link>
                </header>  
            }
        </div>
    )
}

export default Navigation;
