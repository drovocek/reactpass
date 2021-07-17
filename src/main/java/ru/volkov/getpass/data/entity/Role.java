package ru.volkov.getpass.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

    private String name;

//    @JsonIgnore
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
//    private Set<User> users;

    public Role(Integer id) {
        super(id);
    }

    public Role(String name) {
        this.name = name;
    }
}
