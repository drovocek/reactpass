package ru.volkov.getpass.data.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.UserRepository;
import ru.volkov.getpass.util.exception.NotFoundException;

import java.time.LocalDateTime;
import java.util.List;

import static ru.volkov.getpass.util.ValidationUtil.checkNotFoundWithId;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void update(User user) {
        log.info(user.toString());
        Assert.notNull(user, "User must not be null");

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
        log.info(user.toString());
        Assert.notNull(user, "User must not be null");

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

    @Transactional
    public void delete(int id) {
        log.info(String.valueOf(id));
        checkNotFoundWithId(repository.delete(id) != 0, id);
    }

    public List<User> getAll() {
        log.info("");
        return repository.findAll();
    }

    private Integer getAuthUserId() {
        log.info("");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authUser = repository
                .getUserByUsername(authentication.getName())
                .orElseThrow(() -> new NotFoundException("No authenticated user"));
        return authUser.getId();
    }
}
