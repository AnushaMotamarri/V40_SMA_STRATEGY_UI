
const getCSVFilename = (prefix = "data") => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  
  return `${prefix}-${dd}/${mm}/${yyyy}-${hh}:${min}.csv`;
};
export const convertToCSV = (data, columnConfigs) => {
  if (!Array.isArray(data) || data.length === 0) return '';

  const headers = columnConfigs.map(col => `"${col.label}"`);
  console.log(headers)
  const rows = data.map(row =>
    columnConfigs.map(col => {
      const val = row[col.accessor];
      return val
    })
  );
  const res = [headers, ...rows].map(line => line.join(',')).join('\n');
  return res
};


function downloadJSONAsCSV(csvString, filename ='data.csv') {
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  }
  
  const handleDownload = (path) => {
    const link = document.createElement("a");
    link.href = path; // or .xlsx if that’s your file
    link.download = "sample-template.csv";
    link.click();
  };

  export {downloadJSONAsCSV,handleDownload,getCSVFilename}