import './App.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import Create from './components/Create';
import Update from './components/Update';
import ViewOne from './components/ViewOne';

function App() {
  return (
    <div className="App">
      <h1>Notes 📝</h1>
      <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/notes/new">Create</Link>
      <hr />

      <Switch>

        {/* UPDATE */}
        <Route path="/notes/update/:id">
          <Update />
        </Route>

        {/* CREATE */}
        <Route path="/notes/new">
          <Create />
        </Route>

        {/* SHOW ONE */}
        <Route path="/notes/:id">
          <ViewOne />
        </Route>

        {/* ALL NOTES */}
        <Route path="/notes">
          <Main />
        </Route>

        <Route path="/">
          <Redirect to="/notes" />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
