package com.kazmiruk.AssignmentSubmission.repository;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    Set<Assignment> findByStatus(String status);

    /*@Query("select a from Assignment a where a.status = :status")
    Set<Assignment> findByCodeReviewer(User reviewer);*/
}
