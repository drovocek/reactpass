package ru.volkov.getpass.data.repository;

import ru.volkov.getpass.data.entity.Status;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {

}
