package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
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
        assignment.setStatus("Needs to be Submitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    public Set<Assignment> findByUser(User user) {
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
