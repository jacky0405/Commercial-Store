import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';

const ToolBox = (props) => {

    const [searchText, setSearchText] = useState("");

    const cartNum = () => {
        let num = 0;
        props.cartItem.forEach(element => {
            num += element.count;
        });
        return num;
    }

    const handleChange = (e) => {
        setSearchText(e.target.value);
        props.search(e.target.value);
    }

    const clearText = () => {
        setSearchText("");
        props.search("");
    }

    const goCart = () => {
        if(!global.auth.isLogin()) {
            props.history.push('/login');
            toast.info('Please Login', {
                autoClose: 2000,
                });
        }else{
            props.history.push('/shoppingCart');
        }
    }

    return (
        <div className="tool-box">
            <div className="logo-text">
                Store
            </div>
            <div className="search-box">
                <div className="field has-addons">
                    <div className="control">
                        <input type="text" className="input search-input" 
                        name="searchText" value={searchText} placeholder="Search Product"
                        onChange={handleChange}/>
                    </div>
                    <div className="control">
                        <button className="button" onClick={clearText}>X</button>
                    </div>
                </div>
            </div>
            <div className="cart-box" onClick={goCart}>
                <i className="fas fa-shopping-cart"></i>
                <span>({cartNum()})</span>
            </div>
        </div>
    )
}

export default withRouter(ToolBox);