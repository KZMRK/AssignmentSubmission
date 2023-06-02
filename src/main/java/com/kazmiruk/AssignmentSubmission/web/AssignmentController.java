package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.service.AssignmentService;
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
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(
            @PathVariable Long assignmentId,
            @RequestBody Assignment assignment,
            @AuthenticationPrincipal User user
            ) {
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}
