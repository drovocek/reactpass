package ru.volkov.getpass.data.repository;

import ru.volkov.getpass.data.entity.Company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

}
