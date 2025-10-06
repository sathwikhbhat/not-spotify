package com.sathwikhbhat.notspotify.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sathwikhbhat.notspotify.document.Song;
import com.sathwikhbhat.notspotify.dto.SongListResponse;
import com.sathwikhbhat.notspotify.dto.SongRequest;
import com.sathwikhbhat.notspotify.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final Cloudinary cloudinary;


    public Song addSong(SongRequest request) throws IOException {
        Map<String, Object> audioUploadResult = cloudinary.uploader()
                .upload(request.getAudioFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "video"));
        Map<String, Object> imageUploadResult = cloudinary.uploader()
                .upload(request.getImageFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "image"));

        Song newSong = Song.builder()
                .name(request.getName())
                .description(request.getDescription())
                .album(request.getAlbum())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .fileUrl(audioUploadResult.get("secure_url").toString())
                .duration(formatDuration((Double) audioUploadResult.get("duration")))
                .build();

        return songRepository.save(newSong);
    }

    private String formatDuration(Double durationInSeconds) {
        int minutes = (int) (durationInSeconds / 60);
        int seconds = (int) (durationInSeconds % 60);
        return String.format("%d:%02d", minutes, seconds);
    }

    public SongListResponse getAllSongs() {
        return new SongListResponse(true, songRepository.findAll());
    }

    public Boolean removeSong(String id) {
        if (!songRepository.existsById(id)) {
            throw new IllegalArgumentException("Song with id " + id + " does not exist");
        }
        songRepository.deleteById(id);
        return true;
    }

}