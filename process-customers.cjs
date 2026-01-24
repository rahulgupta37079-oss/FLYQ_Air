const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('/home/user/uploaded_files/Drone_Nov-Dec_Pluto_1.2_and_Pluto_X_Data-Genspark_AI_Sheets-20260124_1344.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Total rows:', data.length);
console.log('\nFirst 3 rows:');
console.log(JSON.stringify(data.slice(0, 3), null, 2));

console.log('\nColumn names:');
console.log(Object.keys(data[0]));

// Show all data for analysis
console.log('\n=== ALL DATA ===');
data.forEach((row, index) => {
  console.log(`\n--- Row ${index + 1} ---`);
  console.log(JSON.stringify(row, null, 2));
});
