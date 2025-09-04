package com.example.Notes.Service;

import com.example.Notes.Model.Note;
import com.example.Notes.Repository.NoteRepository;
import com.example.Notes.Response.NoteResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    NoteRepository noteRepository;
    public boolean addNote(Note note) {
        try {
            noteRepository.save(note);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public List<Note> showNotes() {

        List<Note> notes = noteRepository.findAll();

        return notes;
    }

    public NoteResponse updateNoteById(Long id, Note updatedNote) {

        NoteResponse response = new NoteResponse();

        try{
            if (!noteRepository.existsById(id)) {
                response.setHasError(true);
                response.setMessage("This Note does not exist");
                return response;
            }

            Note note = noteRepository.getById(id);

            note.setTitle(updatedNote.getTitle());
            note.setText(updatedNote.getText());

            noteRepository.save(note);

        } catch (Exception e){
            response.setHasError(true);
            response.setMessage(e.getMessage());
            return response;
        }

        response.setHasError(false);
        response.setMessage("Note updated Successfully");

        return response;
    }

    public NoteResponse deleteNote(Long id) {

        NoteResponse response = new NoteResponse();

        try {
            if (!noteRepository.existsById(id)) {
                response.setHasError(true);
                response.setMessage("This Note does not exist");
                return response;
            }

            noteRepository.deleteById(id);

        } catch (Exception e) {
            response.setHasError(true);
            response.setMessage(e.getMessage());
            return response;
        }

        response.setHasError(false);
        response.setMessage("Note deleted Successfully");

        return response;
    }

    public Note showNote(Long id) {

        if (noteRepository.existsById(id)) {
            return noteRepository.findById(id).get();
        }

        return null;
    }
}
