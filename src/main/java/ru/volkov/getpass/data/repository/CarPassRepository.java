package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volkov.getpass.data.entity.CarPass;

public interface CarPassRepository extends JpaRepository<CarPass, Integer> {

}
