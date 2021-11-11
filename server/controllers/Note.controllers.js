// FULL CRUD
const Note = require("../models/Note")

module.exports = {

    // READ ALL ---------------------------
    findAll: (req, res) => {
        Note.find()
            .then(allNotes => res.json(allNotes))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // READ ONE ---------------------------
    findOne: (req, res) => {
        console.log("find one executed");
        Note.findById(req.params.id)
            .then(note => res.json(note))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // CREATE -----------------------------
    create: (req, res) => {
        // const {title, content, isImportant} = req.body
        Note.create(req.body)
            .then(newNote => res.json(newNote))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // UPDATE -----------------------------
    update: (req, res) => {
        Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedNote => res.json(updatedNote))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // DELETE -----------------------------
    delete: (req, res) => {
        Note.findByIdAndDelete(req.params.id)
            .then( result => res.json({result: result}))
            .catch( err => res.status(400).json({err: err}))
    }
}