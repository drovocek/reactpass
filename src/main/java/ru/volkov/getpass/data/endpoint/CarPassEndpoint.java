package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.repository.CarPassRepository;
import ru.volkov.getpass.data.to.CarPassTo;
import ru.volkov.getpass.data.to.util.CarPassToUtil;
import ru.volkov.getpass.security.CustomUserDetails;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.CarPassToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.CarPassToUtil.asTo;

@RequiredArgsConstructor
@Endpoint
public class CarPassEndpoint {

    private final CarPassRepository carPassRepository;

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
        System.out.println("!!!!!!!!!!!!");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentPrincipalName = authentication.getName();
//        VaadinRequest.getCurrent().getUserPrincipal();
//        Authentication auth =
//                SecurityContextHolder.getContext().getAuthentication();
//        CustomUserDetails myUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Integer userId=myUserDetails.getId();
//        System.out.println(userId);
//        System.out.println(authentication.getPrincipal().getClass());
//        System.out.println( ((CustomUserDetails) authentication.getPrincipal()).getId() );
        CarPass carPass = asEntity(carPassTo);
        if (carPassTo.isNew()) {

        } else {
            CarPass proxy = carPassRepository.getOne(carPassTo.getId());
            carPass.setCreator(proxy.getCreator());
            carPass.setCompany(proxy.getCompany());
        }
        CarPass save = carPassRepository.save(carPass);
        System.out.println(save);
        CarPassTo carPassTo1 = asTo(save);
        System.out.println(carPassTo1);
        return carPassTo1;
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