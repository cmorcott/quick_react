import React from 'react'
import './Header.css'
import {useAuthState, signInWithGoogle, firebaseSignOut} from "../utilities/firebase"

const Header = ({header}) => {

    const [user] = useAuthState();

    return (
        <div className="topTitle">
            <h1>{header}</h1>
            {user ? (<button className="google-signin-btn" onClick={firebaseSignOut}>Sign Out</button>) : 
            (<button className="google-signin-btn" onClick={signInWithGoogle}>Sign In</button>)
            }
        </div>
    )

}

export default Header;