package ru.volkov.getpass.data.to;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CarPassTo {

    private Integer id;

    private boolean passed;

    @NotNull
    private String regNum;

    private String creatorName;

    private String companyName;

    private LocalDate arrivalDate;

    @NotNull
    private LocalDateTime regDataTime;

    private LocalDateTime passedDataTime;
}
