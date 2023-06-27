package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import com.kazmiruk.AssignmentSubmission.enums.Role;
import com.kazmiruk.AssignmentSubmission.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = Assignment.builder()
                .status(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus())
                .number(findNextAssignmentToSubmit(user))
                .user(user)
                .build();
        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignments = assignmentRepository.findByUser(user);
        if (assignments == null) {
            return 1;
        }
        return assignments.stream()
                .mapToInt(Assignment::getNumber)
                .max()
                .orElse(0) + 1;
    }

    public Set<Assignment> findByUser(User user) {
        // if role if a code reviewer
        if (user.getRole() == Role.ROLE_CODE_REVIEWER) {
            return assignmentRepository.findByStatusOrCodeReviewer(AssignmentStatusEnum.SUBMITTED.getStatus(), user);
        }
        // if role is a student
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public boolean isAssignmentHasCodeReviewer(long id) {
        Optional<Assignment> assignmentOpt = assignmentRepository.findById(id);
        if (assignmentOpt.isEmpty())
            return false;

        Assignment assignment = assignmentOpt.get();
        return assignment.getCodeReviewer() != null;
    }
}
