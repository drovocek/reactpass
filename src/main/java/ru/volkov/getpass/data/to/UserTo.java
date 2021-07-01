package ru.volkov.getpass.data.to;

import lombok.*;
import ru.volkov.getpass.data.AbstractEntity;
import ru.volkov.getpass.data.entity.Role;

import javax.annotation.Nullable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserTo extends AbstractEntity {

    @NotNull
    private Role role;

    @NotNull
    private Set<String> authorities;

    @NotNull
    private String fullName;

    @Nullable
    private String username;

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
