package ru.volkov.getpass.data.to.util;

import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.to.UserTo;

import java.util.Optional;

public class UserToUtil {

    public static User asEntity(UserTo to) {
        User entity = new User();
        entity.setId(to.getId());
        entity.setRole(to.getRole());
        entity.setPhone(to.getPhone());
        entity.setFullName(to.getFullName());
        entity.setUsername(to.getUsername());
        entity.setEmail(to.getEmail());
        entity.setEnabled(to.isEnabled());
        entity.setRegDateTime(to.getRegDateTime());
        entity.setLastActivity(to.getLastActivity());
        return entity;
    }

    public static UserTo asTo(User entity) {
        UserTo to = new UserTo();
        to.setId(entity.getId());
        to.setRole(entity.getRole());
        to.setPhone(entity.getPhone());
        to.setFullName(entity.getFullName());
        to.setUsername(entity.getUsername());
        to.setEmail(entity.getEmail());
        to.setEnabled(entity.isEnabled());
        to.setRegDateTime(entity.getRegDateTime());
        to.setLastActivity(entity.getLastActivity());
        to.setCreatorName(Optional.ofNullable(entity.getCreator()).map(User::getFullName).orElse("-"));
        to.setCompanyName(Optional.ofNullable(entity.getCompany()).map(User::getFullName).orElse("-"));
        return to;
    }
}
