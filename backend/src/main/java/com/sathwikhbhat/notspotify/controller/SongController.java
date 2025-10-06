package com.sathwikhbhat.notspotify.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sathwikhbhat.notspotify.dto.SongRequest;
import com.sathwikhbhat.notspotify.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    @PostMapping
    public ResponseEntity<?> addSong(@RequestPart("request") String request,
                                     @RequestPart("image") MultipartFile imageFile,
                                     @RequestPart("audio") MultipartFile audioFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(request, SongRequest.class);
            songRequest.setAudioFile(audioFile);
            songRequest.setImageFile(imageFile);
            return new ResponseEntity<>(songService.addSong(songRequest), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> listSongs() {
        try {
            return new ResponseEntity<>(songService.getAllSongs(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{songId}")
    public ResponseEntity<?> deleteSong(@PathVariable String songId) {
        try {
            return new ResponseEntity<>(songService.removeSong(songId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}