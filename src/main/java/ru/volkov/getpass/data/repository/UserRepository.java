package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volkov.getpass.data.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
