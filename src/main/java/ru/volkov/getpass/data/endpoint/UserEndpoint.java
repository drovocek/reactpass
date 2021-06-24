package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.volkov.getpass.data.entity.Role;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.RoleRepository;
import ru.volkov.getpass.data.repository.UserRepository;
import ru.volkov.getpass.data.to.UserTo;
import ru.volkov.getpass.data.to.util.UserToUtil;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static ru.volkov.getpass.data.to.util.UserToUtil.asEntity;
import static ru.volkov.getpass.data.to.util.UserToUtil.asTo;
import static ru.volkov.getpass.security.util.SecurityInformer.getAuthUserId;

@Slf4j
@RequiredArgsConstructor
@Endpoint
public class UserEndpoint {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserData getUsersData() {
        UserData userData = new UserData();
        userData.users = userRepository.findAll().stream().map(UserToUtil::asTo).collect(Collectors.toList());
        userData.roles = roleRepository.findAll();
        return userData;
    }

    public UserTo saveUser(UserTo userTo) {
        log.info(userTo.toString());
        User user = asEntity(userTo);
        User creatorProxy;
        User companyProxy;
        if (userTo.isNew()) {
            creatorProxy = userRepository.getOne(getAuthUserId());
            companyProxy = creatorProxy.getCompany();
            if (companyProxy == null) {
                companyProxy = creatorProxy;
            }
            user.setRegDateTime(LocalDateTime.now());
        } else {
            User userProxy = userRepository.getOne(userTo.getId());
            creatorProxy = userProxy.getCreator();
            companyProxy = userProxy.getCompany();
        }
        user.setCreator(creatorProxy);
        user.setCompany(companyProxy);

        User saved = userRepository.save(user);
        return asTo(saved);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    @Getter
    public static class UserData {
        private List<UserTo> users;
        private List<Role> roles;
    }
}