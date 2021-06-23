package ru.volkov.getpass.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
public class User extends AbstractEntity {

    @NotNull
    @ManyToOne
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

    private boolean enabled;

    private String password;

    @NotNull
    private LocalDateTime regDate;

    @NotNull
    private LocalDateTime lastActivity = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    private User company;

//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = creator.id)")
//    private String creatorName;
//
//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = company.id)")
//    private String companyName;
//
//    @Formula("(SELECT COUNT(*) FROM User u WHERE u.creator.id = id)")
//    private int userCreatedCount;
//
//    @Formula("(SELECT COUNT(*) FROM Car_Pass cp WHERE cp.creator.id = id)")
//    private int passesCreatedCount;

    public User(String fullName, String userName, String email, String phone) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
    }

//    private Integer rootId;

//    private String passwordSalt;
//    private String passwordHash;
//    private String activationCode;
//
//    public User(Integer rootId, String userName, String fullName, String rootName, String email, String phone, Role role, String password) {
//        this.rootId = rootId;
//        this.userName = userName;
//        this.fullName = fullName;
//        this.rootName = rootName;
//        this.email = email;
//        this.phone = phone;
//        this.role = role;
//        this.passwordSalt = RandomStringUtils.random(32);
//        this.passwordHash = DigestUtils.sha1Hex(password.concat(passwordSalt));
//        this.activationCode = RandomStringUtils.randomAlphanumeric(32);
//    }
//
//    public boolean isValidPassword(String password) {
//        return DigestUtils.sha1Hex(password.concat(passwordSalt)).equals(passwordHash);
//    }

//    @Override
//    public String toString() {
//        return "User{" +
//                "id='" + getId() + '\'' +
//                ", userName='" + userName + '\'' +
//                ", fullName='" + fullName + '\'' +
//                ", rootId=" + rootId +
//                ", email='" + email + '\'' +
//                ", phone='" + phone + '\'' +
//                ", enabled=" + enabled +
//                ", passwordSalt='" + passwordSalt + '\'' +
//                ", passwordHash='" + passwordHash + '\'' +
//                ", regDate=" + regDate +
//                ", lastActivity=" + lastActivity +
//                ", role=" + role +
//                ", passCount=" + passCount +
//                ", childrenCount=" + childrenCount +
//                ", rootName='" + rootName + '\'' +
//                ", activationCode='" + activationCode + '\'' +
//                '}';
//    }
}

