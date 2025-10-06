package com.sathwikhbhat.notspotify.repository;

import com.sathwikhbhat.notspotify.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song, String> {
}