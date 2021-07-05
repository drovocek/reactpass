package ru.volkov.getpass.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
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

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    @JoinTable(name = "role_authority",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private Set<Authority> authorities;

    public Role(Integer id) {
        super(id);
    }

    public Role(String name) {
        this.name = name;
    }
}
