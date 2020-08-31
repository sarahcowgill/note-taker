// Load Data
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dbNotes = require('../db/db.json');

// Routing
module.exports = function (app) {

    // Get
    app.get('/api/notes', function (req, res) {
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // Post
    app.post('/api/notes', function (req, res) {

        let notes = req.body;
        notes.id = uuidv4();

        let notesArr = [];

        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            notesArr = JSON.parse(data);
            notesArr.push(notes);

            fs.writeFile('./db/db.json', JSON.stringify(notesArr), function (err) {
                if (err) {
                    console.log(err);
                }
                return res.json(notesArr);
            });
        });

    });

    // Delete
    app.delete('/api/notes/:id', function (req, res) {
        let noteId = req.params.id;
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            const notesArr = JSON.parse(data);

            console.log(notesArr)

            const newNotesArr = notesArr.filter(item => item.id !== noteId);

            console.log("-------------")

            console.log(newNotesArr)

            fs.writeFile('./db/db.json', JSON.stringify(newNotesArr), function (err) {
                if (err) {
                    console.log(err)
                }
                return res.json(dbNotes);
            })

        });
    });

}