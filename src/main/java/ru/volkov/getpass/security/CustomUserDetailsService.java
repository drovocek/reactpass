package ru.volkov.getpass.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.volkov.getpass.data.entity.User;
import ru.volkov.getpass.data.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("Couldn't find user with username: '%s'", username)));

        return new CustomUserDetails(
                user.getId(), user.getUsername(), user.getPassword(),
                user.getRole().getAuthorities(),
                user.isEnabled());
    }
}
