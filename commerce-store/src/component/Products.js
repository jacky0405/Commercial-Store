import React, { useEffect, useState } from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
import axios from '../common/axios';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Panel from './Panel';
import {toast} from 'react-toastify';
import { withRouter } from 'react-router-dom';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [sourceProduct, setSourceProduct] = useState([]);
    const [active, setActive] = useState(false);
    const [panelData, setPanelData] = useState(undefined);
    const [isEdit, setIsEdit] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [addCartHelp, setAddCartHelp] = useState(false);

    const panelSwitcher = (action, Edit, productId) => {
        if(action === 'open'){
            if(Edit === true){
                setIsEdit(true);
                const _productItem = products.find((item) =>{
                    return item.id === productId;
                })
                console.log(_productItem);
                setPanelData(_productItem);
            }
            setActive(true);
        } else if (action === 'close'){
            setActive(false);
            setIsEdit(false);
        } else {
            alert('error action!');
        }
    }

    const renderManagerBtn = () => {
        const user = global.auth.getUser() || {};
        if(user.type === 1){
            return (
                <button className="button is-primary add-btn" onClick={() => panelSwitcher('open')}>Add</button>
            )
        }
    }

    const addCart = async (product) => {
        if(!global.auth.isLogin()) {
            props.history.push('/login');
            toast.info('Please Login', {
                autoClose: 2000,
                });
            return;
        }
        const exist = cartItem.find(item => {
            return item.productId === product.id;
        })
        if(exist){
            exist.count += 1;
            await axios.put(`http://localhost:3003/carts/${exist.id}`, exist).then(r => {
                toast.success('Add Cart Success', {
                    autoClose: 2000
                })
            })
        } else {
            const user = global.auth.getUser() || {};
            const _product = {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                count: 1,
                userId: user.email
            }
            await axios.post('http://localhost:3003/carts', _product).then(r => {
                toast.success('Add Cart Success', {
                    autoClose: 2000
                })
            })
        }
        setAddCartHelp(!addCartHelp);
    }

    useEffect(() => {
        axios.get('http://localhost:3003/products')
            .then(res => {
                setProducts(res.data);
                setSourceProduct(res.data);
            })
    },[active])

    useEffect(() => {
        const user = global.auth.getUser() || {};
        axios.get(`http://localhost:3003/carts?userId=${user.email}`)
            .then(res => {
                setCartItem(res.data);
            })
    },[addCartHelp])

    const search = (text) => {
        console.log(text);
        let _products = [...sourceProduct];
        _products = _products.filter(p => {
            const matchArray = p.name.match(new RegExp(text, 'gi'));
            return !!matchArray ;
        })

        setProducts(_products);
    }

    return(
        <div>
            <ToolBox search={search} cartItem={cartItem}/>
            <div className="products">
                <div className="columns is-multiline is-desktop">
                    <TransitionGroup component={null}>
                    {
                        products.map(product => {
                            return(
                                <CSSTransition classNames="product-fade" timeout={300} key={product.id}>
                                    <div className="column is-3" key={product.id}>
                                        <Product product={product}  panelSwitcher={panelSwitcher} addCart={addCart}/>
                                    </div>
                                </CSSTransition>
                            )
                        })
                    }
                    </TransitionGroup>
                </div>
                {renderManagerBtn()}
                <Panel active={active} isEdit={isEdit} panelData={panelData}  panelSwitcher={panelSwitcher} />
            </div>
        </div>
    )
}

export default withRouter(Products);