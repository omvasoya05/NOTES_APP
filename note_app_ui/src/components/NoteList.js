import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Card, CardContent, Typography,
  Dialog, DialogTitle, DialogContent,
  IconButton, Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import NoteForm from "./NotesForm"

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);   // clicked note
  const [formState, setFormState] = useState(null); // {mode:"add"|"edit", note?}

  // load all notes
  useEffect(() => {
    axios.get("http://localhost:8080/note/showAllNotes")
      .then(res => setNotes(res.data))
      .catch(console.error);
  }, []);

  const refresh = () => {
    axios.get("http://localhost:8080/note/showAllNotes")
      .then(res => setNotes(res.data))
      .catch(console.error);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete note?")) {
      await axios.delete(`http://localhost:8080/note/deleteNote/${id}`);
      setNotes(notes.filter(n => n.id !== id));
      setSelected(null);
    }
  };

  return (
    <Box sx={{ p: 2, display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
      {notes.map(note => (
        <Card key={note.id} sx={{ cursor: "pointer" }} onClick={() => setSelected(note)}>
          <CardContent>
            <Typography variant="h6" noWrap>{note.title}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>{note.text}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Note View Dialog */}
      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        {selected && (
          <>
            <DialogTitle>
              {selected.title}
              <IconButton
                onClick={() => { setFormState({ mode: "edit", note: selected }); setSelected(null); }}
                sx={{ float: "right" }}
              >
                <EditIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ maxHeight: 400 }}>
              <Typography>{selected.text}</Typography>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <button onClick={() => handleDelete(selected.id)}>Delete</button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={() => setFormState({ mode: "add" })}
      >
        <AddIcon />
      </Fab>

      {/* Add / Edit Dialog */}
      {formState && (
        <NoteForm
          open
          mode={formState.mode}
          note={formState.note}
          onClose={(refreshNeeded) => {
            setFormState(null);
            if (refreshNeeded) refresh();
          }}
        />
      )}
    </Box>
  );
}