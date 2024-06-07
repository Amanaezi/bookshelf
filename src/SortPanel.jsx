import React from 'react';
import { Switch } from 'antd';

const SortPanel = ({ sortBy, onSortChange }) => {
    const handleSortChange = checked => {
        onSortChange(checked);
    };

    return (
        <div className="sort-panel">
            <Switch checked={sortBy} onChange={handleSortChange} />
        </div>
    );
};

export default SortPanel;
