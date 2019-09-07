const express = require('express');
const Gun = require('gun');

const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.use(Gun.serve);
const server = app.listen(9990);

Gun({
    file: 'db/data',
    web: server,
});