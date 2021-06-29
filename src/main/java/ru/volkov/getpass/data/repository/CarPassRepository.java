package ru.volkov.getpass.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ru.volkov.getpass.data.entity.CarPass;

public interface CarPassRepository extends JpaRepository<CarPass, Integer> {

    @Transactional
    @Modifying
    @Query("DELETE FROM CarPass cp WHERE cp.id=:id")
    int delete(@Param("id") int id);
}
