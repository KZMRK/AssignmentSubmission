package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.dto.UserDto;
import com.kazmiruk.AssignmentSubmission.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UsersService usersService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> users = usersService.findAllUsers();
        return ResponseEntity.ok(users);
    }
}
