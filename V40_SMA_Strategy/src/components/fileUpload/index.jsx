import React from 'react';
import Papa from 'papaparse';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './index.css'; // Optional for styles

const FileUploader = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data.map((row) => ({
          ticker: row['Stock'] || '',
          buyPrice: parseFloat(row['Buy Price']) || '',
          targetPrice: parseFloat(row['Target Price']) || '',
          reportDate: row['Report Date'] || '',
        }));
        onDataParsed(parsedRows);
      },
    });
  };

  return (
    <span className="upload-wrapper">
      <label htmlFor="file-upload" className="flex-center upload-label link">
        <FileUploadIcon style={{ fontSize: '13px' }} /> Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv,text/csv,application/vnd.ms-excel"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </span>
  );
};

export default FileUploader;
