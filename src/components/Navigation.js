import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <header>
                <a href="https://www.twitch.tv/"><i className="fab fa-twitch"></i></a>
                <Link to="/"><h1>Twitch view</h1></Link>
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
        </div>
    )
}

export default Navigation;
