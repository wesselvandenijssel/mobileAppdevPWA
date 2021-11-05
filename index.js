const express = require('express');
var app = require('express')()
const PORT = process.env.PORT || 3001;
 
app.use(express.static('public'));
 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

 
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));