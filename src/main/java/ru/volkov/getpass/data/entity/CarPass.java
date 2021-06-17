package ru.volkov.getpass.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.springframework.lang.Nullable;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CarPass extends AbstractEntity implements Serializable {

    private boolean passed;

    @NotNull
    private String regNum;

    private LocalDate arrivalDate;

    @NotNull
    private LocalDateTime regDataTime;

    private LocalDateTime passedDataTime;

    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    private User company;

//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = creator.id)")
//    private String creatorName;
//
//    @Formula("(SELECT u.full_name FROM User u WHERE u.id = company.id)")
//    private String companyName;

    public CarPass(@Nullable String regNum, LocalDate arrivalDate, LocalDateTime regDataTime) {
        this.regNum = regNum;
        this.arrivalDate = arrivalDate;
        this.regDataTime = regDataTime;
    }
//
//    public CarPass(Integer rootId, String regNum, LocalDate arrivalDate) {
//        this.rootId = rootId;
//        this.regNum = regNum;
//        this.arrivalDate = arrivalDate;
//    }


    @Override
    public String toString() {
        return "CarPass{" +
                "passed=" + passed +
                ", regNum='" + regNum + '\'' +
                ", arrivalDate=" + arrivalDate +
                ", regDataTime=" + regDataTime +
                ", passedDataTime=" + passedDataTime +
                ", creator=" + creator.getId() +
                ", company=" + company.getId() +
                '}';
    }
}
