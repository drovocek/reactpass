package ru.volkov.getpass.data.entity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.entity.Permission.*;

public enum Role {
    ADMIN(Set.of(
            GET_ALL_USERS, GET_ALL_PASSES,
            CREATE_COMPANY, CREATE_GUARD, CREATE_EMPLOYEE, CREATE_OWNER, CREATE_PASS,
            UPDATE_COMPANY, UPDATE_GUARD, UPDATE_EMPLOYEE, UPDATE_OWNER, UPDATE_PASS)),
    OWNER(Set.of(
            GET_ALL_USERS, GET_ALL_PASSES,
            CREATE_COMPANY, CREATE_GUARD, CREATE_EMPLOYEE, CREATE_PASS,
            UPDATE_COMPANY, UPDATE_GUARD, UPDATE_EMPLOYEE, UPDATE_PASS)),
    COMPANY(Set.of(
            GET_ALL_CHILD_USERS, GET_ALL_CHILD_PASSES,
            CREATE_GUARD, CREATE_EMPLOYEE, CREATE_PASS,
            UPDATE_GUARD, UPDATE_EMPLOYEE, UPDATE_PASS)),
    EMPLOYEE(Set.of(
            GET_ALL_CHILD_PASSES,
            CREATE_PASS,
            UPDATE_EMPLOYEE, UPDATE_PASS)),
    GUARD(Set.of(
            GET_ALL_PASSES,
            CREATE_PASS,
            UPDATE_GUARD, UPDATE_PASS));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}
