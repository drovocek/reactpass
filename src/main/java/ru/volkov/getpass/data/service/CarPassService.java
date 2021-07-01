package ru.volkov.getpass.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.CarPassRepository;
import ru.volkov.getpass.data.repository.UserRepository;
import ru.volkov.getpass.util.exception.NotFoundException;

import java.time.LocalDateTime;
import java.util.List;

import static ru.volkov.getpass.util.ValidationUtil.checkNotFoundWithId;

@Service
@RequiredArgsConstructor
public class CarPassService {

    private final CarPassRepository carPassRepository;
    private final UserRepository userRepository;

    @Transactional
    public void update(CarPass entity) {
        Assert.notNull(entity, "CarPass must not be null");
        CarPass carPassProxy = carPassRepository.getOne(entity.getId());
        User creatorProxy = carPassProxy.getCreator();
        User companyProxy = carPassProxy.getCompany();
        entity.setCreator(creatorProxy);
        entity.setCompany(companyProxy);
        carPassRepository.save(entity);
    }

    @Transactional
    public CarPass create(CarPass entity) {
        Assert.notNull(entity, "CarPass must not be null");
        User creatorProxy = userRepository.getOne(getAuthUserId());
        User companyProxy = creatorProxy.getCompany();
        if (companyProxy == null) {
            companyProxy = creatorProxy;
        }
        entity.setRegDateTime(LocalDateTime.now());
        entity.setCreator(creatorProxy);
        entity.setCompany(companyProxy);
        return carPassRepository.save(entity);
    }

    public void delete(int id) {
        checkNotFoundWithId(carPassRepository.delete(id) != 0, id);
    }

    @Transactional
    public CarPass changeTransitStatus(int id) {
        CarPass carPass = carPassRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("CarPass with id='%s' doesn't exist", id)));
        carPass.setPassed(!carPass.isPassed());
        carPass.setTransitDateTime(carPass.getTransitDateTime() == null ? LocalDateTime.now() : null);
        User responsibleForTransitProxy = userRepository.getOne(getAuthUserId());
        carPass.setResponsibleForTransit(responsibleForTransitProxy);
        return carPass;
    }

    public List<CarPass> getAll() {
        return carPassRepository.findAll();
    }

    private Integer getAuthUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authUser = userRepository
                .getUserByUsername(authentication.getName())
                .orElseThrow(() -> new NotFoundException("No authenticated user"));
        return authUser.getId();
    }
}
