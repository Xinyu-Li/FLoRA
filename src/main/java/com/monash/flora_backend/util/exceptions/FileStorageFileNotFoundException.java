package com.monash.flora_backend.util.exceptions;

public class FileStorageFileNotFoundException extends FileStorageException {
    public FileStorageFileNotFoundException(String message) {
        super(message);
    }

    public FileStorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
