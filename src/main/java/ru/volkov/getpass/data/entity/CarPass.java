package ru.volkov.getpass.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Formula;
import javax.annotation.Nullable;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
//@ToString(exclude = "user")
@Entity
public class CarPass extends AbstractEntity implements Serializable {

    private boolean passed;

    private String regNum;

    private LocalDate arrivalDate;

    private LocalDateTime regDataTime = LocalDateTime.now();

    @Nullable
    private LocalDateTime passedDataTime;

//    private Integer rootId;

//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = user_id)")
//    private String creatorName;
//
//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = root_id)")
//    private String rootName;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private User user;

//    private boolean enabled = true;
//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = root_id)")
//    private String fullName;

    public CarPass(String regNum, LocalDate arrivalDate) {
        this.regNum = regNum;
        this.arrivalDate = arrivalDate;
    }
//
//    public CarPass(Integer rootId, String regNum, LocalDate arrivalDate) {
//        this.rootId = rootId;
//        this.regNum = regNum;
//        this.arrivalDate = arrivalDate;
//    }
}
