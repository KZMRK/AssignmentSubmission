package com.kazmiruk.AssignmentSubmission.repository;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);


}
