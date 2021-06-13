package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.repository.CarPassRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Endpoint
public class CarPassEndpoint {

    private final CarPassRepository carPassRepository;

    public CarPassData getCarPassData() {
        CarPassData carPassData = new CarPassData();
        carPassData.carPasses = carPassRepository.findAll();
        return carPassData;
    }

    public CarPass saveCarPass(CarPass carPass) {
        return carPassRepository.save(carPass);
    }

    public void deleteCarPass(Integer carPassId) {
        carPassRepository.deleteById(carPassId);
    }

    @Transactional
    public Integer changeEnable(Integer carPassId) {
        System.out.println("changeEnable: " + carPassId);
        Optional<CarPass> byId = carPassRepository.findById(carPassId);
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
        private List<CarPass> carPasses;
    }
}