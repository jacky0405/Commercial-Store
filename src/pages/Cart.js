import React, { useEffect } from 'react';
import Layout from '../Layout';
import CartItem from '../component/CartItem';
import axios from '../common/axios';
import { useState } from 'react/cjs/react.development';
import { formatPrice } from '../common/helper';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const Cart = () => {

    const [cartItems, setCartItem] = useState([]);
    const [helper, setHelper] = useState("");

    useEffect(() => {
        const user = global.auth.getUser() || {};
        axios.get(`https://commercial-store.herokuapp.com/carts?userId=${user.email}`).then(r => {
            setCartItem(r.data);
        })
    },[helper])

    async function countChange(id, itemCount){
        const _item = cartItems.find(item => {
            return id === item.productId;
        })
        _item.count = Number(itemCount);
        await axios.put(`https://commercial-store.herokuapp.com/carts/${_item.id}`,_item).then(r => {
            console.log("change count good");
        });
        setHelper(new Date().getTime());
    }

    function sumPrice(){
        const totalPrice = cartItems.map(item => {
            return item.price*item.count;
        }).reduce((pre,curr) => pre+curr, 0);
        return totalPrice;
    }

    async function deleteItem(id){
        await axios.delete(`https://commercial-store.herokuapp.com/carts/${id}`);
        setHelper(new Date().getTime());
    }

    return (
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    <TransitionGroup component={null}>
                        {
                            cartItems.map(item => {
                                return (
                                    <CSSTransition classNames="cart-item" timeout={300} key={item.id}>
                                        <CartItem key={item.productId} countChange={countChange} deleteItem={deleteItem} item={item}/>
                                    </CSSTransition >
                                )
                            })
                        }
                    </TransitionGroup >
                    {cartItems.length === 0 && <p className="no-cart">No items</p>}
                </div>
                <div className="cart-total">
                    Total:
                    <span className="total-price">{formatPrice(sumPrice())}</span>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;