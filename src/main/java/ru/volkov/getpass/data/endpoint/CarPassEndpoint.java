package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volkov.getpass.data.service.CarPassService;
import ru.volkov.getpass.data.to.CarPassTo;
import ru.volkov.getpass.data.to.util.CarPassToUtil;

import java.util.List;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.CarPassToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.CarPassToUtil.asTo;

@Slf4j
@RequiredArgsConstructor
@Endpoint
public class CarPassEndpoint {

    private final CarPassService service;

    public CarPassData getCarPassData() {
        CarPassData carPassData = new CarPassData();
        carPassData.carPasses =
                service.getAll().stream()
                        .map(CarPassToUtil::asTo)
                        .collect(Collectors.toList());
        return carPassData;
    }

    @Transactional
    public CarPassTo createCarPass(CarPassTo to) {
        log.info(to.toString());
        return asTo(service.create(asEntity(to)));
    }

    @Transactional
    public void updateCarPass(CarPassTo to) {
        log.info(to.toString());
        service.update(asEntity(to));
    }

    public void deleteCarPass(int id) {
        log.info(String.valueOf(id));
        service.delete(id);
    }

    @Transactional
    public void changeTransitStatus(int id) {
        log.info(String.valueOf(id));
        service.changeEnable(id);
    }

    @Getter
    public static class CarPassData {
        private List<CarPassTo> carPasses;
    }
}