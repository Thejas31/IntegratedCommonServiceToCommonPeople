const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

// Serve static files
app.use(express.static('public'));

// Contact Form Endpoint
app.post('/submit-form', upload.none(), (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form submission:', req.body);

    // Load existing Excel file or create a new one
    const filePath = 'ContactResponses.xlsx';
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
        workbook.SheetNames.push('Responses');
        workbook.Sheets['Responses'] = xlsx.utils.aoa_to_sheet([['Name', 'Email', 'Message']]);
    }

    // Append data to the worksheet
    const worksheet = workbook.Sheets['Responses'];
    const newRow = { name, email, message };
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    data.push([newRow.name, newRow.email, newRow.message]);
    workbook.Sheets['Responses'] = xlsx.utils.aoa_to_sheet(data);

    // Write the updated workbook to the file
    xlsx.writeFile(workbook, filePath);

    // Log the response
    console.log(`New response added: ${name}, ${email}, ${message}`);

    // Send a response to the client
    res.status(200).send('Form submitted successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
