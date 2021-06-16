package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        System.out.println(currentPrincipalName);
        System.out.println(((UserDetails)authentication.getPrincipal()).getUsername());


//        user.setCreator();
//        user.setCompany();
        return userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    @Getter
    public static class UserData {
        private List<User> users;
        private List<Role> roles;
    }
}