import React from 'react';
import {formatPrice} from '../common/helper';

const Product = (props) => {
    const {id, name, image, tags, price, status} = props.product;
    const _pClass = status === 'available'? "product" : "product out-stock";

    function renderManagerBtn(){
        const user = global.auth.getUser() || {};
        if(user.type === 1){
            return (
                <div className="p-head has-text-right">
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h" onClick={() => props.panelSwitcher('open',true, id)}></i>
                    </span>
                </div>
            )
        }

    }

    return (
        <div className={_pClass}>
            <div className="p-content">
                {renderManagerBtn()}
                <div className="img-wrapper">
                    <div className="out-stock-text">Out Of Stock</div>
                    <figure className="img is-4by3">
                        <img src={image} alt="X"/>
                    </figure>
                </div>
                <p className="p-tags">{tags}</p>
                <p className="p-name">{name}</p>
            </div>
            <div className="p-footer">
                <p className="price">{formatPrice(price)}</p>
                <button className="add-cart" disabled={status === 'unavailable'} onClick={() => props.addCart(props.product)}>
                    <i className="fas fa-shopping-cart"></i>
                    <i className="fas fa-exclamation"></i>
                </button>
            </div>
        </div>

    )
}

export default Product;