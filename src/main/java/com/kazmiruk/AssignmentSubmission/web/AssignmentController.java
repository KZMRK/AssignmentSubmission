package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.dto.AssignmentResponseDto;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import com.kazmiruk.AssignmentSubmission.enums.AuthorityEnum;
import com.kazmiruk.AssignmentSubmission.service.AssignmentService;
import com.kazmiruk.AssignmentSubmission.service.UsersService;
import com.kazmiruk.AssignmentSubmission.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UsersService usersService;

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
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
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
        if (assignment.getCodeReviewer() == null) {
            Optional<User> foundUserOpt = usersService.findUserByUsername(user.getUsername());
            if (foundUserOpt.isPresent()) {
                User foundUser = foundUserOpt.get();
                if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER, foundUser)) {
                    assignment.setCodeReviewer(foundUser);
                    assignment.setStatus(AssignmentStatusEnum.IN_REVIEW.getStatus());
                }
            }
        }
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}
