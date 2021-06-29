package ru.volkov.getpass.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.CarPassRepository;
import ru.volkov.getpass.data.repository.UserRepository;
import ru.volkov.getpass.util.exception.NotFoundException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import static ru.volkov.getpass.util.ValidationUtil.checkNotFoundWithId;

@Service
@RequiredArgsConstructor
public class CarPassService {

    private final Principal principal;
    private final CarPassRepository carPassRepository;
    private final UserRepository userRepository;

    @Transactional
    public void update(CarPass carPass) {
        Assert.notNull(carPass, "carPass must not be null");
        CarPass carPassProxy = carPassRepository.getOne(carPass.getId());
        User creatorProxy = carPassProxy.getCreator();
        User companyProxy = carPassProxy.getCompany();
        carPass.setCreator(creatorProxy);
        carPass.setCompany(companyProxy);
        carPassRepository.save(carPass);
    }

    @Transactional
    public CarPass create(CarPass carPass) {
        Assert.notNull(carPass, "carPass must not be null");
        User creatorProxy = userRepository.getOne(getAuthUserId());
        User companyProxy = creatorProxy.getCompany();
        if (companyProxy == null) {
            companyProxy = creatorProxy;
        }
        carPass.setRegDateTime(LocalDateTime.now());
        carPass.setCreator(creatorProxy);
        carPass.setCompany(companyProxy);
        return carPassRepository.save(carPass);
    }

    public void delete(int id) {
        checkNotFoundWithId(carPassRepository.delete(id) != 0, id);
    }

    @Transactional
    public void changeEnable(int id) {
        CarPass carPass = carPassRepository.findById(id).orElse(()->);
    }

    public List<CarPass> getAll() {
        return carPassRepository.findAll();
    }

    private Integer getAuthUserId() {
        User authUser = userRepository
                .getUserByUsername(principal.getName())
                .orElseThrow(() -> new NotFoundException("No authenticated user"));
        return authUser.getId();
    }
}
