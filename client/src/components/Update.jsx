import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Update = (props) => {

    let history = useHistory()
    // grab the var from the url
    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                console.log(res.data);
                setTitle(res.data.title)
                setContent(res.data.content);
                setIsImportant(res.data.isImportant);
            })
            .catch()
    }, [])

    const updateForm = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/notes/" + id, {
            title,
            content,
            isImportant
        })
            .then(res => {
                console.log(res.data);
                history.push("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h3>UPDATE note</h3>
            
            <form onSubmit={updateForm}>
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

export default Update
