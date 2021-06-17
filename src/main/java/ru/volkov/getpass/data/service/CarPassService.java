package ru.volkov.getpass.data.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.vaadin.artur.helpers.CrudService;
import ru.volkov.getpass.data.endpoint.CarPassEndpoint;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.repository.CarPassRepository;
import ru.volkov.getpass.data.to.CarPassTo;
import ru.volkov.getpass.data.to.util.CarPassToUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.CarPassToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.CarPassToUtil.asTo;

@RequiredArgsConstructor
@Service
public class CarPassService extends CrudService<CarPass, Integer> {

    private final CarPassRepository repository;

    @Override
    protected JpaRepository<CarPass, Integer> getRepository() {
        return repository;
    }

    public CarPassData getCarPassData() {
        CarPassData carPassData = new CarPassData();
        carPassData.carPasses =
                repository.findAll().stream()
                        .map(CarPassToUtil::asTo)
                        .collect(Collectors.toList());
        return carPassData;
    }

    @Transactional
    public CarPassTo saveCarPass(CarPassTo carPassTo) {
        CarPass carPass = asEntity(carPassTo);
        if (carPassTo.isNew()) {

        } else {
            CarPass proxy = repository.getOne(carPassTo.getId());
            carPass.setCreator(proxy.getCreator());
            carPass.setCompany(proxy.getCompany());
        }

        return asTo(repository.save(carPass));
    }

    public void deleteCarPass(Integer carPassId) {
        repository.deleteById(carPassId);
    }

    @Transactional
    public Integer changeEnable(Integer carPassId) {
        Optional<CarPass> byId = repository.findById(carPassId);
        if (byId.isEmpty()) {
            return null;
        } else {
            CarPass carPass = byId.get();
            carPass.setPassed(!carPass.isPassed());
            return carPass.getId();
        }
    }

    @Getter
    public static class CarPassData {
        private List<CarPassTo> carPasses;
    }
}
