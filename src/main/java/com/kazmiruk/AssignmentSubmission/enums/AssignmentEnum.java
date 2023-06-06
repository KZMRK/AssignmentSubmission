package com.kazmiruk.AssignmentSubmission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1, "assignmentName"),
    ASSIGNMENT_2(2, "assignmentName"),
    ASSIGNMENT_3(3, "assignmentName"),
    ASSIGNMENT_4(4, "assignmentName"),
    ASSIGNMENT_5(5, "assignmentName"),
    ASSIGNMENT_6(6, "assignmentName"),
    ASSIGNMENT_7(7, "assignmentName"),
    ASSIGNMENT_8(8, "assignmentName"),
    ASSIGNMENT_9(9, "assignmentName"),
    ASSIGNMENT_10(10, "assignmentName"),
    ASSIGNMENT_11(11, "assignmentName"),
    ASSIGNMENT_12(12, "assignmentName"),
    ASSIGNMENT_13(13, "assignmentName"),
    ASSIGNMENT_14(14, "assignmentName"),
    ;

    private final int assignmentNum;

    private final String assignmentName;

    AssignmentEnum(int assignmentNum, String assignmentName) {
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }

    public int getAssignmentNum() {
        return assignmentNum;
    }

    public String getAssignmentName() {
        return assignmentName;
    }
}
