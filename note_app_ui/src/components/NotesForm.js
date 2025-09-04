import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import axios from "axios";

export default function NoteForm({ open, mode, note, onClose }) {
  const [data, setData] = useState({ title: "", text: "" });

  useEffect(() => {
    if (mode === "edit" && note) {
      setData({ title: note.title, text: note.text });
    } else {
      setData({ title: "", text: "" });
    }
  }, [mode, note]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (mode === "edit") {
      await axios.put(`http://localhost:8080/note/updateNote/${note.id}`, data);
    } else {
      await axios.post("http://localhost:8080/note/addNote", data);
    }
    onClose(true); // refresh list
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "edit" ? "Edit Note" : "Add Note"}</DialogTitle>
      <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={data.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Text"
          name="text"
          value={data.text}
          onChange={handleChange}
          multiline
          rows={6}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "edit" ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}