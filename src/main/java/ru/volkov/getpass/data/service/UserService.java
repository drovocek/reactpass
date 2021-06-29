package ru.volkov.getpass.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import ru.volkov.getpass.data.entity.CarPass;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.UserRepository;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static ru.volkov.getpass.util.ValidationUtil.checkNotFoundWithId;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final Principal principal;
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void update(User user) {
        Assert.notNull(user, "user must not be null");
        User userProxy = repository.getOne(user.getId());
        User creatorProxy = userProxy.getCreator();
        User companyProxy = userProxy.getCompany();
        user.setCreator(creatorProxy);
        user.setCompany(companyProxy);
        user.setLastActivity(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
    }

    @Transactional
    public User create(User user) {
        Assert.notNull(user, "user must not be null");
        User creatorProxy = repository.getOne(getAuthUserId());
        User companyProxy = creatorProxy.getCompany();
        if (companyProxy == null) {
            companyProxy = creatorProxy;
        }
        user.setRegDateTime(LocalDateTime.now());
        user.setCreator(creatorProxy);
        user.setCompany(companyProxy);
        user.setLastActivity(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    public void delete(int id) {
        checkNotFoundWithId(repository.delete(id) != 0, id);
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    private Integer getAuthUserId() {
        User authUser = repository
                .getUserByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("No authenticated user"));
        return authUser.getId();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Assert.notNull(username, "username must not be null");
        return repository.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("Couldn't find user with username: '%s'", username)));
    }
}
