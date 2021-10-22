import React from 'react';
import UserProfile from './UserProfile';

const PanelProfile = (props) => {

    let _active = props.active? 'panel-wrapper active':'panel-wrapper';

    return(
        <div className={_active}>
            <div className="over-layer" onClick={() => props.panelSwitcher('close')}></div>
            <div className="panel">
                <div className="head">
                    <span className="close" onClick={() => props.panelSwitcher('close')}>X</span>
                    <UserProfile user={props.user} panelSwitcher={props.panelSwitcher}/>
                </div>
            </div>
        </div>
    )
}

export default PanelProfile;