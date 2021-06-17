package ru.volkov.getpass.data.to.util;

import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.to.CarPassTo;
import ru.volkov.getpass.data.to.UserTo;

public class UserToUtil {

    public static User asEntity(UserTo to) {
        User entity = new User();
        entity.setId(to.getId());
        entity.setRole(to.getRole());
        entity.setFullName(to.getFullName());
        entity.setUserName(to.getUserName());
        entity.setEmail(to.getEmail());
        entity.setEnabled(to.isEnabled());
        entity.setRegDate(to.getRegDate());
        entity.setLastActivity(to.getLastActivity());
        return entity;
    }

    public static UserTo asTo(User entity) {
        UserTo to = new UserTo();
        to.setId(entity.getId());
        to.setRole(entity.getRole());
        to.setFullName(entity.getFullName());
        to.setUserName(entity.getUserName());
        to.setEmail(entity.getEmail());
        to.setEnabled(entity.isEnabled());
        to.setRegDate(entity.getRegDate());
        to.setLastActivity(entity.getLastActivity());
        return to;
    }
}