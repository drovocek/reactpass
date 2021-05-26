package ru.volkov.getpass.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.Formula;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
public class User extends AbstractEntity implements Serializable {

//    private Boolean enabled = true;
//
//    private Role role;

    private String fullName;

//    private String phone;

//    private String email = "default@email.ru";
//
//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = root_id)")
//    private String rootName;
//
//    @Formula("(SELECT COUNT(*) FROM User u WHERE u.root_id = id)")
//    private int childrenCount;
//
//    @Formula("(SELECT COUNT(*) FROM Car_Pass cp WHERE cp.user_id = id)")
//    private int passCount;
//
//    private LocalDateTime lastActivity = LocalDateTime.now();
//
//    private LocalDate regDate = LocalDate.now();
//
//    private String userName;
//
//    private Integer rootId;
//
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

