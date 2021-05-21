package ru.volkov.getpass.data.repository;

import ru.volkov.getpass.data.entity.Contact;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
