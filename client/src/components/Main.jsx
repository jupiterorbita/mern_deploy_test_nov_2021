import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ourStyle from "./Main.module.css";
import { Link } from 'react-router-dom';

const Main = (props) => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotesFromDB();
    }, [])

    const getNotesFromDB = () => {
        axios.get("http://localhost:8000/api/notes")
            .then(res => {
                console.log(res.data);
                setNotes(res.data)
            })
            .catch(err => console.log(err))
    }

    const deleteNote = (deleteId) => {
        // console.log(deleteId);
        axios.delete("http://localhost:8000/api/notes/" + deleteId)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS DELETE ❌");

                setNotes(notes.filter((note) => note._id !== deleteId))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3>All the notes</h3>
            {/* {JSON.stringify(notes)} */}

            {
                notes.map((note, i) => {
                    return (
                        <div key={note._id} className={ourStyle.note}>
                            <h5>
                                {note.isImportant ? "📌" : ""}
                                <Link to={"/notes/" + note._id}> {note.title}</Link>
                            </h5>
                            <p>
                                {note.content}
                            </p>
                            {Date(note.createdAt)}<br />

                            <Link to={"/notes/update/" + note._id}>update ✍</Link>
                            <button onClick={() => deleteNote(note._id)}>Delete</button>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main
