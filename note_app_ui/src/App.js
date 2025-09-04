import './App.css';
import { Route, Routes } from 'react-router-dom';
import  NoteList from './components/NoteList';
import NoteForm from './components/NotesForm';

function App() {
  return (
    <div>
      <h1>Notes App</h1>

      <Routes>
        <Route path='/' element={<NoteList />} />
        <Route path='/new' element={<NoteForm />} />
        <Route path='/edit/:id' element={<NoteForm />} />
      </Routes>
    </div>
  );
}

export default App;
