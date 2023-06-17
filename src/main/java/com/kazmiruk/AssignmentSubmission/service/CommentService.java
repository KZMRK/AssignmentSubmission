package com.kazmiruk.AssignmentSubmission.service;

import com.kazmiruk.AssignmentSubmission.domain.Comment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.enums.Role;
import com.kazmiruk.AssignmentSubmission.repository.AssignmentRepository;
import com.kazmiruk.AssignmentSubmission.repository.CommentRepository;
import com.kazmiruk.AssignmentSubmission.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final AssignmentRepository assignmentRepository;

    private final SimpMessagingTemplate simpMessagingTemplate;

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        return commentRepository.findByAssignmentId(assignmentId);
    }

    public Comment saveAndSendToUser(Comment comment) {
        User publisher = userRepository.findByEmail(comment.getCreatedBy().getEmail()).orElseThrow();
        User receiver;
        if (publisher.getRole().equals(Role.ROLE_CODE_REVIEWER)) {
            receiver = assignmentRepository.findStudentByAssignment(comment.getAssignment());
        } else {
            receiver = assignmentRepository.findCodeReviewerByAssignment(comment.getAssignment());
        }
        comment.setCreatedBy(publisher);
        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(LocalDateTime.now());
        }
        Comment savedComment = commentRepository.save(comment);
        simpMessagingTemplate.convertAndSendToUser(receiver.getEmail(), "/private", savedComment);
        simpMessagingTemplate.convertAndSendToUser(publisher.getEmail(), "/private", savedComment);
        return savedComment;
    }
}
