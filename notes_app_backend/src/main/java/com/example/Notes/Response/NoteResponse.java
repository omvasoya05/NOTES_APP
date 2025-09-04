package com.example.Notes.Response;

import org.springframework.http.HttpStatus;

public class NoteResponse {

    boolean hasError;

    String message;

    public boolean isHasError() {
        return hasError;
    }

    public void setHasError(boolean hasError) {
        this.hasError = hasError;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
