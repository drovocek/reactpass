package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.CarPassRepository;
import ru.volkov.getpass.data.repository.UserRepository;
import ru.volkov.getpass.data.to.CarPassTo;
import ru.volkov.getpass.data.to.util.CarPassToUtil;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.CarPassToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.CarPassToUtil.asTo;
import static ru.volkov.getpass.security.util.SecurityInformer.getAuthUserId;

@Slf4j
@RequiredArgsConstructor
@Endpoint
public class CarPassEndpoint {

    private final CarPassRepository carPassRepository;
    private final UserRepository userRepository;

    public CarPassData getCarPassData() {
        CarPassData carPassData = new CarPassData();
        carPassData.carPasses =
                carPassRepository.findAll().stream()
                        .map(CarPassToUtil::asTo)
                        .collect(Collectors.toList());
        return carPassData;
    }

    @Transactional
    public CarPassTo saveCarPass(CarPassTo carPassTo) {
        log.info(carPassTo.toString());
        CarPass carPass = asEntity(carPassTo);
        User creatorProxy;
        User companyProxy;
        if (carPassTo.isNew()) {
            creatorProxy = userRepository.getOne(getAuthUserId());
            companyProxy = creatorProxy.getCompany();
            carPass.setRegDataTime(LocalDateTime.now());
        } else {
            CarPass carPassProxy = carPassRepository.getOne(carPassTo.getId());
            creatorProxy = carPassProxy.getCreator();
            companyProxy = carPassProxy.getCompany();
        }
        carPass.setCreator(creatorProxy);
        carPass.setCompany(companyProxy);

        CarPass saved = carPassRepository.save(carPass);
        return asTo(saved);
    }

    public void deleteCarPass(Integer carPassId) {
        carPassRepository.deleteById(carPassId);
    }

    @Transactional
    public Integer changeEnable(Integer carPassId) {
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
        private List<CarPassTo> carPasses;
    }
}