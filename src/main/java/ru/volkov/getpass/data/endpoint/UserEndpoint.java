package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.volkov.getpass.data.entity.Role;
import ru.volkov.getpass.data.repository.RoleRepository;
import ru.volkov.getpass.data.to.UserTo;
import ru.volkov.getpass.data.to.util.UserToUtil;
import ru.volkov.getpass.data.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.UserToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.UserToUtil.asTo;

@Slf4j
@RequiredArgsConstructor
@Endpoint
public class UserEndpoint {

    private final UserService userService;
    private final RoleRepository roleRepository;

    public UserData getUsersData() {
        UserData userData = new UserData();
        userData.users = userService.getAll().stream().map(UserToUtil::asTo).collect(Collectors.toList());
        userData.roles = roleRepository.findAll();
        return userData;
    }

    public UserTo saveUser(UserTo to) {
        return asTo(asEntity(to));
    }

    public void updateUser(UserTo to) {
        userService.update(asEntity(to));
    }

    public void deleteUser(int id) {
        userService.delete(id);
    }

    @Getter
    public static class UserData {
        private List<UserTo> users;
        private List<Role> roles;
    }
}