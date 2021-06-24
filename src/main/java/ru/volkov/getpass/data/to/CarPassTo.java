package ru.volkov.getpass.data.to;

import lombok.*;
import ru.volkov.getpass.data.AbstractEntity;

import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CarPassTo extends AbstractEntity {

    private boolean passed;

    @NotNull
    private String regNum;

    @Nullable
    private String creatorName;

    @Nullable
    private String companyName;

    @NotNull
    private LocalDate arrivalDate;

    @Nullable
    private LocalDateTime regDateTime;

    @Nullable
    private LocalDateTime passedDataTime;
}
