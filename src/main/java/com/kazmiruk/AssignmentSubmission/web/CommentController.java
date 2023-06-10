package com.kazmiruk.AssignmentSubmission.web;

import com.kazmiruk.AssignmentSubmission.domain.Comment;
import com.kazmiruk.AssignmentSubmission.domain.User;
import com.kazmiruk.AssignmentSubmission.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @RequestBody Comment comment,
            @AuthenticationPrincipal User user
    ) {
        Comment createdComment = commentService.save(comment, user);
        return ResponseEntity.ok(createdComment);
    }

    @GetMapping
    public ResponseEntity<Set<Comment>> getCommentsByAssignmentId(
            @RequestParam Long assignmentId
    ) {
        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> editComment(
            @PathVariable Long commentId,
            @RequestBody Comment comment
    ) {
        Comment editedComment = commentService.save(comment);
        return ResponseEntity.ok(editedComment);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<Long> deleteComment(
            @PathVariable Long commentId
    ) {
        commentService.deleteCommentById(commentId);
        return ResponseEntity.ok(commentId);
    }
}
