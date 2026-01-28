// frontend/assets/js/utils/exportTools.js

/**
 * Export data to CSV file
 * @param {string} filename - Name of the CSV file
 * @param {Array} rows - Array of data objects
 * @param {Array} columns - Array of column definitions {key, label}
 */
export function exportToCSV(filename, rows, columns) {
  try {
    // Create CSV header
    const headers = columns.map(col => col.label).join(',');
    
    // Create CSV rows
    const csvRows = rows.map(row => {
      return columns.map(col => {
        const value = row[col.key] ?? '';
        // Escape quotes and wrap in quotes if contains comma or quotes
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',');
    });
    
    // Combine header and rows
    const csvContent = [headers, ...csvRows].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
    
    console.log(`✅ CSV exported: ${filename}`);
  } catch (error) {
    console.error('❌ Error exporting CSV:', error);
    alert('Failed to export CSV file');
  }
}

/**
 * Export HTML content to PDF
 * @param {string} title - Document title
 * @param {string} htmlContent - HTML content to convert to PDF
 */
export function exportToPDF(title, htmlContent) {
  try {
    // Create a styled HTML document
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      color: #333;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      color: #34495e;
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 1.3em;
    }
    .meta {
      color: #7f8c8d;
      font-size: 0.9em;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th {
      background-color: #3498db;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85em;
      letter-spacing: 0.5px;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #ecf0f1;
    }
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    tr:hover {
      background-color: #e8f4f8;
    }
    p {
      margin: 10px 0;
      line-height: 1.6;
    }
    @media print {
      body {
        margin: 0;
      }
      table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
    `;
    
    // Open print dialog
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export PDF');
      return;
    }
    
    printWindow.document.write(fullHtml);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Don't close immediately to allow user to save
        // printWindow.close();
      }, 250);
    };
    
    console.log(`✅ PDF export initiated: ${title}`);
  } catch (error) {
    console.error('❌ Error exporting PDF:', error);
    alert('Failed to export PDF file');
  }
}

/**
 * Helper function to download a blob
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Name of the file
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Helper function to escape HTML
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}