package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.dto.UserDto;
import com.kazmiruk.AssignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByUsername(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> UserDto.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .role(user.getRole())
                                .build()
                ).collect(Collectors.toList());
    }
}
