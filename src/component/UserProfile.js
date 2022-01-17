import React from 'react';

export default function UserProfile(props) {

    function logout(){
        global.auth.logout();
        props.panelSwitcher('close');
        props.panelSwitcher('logout');
    }

    return (
    <div className="user-profile">
        <p className="title has-text-centered">Profile</p>
        <fieldset disabled>
            <div className="field">
                <div className="control">
                    <label className="label">Nickname</label>
                    <input  type="text" className="input" defaultValue={props.user.nickname}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Email</label>
                    <input  type="text" className="input" defaultValue={props.user.email}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Type</label>
                    <input  type="text" className="input" defaultValue={props.user.type === 1? 'Manager':'customer'}/>
                </div>
            </div>
        </fieldset>
        <br/>
        <div className="field is-grouped is-grouped-centered">
            <div className="control">
                <button className="button is-danger" type="button" onClick={logout}>Logout</button>
            </div>
            <div className="control">
                <button className="button" type="button" onClick={() => props.panelSwitcher('close')}>Cancel</button>
            </div>
        </div>
    </div>

    )
}