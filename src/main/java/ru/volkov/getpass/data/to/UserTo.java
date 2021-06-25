package ru.volkov.getpass.data.to;

import lombok.*;
import ru.volkov.getpass.data.AbstractEntity;
import ru.volkov.getpass.data.entity.Role;

import javax.annotation.Nullable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserTo extends AbstractEntity {

    @NotNull
    private Role role;

    @NotNull
    private String fullName;

    @Nullable
    private String userName;

    @Email
    @NotNull
    private String email;

    @NotNull
    private String phone;

    private boolean enabled;

    @Nullable
    private LocalDateTime regDateTime;

    @Nullable
    private LocalDateTime lastActivity;

    @Nullable
    private String creatorName;

    @Nullable
    private String companyName;
}
