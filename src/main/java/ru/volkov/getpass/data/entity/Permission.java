package ru.volkov.getpass.data.entity;

public enum Permission {
    CREATE_OWNER("create:owner"),
    CREATE_COMPANY("create:company"),
    CREATE_GUARD("create:guard"),
    CREATE_EMPLOYEE("create:employee"),
    CREATE_PASS("create:pass"),

    UPDATE_OWNER("update:owner"),
    UPDATE_COMPANY("update:company"),
    UPDATE_GUARD("update:guard"),
    UPDATE_EMPLOYEE("update:employee"),
    UPDATE_PASS("update:pass"),

    GET_ALL_USERS("getAll:users"),
    GET_ALL_CHILD_USERS("getAllChild:users"),
    GET_ALL_PASSES("getAll:passes"),
    GET_ALL_CHILD_PASSES("getAllChild:passes");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
