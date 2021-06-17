package ru.volkov.getpass.data.to;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.domain.Persistable;

import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@Data
public class CarPassTo implements Persistable<Integer> {

    private Integer id;

    private boolean passed;

    @NotNull
    private String regNum;

    @NotNull
    private String creatorName;

    @NotNull
    private String companyName;

    @NotNull
    private LocalDate arrivalDate;

    @NotNull
    private LocalDateTime regDataTime;

    @Nullable
    private LocalDateTime passedDataTime;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
