import React, { useMemo, useState } from 'react';
import Header from './component/Header';
import PanelProfile from './component/PanelProfile';
import { withRouter } from 'react-router-dom';

export default withRouter(function Layout(props){

    const user = useMemo(() => {
        return global.auth.getUser() || {};
    }, []);

    const [active, setActive] = useState(false);
    
    const panelSwitcher = (action) => {
        if(action === 'open'){
            setActive(true);
        } else if (action === 'close'){
            setActive(false);
        } else if (action === 'logout') {
            props.history.go(0);
        }
    }


    return(
        <div className="main">
            <Header user={user} panelSwitcher={panelSwitcher} />
            {props.children}
            <PanelProfile active={active} panelSwitcher={panelSwitcher} user={user}/>
        </div>
    );
})