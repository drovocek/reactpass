package ru.volkov.getpass.data.to.util;

import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.to.CarPassTo;

import java.util.Optional;

public class CarPassToUtil {

    public static CarPass asEntity(CarPassTo to) {
        CarPass entity = new CarPass();
        entity.setId(to.getId());
        entity.setPassed(to.isPassed());
        entity.setRegNum(to.getRegNum());
        entity.setArrivalDate(to.getArrivalDate());
        entity.setPassedDataTime(to.getPassedDataTime());
        entity.setRegDataTime(to.getRegDataTime());
        return entity;
    }

    public static CarPassTo asTo(CarPass entity) {
        CarPassTo to = new CarPassTo();
        to.setId(entity.getId());
        to.setPassed(entity.isPassed());
        to.setRegNum(entity.getRegNum());
        to.setArrivalDate(entity.getArrivalDate());
        to.setPassedDataTime(entity.getPassedDataTime());
        to.setRegDataTime(entity.getRegDataTime());
        to.setCreatorName(Optional.ofNullable(entity.getCreator()).map(User::getFullName).orElse(null));
        to.setCompanyName(Optional.ofNullable(entity.getCompany()).map(User::getFullName).orElse(null));
        return to;
    }
}
