// Install required packages: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { name, comment, nameColor } = req.body;
  const timestamp = new Date().getTime();

  const newComment = {
    name,
    comment,
    nameColor,
    timestamp,
  };

  comments.push(newComment);
  res.json(newComment);
});

app.delete('/comments/:timestamp', (req, res) => {
  const timestamp = parseInt(req.params.timestamp);
  comments = comments.filter(comment => comment.timestamp !== timestamp);
  res.sendStatus(204); // No content
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
