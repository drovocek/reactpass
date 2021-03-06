package ru.volkov.getpass.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CarPass extends AbstractEntity {

    private boolean passed;

    @NotNull
    private String regNum;

    private LocalDate arrivalDate;

    @NotNull
    private LocalDateTime regDateTime;

    private LocalDateTime transitDateTime;

    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    private User company;

    @ManyToOne(fetch = FetchType.EAGER)
    private User responsibleForTransit;

    public CarPass(String regNum, LocalDate arrivalDate, LocalDateTime regDateTime) {
        this.regNum = regNum;
        this.arrivalDate = arrivalDate;
        this.regDateTime = regDateTime;
    }

    @Override
    public String toString() {
        return "CarPass{" +
                "passed=" + passed +
                ", regNum='" + regNum + '\'' +
                ", arrivalDate=" + arrivalDate +
                ", regDataTime=" + regDateTime +
                ", transitDateTime=" + transitDateTime +
                ", creatorId=" + creator.getId() +
                ", companyId=" + company.getId() +
                ", responsibleForTransitId=" + responsibleForTransit.getId() +
                '}';
    }
}
