import React from 'react';
import AddInventory from './AddInventory';
import EditInventory from './EditInventory';

const Panel = (props) => {

    let _active = props.active? 'panel-wrapper active':'panel-wrapper';

    return(
        <div className={_active}>
            <div className="over-layer" onClick={() => props.panelSwitcher('close')}></div>
            <div className="panel">
                <div className="head">
                    <span className="close" onClick={() => props.panelSwitcher('close')}>X</span>
                    {props.isEdit? <EditInventory panelData={props.panelData} panelSwitcher={props.panelSwitcher}/> : <AddInventory key={new Date().getTime()} panelSwitcher={props.panelSwitcher}/>}
                </div>
            </div>
        </div>
    )
}

export default Panel;