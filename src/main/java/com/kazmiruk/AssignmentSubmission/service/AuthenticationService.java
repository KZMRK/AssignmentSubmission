package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.dto.AuthenticationRequest;
import com.kazmiruk.AssignmentSubmission.dto.AuthenticationResponse;
import com.kazmiruk.AssignmentSubmission.dto.RegisterRequest;
import com.kazmiruk.AssignmentSubmission.repository.UserRepository;
import com.kazmiruk.AssignmentSubmission.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user     = User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        var jwtToken = jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public Boolean validate(String token, User user) {
        return jwtUtil.validateToken(token, user);
    }
}
