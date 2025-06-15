
const getCSVFilename = (prefix = "data") => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  
  return `${prefix}-${dd}/${mm}/${yyyy}-${hh}:${min}.csv`;
};

function downloadJSONAsCSV(jsonData, filename ='data.csv') {
    if (!jsonData || !jsonData.length) {
      console.error('No data to convert');
      return;
    }
  
    const headers = Object.keys(jsonData[0]);
    const csvRows = [];
  
    // Add headers
    csvRows.push(headers.join(','));
  
    // Add rows
    for (const row of jsonData) {
      const values = headers.map(header => {
        let val = row[header];
        // Escape double quotes
        val = (val === null || val === undefined) ? '' : val.toString().replace(/"/g, '""');
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    }
  
    // Create blob and trigger download
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  const handleDownload = (path) => {
    const link = document.createElement("a");
    link.href = path; // or .xlsx if that’s your file
    link.download = "sample-template.csv";
    link.click();
  };

  export {downloadJSONAsCSV,handleDownload,getCSVFilename}