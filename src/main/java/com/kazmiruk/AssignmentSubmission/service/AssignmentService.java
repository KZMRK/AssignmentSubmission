package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import com.kazmiruk.AssignmentSubmission.enums.AuthorityEnum;
import com.kazmiruk.AssignmentSubmission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);

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
        boolean isCodeReviewerRole = user.getAuthorities().stream()
                .anyMatch(authority -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(authority.getAuthority()));
        if (isCodeReviewerRole) {
            return assignmentRepository.findByStatus(AssignmentStatusEnum.SUBMITTED.getStatus());
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
}
