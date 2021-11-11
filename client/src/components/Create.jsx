import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Create = (props) => {

    let history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    const [errors, setErrors] = useState([]);
    const [dbErrors, setDBErrors] = useState([]);


    const createNote = (e) => {
        e.preventDefault();
        console.log("submitted form!", title, content, isImportant);

        const newNote = {
            title: title,
            content,
            isImportant
        }

        axios.post("http://localhost:8000/api/notes", newNote)
            .then(res => {
                console.log(res.data);
                console.log("success writing to the db!!");
                history.push("/")
            })
            .catch(err => {
                console.log("ERROR ❌ writing to the db!!");
                console.log("?????", err.response.data.error.errors);

                // handle Errors - another way
                const {errors} = err.response.data.error;
                const messages = Object.keys(errors).map( error => errors[error].message )
                console.log(messages);
                setDBErrors(messages);

                // handle Errors - the platform way
                // const errorResponse = err.response.data.error.errors; // Get the errors from err.response.data
                // const errorArr = []; // Define a temp error array to push the messages in
                // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message)
                // }
                // // Set Errors
                // setErrors(errorArr);
            })
    }

    return (
        <div>
            <h3>create a new note</h3>
            {JSON.stringify(title)}<br />
            {JSON.stringify(content)}<br />
            {JSON.stringify(isImportant)}<br />
            <p>
                {JSON.stringify(errors)}
            </p>

            {/* {
                errors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)
            } */}
            {
                dbErrors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)
            }

            <form onSubmit={createNote}>
                title:
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} /><br />
                content:
                <textarea onChange={(e) => setContent(e.target.value)} value={content} col="10" rows="4"></textarea><br />
                📌 Important ? <input type="checkbox" onChange={e => setIsImportant(e.target.checked)} checked={isImportant} />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Create
