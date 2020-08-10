import React from 'react'

const Login = ({ CLIENT_ID }) => {
    return (
        <div className="App">
            <a href={`https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=token&scope=user:edit:follows`}>Login</a>
        </div>
    )
}

export default Login;