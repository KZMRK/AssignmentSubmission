package com.kazmiruk.AssignmentSubmission.dto;

import com.kazmiruk.AssignmentSubmission.domain.Assignment;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentEnum;
import com.kazmiruk.AssignmentSubmission.enums.AssignmentStatusEnum;
import lombok.Data;


@Data
public class AssignmentResponseDto {

    private Assignment assignment;
    private final AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private final AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        this.assignment = assignment;
    }
}
