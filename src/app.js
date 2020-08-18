const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  if (repositories.length > 0) {
    return response.json(repositories);
  }
  
  return response.json({message: "No repositories found."});
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const id = request.params.id;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({message: "No repository found."});
  } else {
    repositories[repositoryIndex] = {
      ...repositories[repositoryIndex],
      title,
      url,
      techs,
    }
  };
    
  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({message: "No repository found."});
  } else {
    repositories.splice(repositoryIndex, 1);
  };

  return response.status(204).send("");
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({message: "No repository found."});
  } else {
    repositories[repositoryIndex].likes++;
  };

  return response.send(repositories[repositoryIndex]);
});

module.exports = app;
