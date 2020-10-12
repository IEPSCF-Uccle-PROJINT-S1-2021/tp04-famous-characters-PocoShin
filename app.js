const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use('/characters', express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/characters/form.html');
});

app.listen(4242, () => {
  console.log('Listening on http://127.0.0.1:4242');
});
