import { FixedSizeList as List } from 'react-window';
import React from 'react';
import './index.css'
const Row = ({ index, style, data }) => {
  const { rows, columnConfigs } = data;
  const token = rows[index];

  return (
    <div style={style} className="row-container flex p-2 border-b border-gray-200">
      {columnConfigs?.map((config, idx) => (
        <div className="w-1-3 cell" key={`row-${idx}`}>
          {config.cellRenderer ? config.cellRenderer(token) : token[config.accessor]}
        </div>
      ))}
    </div>
  );
};

const Table = ({ rows=[], columnConfigs }) => {
  const rowHeight = 40;
const maxHeight = 450;
const dynamicHeight = Math.min(rows.length * rowHeight, maxHeight);
  return (
    <div className=" overflow-hidden h-500px">
      <div className="header-container">
        {columnConfigs.map((config, idx) => {
          return (
            <div className="w-1-3 cell" key={`header-${idx}`}>
              {config.label}
            </div>
          );
        })}
      </div>
      <List
        height={dynamicHeight}
        itemCount={rows.length}
        itemSize={40}
        itemData={{ rows, columnConfigs }}
        width="100%"
        className='list-container'
      >
        {Row}
      </List>
    </div>
  );
};

export default Table;
