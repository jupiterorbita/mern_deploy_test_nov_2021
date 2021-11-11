const Note = require("../controllers/Note.controllers");

module.exports = (app) => {
    app.get("/api/notes", Note.findAll);
    app.get("/api/notes/:id", Note.findOne);
    app.post("/api/notes", Note.create);
    app.put("/api/notes/:id", Note.update);
    app.delete("/api/notes/:id", Note.delete)
}