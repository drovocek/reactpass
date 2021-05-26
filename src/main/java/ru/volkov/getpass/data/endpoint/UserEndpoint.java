package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.RequiredArgsConstructor;
import ru.volkov.getpass.data.entity.Company;
import ru.volkov.getpass.data.entity.Contact;
import ru.volkov.getpass.data.entity.Status;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.UserRepository;

import java.util.List;

@RequiredArgsConstructor
@Endpoint
public class UserEndpoint {

    private final UserRepository userRepository;

    public UserData getUsersData() {
        UserData userData = new UserData();
        userData.users = userRepository.findAll();
        userData.users.forEach(System.out::println);
        return userData;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer contactId) {
        userRepository.deleteById(contactId);
    }

    public static class UserData {
        public List<User> users;
    }
}