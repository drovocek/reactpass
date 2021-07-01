package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volkov.getpass.data.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
}
