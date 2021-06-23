package ru.volkov.getpass.security.util;

import org.springframework.security.core.context.SecurityContextHolder;
import ru.volkov.getpass.security.CustomUserDetails;

public class SecurityInformer {

    public static Integer getAuthUserId() {
        CustomUserDetails myUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return myUserDetails.getId();
    }
}
