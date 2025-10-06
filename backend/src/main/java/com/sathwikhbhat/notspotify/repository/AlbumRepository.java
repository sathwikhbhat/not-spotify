package com.sathwikhbhat.notspotify.repository;

import com.sathwikhbhat.notspotify.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album, String> {
}