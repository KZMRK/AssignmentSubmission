package com.kazmiruk.AssignmentSubmission.repository;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a where a.status = :status or a.codeReviewer = :reviewer")
    Set<Assignment> findByStatusOrCodeReviewer(@Param("status") String status,
                                       @Param("reviewer") User reviewer);
}
