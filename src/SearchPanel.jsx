import React from 'react';
import { Input } from 'antd';

const SearchPanel = ({ searchQuery, onSearchChange }) => {
    const handleSearchChange = event => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="search-panel">
            <Input
                placeholder="Search for books..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: 200 }}
            />
        </div>
    );
};

export default SearchPanel;
