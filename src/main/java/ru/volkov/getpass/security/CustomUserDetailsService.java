package ru.volkov.getpass.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.UserRepository;

@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
     //   User user = userRepository.getUserByEmail(email);
        System.out.println("3333333333333333333333");
        User user = userRepository.getUserByUserName(name);
        if (user == null) {
            throw new UsernameNotFoundException("Could not find user with that email");
        }
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail()).password(user.getPassword()).authorities("USER").build();

//        return new CustomUserDetails(user);
        return userDetails;
    }
}
