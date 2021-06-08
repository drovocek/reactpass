package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.repository.CarPassRepository;

import java.util.List;

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

    @Getter
    public static class CarPassData {
        private List<CarPass> carPasses;
    }
}