package ru.volkov.getpass.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import ru.volkov.getpass.data.AbstractEntity;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends AbstractEntity implements GrantedAuthority {

    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public Role(Integer id) {
        super(id);
    }

    public Role(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return getName();
    }
}
