import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './index.css';
import DownloadIcon from '@mui/icons-material/Download';
import { handleDownload } from '../../utils/utils';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileUploader from '../fileUpload';
const TradeTable = ({ columns, initialRows, allowAdd = true, allowDelete = true,allowSave=true,saveCallback=()=>{},filePath,showDownloads,disableActions }) => {
  const [rows, setRows] = useState(initialRows.length > 0 ? initialRows : [{}]);

  const handleChange = (rowIndex, field, value) => {
    const updated = [...rows];
    updated[rowIndex][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.field] = '';
      return acc;
    }, {});
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  return (
    <div className="trade-table-container">
      {showDownloads&&<div className='display-flex' >
         <span className='mb-10  display-flex fs-md '><a className='flex-center' onClick={()=>handleDownload(filePath)}><DownloadIcon style={{fontSize:'13px'}}/>{'Download Template'}</a></span>
         <span className="mb-10 ml-auto display-flex fs-md">
          <FileUploader onDataParsed={setRows} />
        </span>
        </div>}
      <table className="trade-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
            {allowDelete && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.field}>
                  <input
                    type={col.type || 'text'}
                    value={row[col.field]}
                    onChange={(e) =>
                      handleChange(rowIndex, col.field, col.type==='number'?parseInt(e.target.value):e.target.value)
                    }
                  />
                </td>
              ))}
              {allowDelete && (
                <td>
                  <DeleteOutlineIcon
                    onClick={() => deleteRow(rowIndex)}
                    className="delete-btn"
                    style={{
                      color: rows.length === 1 ? '#ccc' : 'red',
                      cursor: rows.length === 1 ? 'not-allowed' : 'pointer',
                    }}
                    disabled={rows.length === 1}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    <div className='action-buttons'>
    {allowAdd && (
        <button disabled={disableActions} onClick={addRow} className="add-row-btn">
          + Add Row
        </button>
      )}
      {allowSave&&(<button disabled={disableActions} onClick={()=>saveCallback(rows)} className="add-row-btn generate-report">
          Generate Report
        </button>)}
    </div>
      
    </div>
  );
};

export default TradeTable;
