package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volkov.getpass.data.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
