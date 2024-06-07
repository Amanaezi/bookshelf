import React from 'react';
import { List, Button } from 'antd';

const CartItem = ({ item, onRemove }) => {
    return (
        <List.Item
            actions={[<Button onClick={() => onRemove(item.id)}>Remove</Button>]}
        >
            <List.Item.Meta
                title={item.name}
                description={`Author: ${item.author}, Price: ${item.price}`}
            />
        </List.Item>
    );
};

export default CartItem;
