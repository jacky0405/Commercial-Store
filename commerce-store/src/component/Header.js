import React from 'react';
import { Link } from 'react-router-dom';


const Header = (props) => {


    return(
        <div className="header">
            <div className="grid">
                <div className="satrt">
                    <Link to="/">HOME</Link>
                </div>
                <div className="end">
                    {props.user.nickname? (
                        <span className="nickname" onClick={() => props.panelSwitcher('open')}>
                            <i className="far fa-user"></i>
                            {props.user.nickname}
                        </span>
                    ):(
                        <React.Fragment>
                            <Link to="/login">LOGIN</Link>
                            <Link to="/register">REGISTER</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;