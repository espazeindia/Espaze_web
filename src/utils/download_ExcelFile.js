import ExcelJS from "exceljs";

export const downloadAsExcel = async (data, filename = "data") => {
  if (!data || !data.length) {
    console.error("No data provided for Excel export.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  const headers = Object.keys(data[0]);
  worksheet.columns = headers.map((headerKey) => ({ header: headerKey, key: headerKey }));

  data.forEach((row) => worksheet.addRow(row));

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
    row.eachCell({ includeEmpty: true }, (cell) => {
      const isNull = cell.value === null || cell.value === undefined || cell.value === "";
      // Only lock cells that are NOT empty, so user can delete rows that are empty
      cell.protection = { locked: !isNull };
    });

    // 👇 OPTIONAL: if you want users to be able to delete *any* row, unlock entire row
    row.eachCell((cell) => {
      cell.protection = { locked: false };
    });
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
    deleteRows: true,
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
