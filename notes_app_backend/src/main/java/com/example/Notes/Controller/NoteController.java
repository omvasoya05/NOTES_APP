package com.example.Notes.Controller;

import com.example.Notes.Model.Note;
import com.example.Notes.Response.NoteResponse;
import com.example.Notes.Service.NoteService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

//    Logger logger = (Logger) LoggerFactory.getLogger(NoteController.class);

    @Autowired
    NoteService noteService;
    @PostMapping("/addNote")
    NoteResponse addNote(@RequestBody Note note) {
        boolean isAdded = noteService.addNote(note);

        NoteResponse response = new NoteResponse();

        if (isAdded) {
            response.setHasError(false);
            response.setMessage("Notes Added Successfully");
        } else {
            response.setHasError(true);
            response.setMessage("Error in adding note");
        }

        return response;
    }

    @GetMapping("/showAllNotes")
    List<Note> showNotes(){

        return noteService.showNotes();
    }

    @GetMapping("showNote/{id}")
    Note showNote(@PathVariable Long id) {

        return noteService.showNote(id);
    }

    @PutMapping("/updateNote/{id}")
    NoteResponse updateNote(@PathVariable Long id, @RequestBody Note note) {

        return noteService.updateNoteById(id, note);
    }

    @DeleteMapping("/deleteNote/{id}")
    NoteResponse deleteNote(@PathVariable Long id) {

        return noteService.deleteNote(id);
    }
}
