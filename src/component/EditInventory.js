import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

export default function EditInventory(props){

    const [state, setState] = useState(props.panelData)

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
        setState({...state});
    }

    function submit(e) {
        e.preventDefault();
        const product = {...state};
        axios.put(`http://localhost:5000/products/${product.id}`,product).then(r => {
            console.log(r.data);
        });
        props.panelSwitcher('close');
        toast.success('Edit Success', {
            autoClose: 2000,
            });
    }

    function productDelete() {
        const product = {...state};
        axios.delete(`http://localhost:5000/products/${product.id}`).then(r => {
            console.log(r.data);
        });
        toast.success('Delete Success', {
            autoClose: 2000,
            });
    }

    return(
        <div className="inventory">
            <p className="title has-text-centered">EditInventory</p>
            <form onSubmit={submit}>
                <div className="field">
                    <label className="label is-left">Name</label>
                    <div className="control">
                        <textarea className="textarea" name="name" value={state.name} onChange={handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Price</label>
                        <input type="number" className="input" name="price" value={state.price} onChange={handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Tags</label>
                        <input  type="text" className="input" name="tags" value={state.tags} onChange={handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Image</label>
                        <input  type="text" className="input" name="image" value={state.image} onChange={handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Status</label>
                        <div className="select is-fullwidth">
                            <select name="status" value={state.status} onChange={handleChange}>
                                <option>available</option>
                                <option>unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-link">Save</button>
                    </div>
                    <div className="control">
                        <button className="button" type="button" onClick={() => {productDelete(); props.panelSwitcher('close')}}>Delete</button>
                    </div>
                    <div className="control">
                        <button className="button" type="button" onClick={() => props.panelSwitcher('close')}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}