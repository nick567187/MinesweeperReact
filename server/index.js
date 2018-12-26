const express = require('express');
const app = express();
const parser = require('body-parser');
const morgan = require('morgan');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', express.static('./public'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

