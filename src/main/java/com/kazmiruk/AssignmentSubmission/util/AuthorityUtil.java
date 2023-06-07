package com.kazmiruk.AssignmentSubmission.util;

import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.AuthorityEnum;

public class AuthorityUtil {

    public static boolean hasRole(AuthorityEnum role, User user) {
        return user.getAuthorities().stream()
                .anyMatch(authority -> role.name().equals(authority.getAuthority()));
    }
}
