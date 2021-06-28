package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volkov.getpass.data.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> getUserByUsername(String username);
}
