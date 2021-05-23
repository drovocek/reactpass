package ru.volkov.getpass.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Status extends AbstractEntity {

    private String name;

    public Status(String name) {
        this.name = name;
    }
}
