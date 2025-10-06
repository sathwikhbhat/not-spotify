package com.sathwikhbhat.notspotify.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sathwikhbhat.notspotify.document.Album;
import com.sathwikhbhat.notspotify.dto.AlbumListResponse;
import com.sathwikhbhat.notspotify.dto.AlbumRequest;
import com.sathwikhbhat.notspotify.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;

    public Album addAlbum(AlbumRequest request) throws IOException {
        Map<String, Object> imageUploadResult = cloudinary.uploader()
                .upload(request.getImageFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "image"));

        Album newAlbum = Album.builder()
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .build();

        return albumRepository.save(newAlbum);
    }

    public AlbumListResponse getAllAlbums() {
        return new AlbumListResponse(true, albumRepository.findAll());
    }

    public Boolean removeAlbum(String albumId) {
        if (!albumRepository.existsById(albumId)) {
            throw new IllegalStateException("Album with id " + albumId + " does not exist");
        }
        albumRepository.deleteById(albumId);
        return true;
    }

}