package ru.volkov.getpass.data.to;

import lombok.Data;
import ru.volkov.getpass.data.entity.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class UserTo {

    private Integer id;

    @NotNull
    private Role role;

    @NotNull
    private String fullName;

    @NotNull
    private String userName;

    @Email
    @NotNull
    private String email;

    @NotNull
    private String phone;

    @NotNull
    private Boolean enabled;

    @NotNull
    private LocalDateTime regDate;

    @NotNull
    private LocalDateTime lastActivity;

    private String creatorName;

    private String companyName;
}
