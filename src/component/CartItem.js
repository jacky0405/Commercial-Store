import React from 'react';

export default function CartItem(props){

    return(
        <div className="columns is-vcentered">
            <div className="column is-narrow">
                <span className="close" onClick={() => props.deleteItem(props.item.id)}>X</span>
            </div>
            <div className="column is-narrow">
                <img src={props.item.image} alt="" width="100"/>
            </div>
            <div className="column cart-name is-narrow">{props.item.name}</div>
            <div className="column">
                <span className="price">{props.item.price}</span>
            </div>
            <div className="column">
                <input type="number" name="count" value={props.item.count} onChange={(e) => props.countChange(props.item.productId,e.target.value)} className="input num-input" />
            </div>
            <div className="column">
                <span className="sum-price">{Number(props.item.price)*props.item.count}</span>
            </div>
        </div>
    )
}