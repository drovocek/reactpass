package ru.volkov.getpass.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Collection;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends AbstractEntity implements UserDetails {

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

    @NotNull
    private String fullName;

    @NotNull
    private String username;

    @Email
    @NotNull
    private String email;

    @NotNull
    private String phone;

    private boolean enabled;

    private String password;

    @NotNull
    private LocalDateTime regDateTime;

    @NotNull
    private LocalDateTime lastActivity = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    private User company;

//    @Formula("(SELECT COUNT(*) FROM User u WHERE u.creator.id = id)")
//    private int userCreatedCount;
//
//    @Formula("(SELECT COUNT(*) FROM Car_Pass cp WHERE cp.creator.id = id)")
//    private int passesCreatedCount;

    public User(String fullName, String username, String email, String phone) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRole().getAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }
}

