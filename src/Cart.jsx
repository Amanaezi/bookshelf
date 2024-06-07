import React from 'react';
import { List } from 'antd';
import CartItem from './CartItem';

const Cart = ({ items, onRemoveItem }) => {
    return (
        <div className="cart">
            <List
                itemLayout="horizontal"
                dataSource={items}
                renderItem={item => (
                    <CartItem item={item} onRemove={onRemoveItem} />
                )}
            />
        </div>
    );
};

export default Cart;
