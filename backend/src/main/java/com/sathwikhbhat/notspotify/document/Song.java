package com.sathwikhbhat.notspotify.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "songs")
public class Song {

    @Id
    @JsonProperty("_id")
    private String id;

    private String name;
    private String description;
    private String album;
    private String imageUrl;
    private String fileUrl;
    private String duration;

}