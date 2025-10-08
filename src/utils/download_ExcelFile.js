import ExcelJS from "exceljs";

export const downloadAsExcel = async (data, filename = "data") => {
  if (!data || !data.length) {
    console.error("No data provided for Excel export.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  const headers = Object.keys(data[0]);
  worksheet.columns = headers.map((headerKey) => {
    const column = { header: headerKey, key: headerKey };
    
    // Add date validation for Manufacturing_Date and Expiry_Date columns
    if (headerKey === 'Manufacturing_Date' || headerKey === 'Expiry_Date') {
      column.style = { numFmt: 'dd-mm-yyyy' };
    }
    // Add number format for Price and Quantity columns
    if (headerKey === 'Price') {
      column.style = { numFmt: '#,##0.00' };
    }
    if (headerKey === 'Quantity') {
      column.style = { numFmt: '#,##0' };
    }
    return column;
  });

  data.forEach((row) => worksheet.addRow(row));

  // Add data validation for numeric and date columns
  const quantityCol = headers.indexOf('Quantity') + 1;
  const priceCol = headers.indexOf('Price') + 1;

  // Add validation for Quantity (positive whole numbers)
  if (quantityCol > 0) {
    worksheet.dataValidations.add(`${String.fromCharCode(64 + quantityCol)}2:${String.fromCharCode(64 + quantityCol)}${data.length + 1}`, {
      type: 'whole',
      operator: 'greaterThan',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Invalid Quantity',
      error: 'Please enter a whole number greater than 0',
      formulae: [0]
    });
  }

  // Add validation for Price (positive numbers with decimals)
  if (priceCol > 0) {
    worksheet.dataValidations.add(`${String.fromCharCode(64 + priceCol)}2:${String.fromCharCode(64 + priceCol)}${data.length + 1}`, {
      type: 'decimal',
      operator: 'greaterThan',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Invalid Price',
      error: 'Please enter a number greater than 0',
      formulae: [0]
    });
  }

  // Add data validation for date columns
  const manufacturingDateCol = headers.indexOf('Manufacturing_Date') + 1;
  const expiryDateCol = headers.indexOf('Expiry_Date') + 1;

  if (manufacturingDateCol > 0) {
    worksheet.dataValidations.add(`${String.fromCharCode(64 + manufacturingDateCol)}2:${String.fromCharCode(64 + manufacturingDateCol)}${data.length + 1}`, {
      type: 'date',
      operator: 'between',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Invalid Date',
      error: 'Please enter date in dd-mm-yyyy format',
      formulae: ['1900-01-01', '2999-12-31']
    });
  }

  if (expiryDateCol > 0) {
    worksheet.dataValidations.add(`${String.fromCharCode(64 + expiryDateCol)}2:${String.fromCharCode(64 + expiryDateCol)}${data.length + 1}`, {
      type: 'date',
      operator: 'between',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Invalid Date',
      error: 'Please enter date in dd-mm-yyyy format',
      formulae: ['1900-01-01', '2999-12-31']
    });
  }

  // Auto-fit-like width based on header and cell content
  worksheet.columns.forEach((column) => {
    const headerLength = String(column.header ?? "").length;
    let maxCellLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value;
      const text = value === null || value === undefined ? "" : String(value);
      if (text.length > maxCellLength) maxCellLength = text.length;
    });
    column.width = Math.max(headerLength, maxCellLength) + 2;
  });

  // Lock prefilled cells; unlock only cells that are null/empty
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber === 1) {
      // Lock header row completely
      row.eachCell((cell) => {
        cell.protection = { locked: true };
      });
    } else {
      row.eachCell({ includeEmpty: true }, (cell) => {
        const isNull = cell.value === null || cell.value === undefined || cell.value === "";
        // Lock cells that have values, unlock empty cells
        cell.protection = { locked: !isNull };
        
        // If the cell is not empty, add a fill color to indicate it's locked
        if (!isNull) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEBEBEB' }  // Light gray background for locked cells
          };
        }
      });
    }
  });

  await worksheet.protect("espaze", {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    deleteColumns: false,
    deleteRows: false,
    sort: false,
    autoFilter: false,
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
