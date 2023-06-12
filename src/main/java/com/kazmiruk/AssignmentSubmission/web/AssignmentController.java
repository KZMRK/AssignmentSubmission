package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.dto.AssignmentResponseDto;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import com.kazmiruk.AssignmentSubmission.enums.Role;
import com.kazmiruk.AssignmentSubmission.service.AssignmentService;
import com.kazmiruk.AssignmentSubmission.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    private final UsersService usersService;

    @PostMapping
    public ResponseEntity<?> createAssignment (@AuthenticationPrincipal User user) {
        Assignment assignment = assignmentService.save(user);
        return ResponseEntity.ok(assignment);
    }

    @GetMapping
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.findByUser(user));
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId,
                                           @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        AssignmentResponseDto assignmentResponseDto = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(assignmentResponseDto);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(
            @PathVariable Long assignmentId,
            @RequestBody Assignment assignment,
            @AuthenticationPrincipal User user
            ) {
        if (assignment.getCodeReviewer() == null && user.getRole() == Role.ROLE_CODE_REVIEWER) {
                assignment.setCodeReviewer(user);
                assignment.setStatus(AssignmentStatusEnum.IN_REVIEW.getStatus());
        }
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}
