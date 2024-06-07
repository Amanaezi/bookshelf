import React, { useState } from 'react';
import SortPanel from './SortPanel';
import SearchPanel from './SearchPanel';
import Cart from './Cart';

const ParentComponent = () => {
    const [sortBy, setSortBy] = useState('title');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div>
            <SortPanel sortBy={sortBy} onSortChange={handleSortChange} />
            <SearchPanel searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <Cart items={cartItems} onRemoveItem={handleRemoveItem} />
        </div>
    );
};

export default ParentComponent;
