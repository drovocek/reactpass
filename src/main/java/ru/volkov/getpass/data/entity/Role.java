package ru.volkov.getpass.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
    private Set<User> users;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "roles")
    private Set<Authority> authorities;

    public Role(Integer id) {
        super(id);
    }

    public Role(String name) {
        this.name = name;
    }
}
