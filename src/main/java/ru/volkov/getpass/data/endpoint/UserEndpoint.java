package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.volkov.getpass.data.entity.Role;
import ru.volkov.getpass.data.repository.RoleRepository;
import ru.volkov.getpass.data.service.UserService;
import ru.volkov.getpass.data.to.UserTo;
import ru.volkov.getpass.data.to.util.UserToUtil;

import java.util.List;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.UserToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.UserToUtil.asTo;

@Slf4j
@RequiredArgsConstructor
@Endpoint
public class UserEndpoint {

    private final UserService service;
    private final RoleRepository roleRepository;

    public UserData getUsersData() {
        UserData userData = new UserData();
        userData.users = service.getAll().stream().map(UserToUtil::asTo).collect(Collectors.toList());
        userData.roles = roleRepository.findAll();
        return userData;
    }

    public UserTo createUser(UserTo to) {
        log.info(to.toString());
        return asTo(service.create(asEntity(to)));
    }

    public void updateUser(UserTo to) {
        log.info(to.toString());
        service.update(asEntity(to));
    }

    public void deleteUser(int id) {
        log.info(String.valueOf(id));
        service.delete(id);
    }

    @Getter
    public static class UserData {
        private List<UserTo> users;
        private List<Role> roles;
    }
}