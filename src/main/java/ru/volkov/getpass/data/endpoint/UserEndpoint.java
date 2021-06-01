package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.volkov.getpass.data.entity.Role;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.RoleRepository;
import ru.volkov.getpass.data.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Endpoint
public class UserEndpoint {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserData getUsersData() {
        UserData userData = new UserData();
        userData.users = userRepository.findAll();
        userData.roles = roleRepository.findAll();
        return userData;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer contactId) {
        userRepository.deleteById(contactId);
    }

    @Getter
    public static class UserData {
        private List<User> users;
        private List<Role> roles;
    }
}