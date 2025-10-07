package com.sathwikhbhat.notspotify.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String id;
    private String email;
    private String password;
    private Role role;

    public enum Role {
        USER,
        ADMIN
    }

}