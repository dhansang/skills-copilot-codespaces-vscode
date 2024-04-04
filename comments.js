
//Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// Load comments from file
function loadComments() {
  try {
    return JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  } catch (e) {
    return [];
  }
}

// Save comments to file
function saveComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// Get all comments
app.get('/comments', function (req, res) {
  res.json(loadComments());
});

// Add a comment
app.post('/comments', function (req, res) {
  var comments = loadComments();
  comments.push(req.body);
  saveComments(comments);
  res.status(201).end();
});

// Start server
app.listen(3000, function () {
  console.log('Server listening on port 3000');
});

