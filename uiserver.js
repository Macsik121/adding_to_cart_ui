require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.UI_SERVER_PORT || 5000;

app.use('/', express.static('public'));

app.listen(port, () => console.log(`Server has been started on port ${port}`));