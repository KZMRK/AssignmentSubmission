package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.dto.AuthenticationRequest;
import com.kazmiruk.AssignmentSubmission.dto.AuthenticationResponse;
import com.kazmiruk.AssignmentSubmission.dto.RegisterRequest;
import com.kazmiruk.AssignmentSubmission.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(
            @RequestParam String token,
            @AuthenticationPrincipal User user
            ) {
        return ResponseEntity.ok(authenticationService.validate(token, user));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }
}
