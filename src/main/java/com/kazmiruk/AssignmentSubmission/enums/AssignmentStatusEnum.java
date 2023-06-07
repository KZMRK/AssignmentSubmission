package com.kazmiruk.AssignmentSubmission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("Pending Submissions", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In Review", 3),
    NEEDS_UPDATE("Needs Update", 4),
    COMPLETE("Complete", 5);

    private final String status;
    private final Integer step;

    AssignmentStatusEnum(String status, Integer step) {
        this.status = status;
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public Integer getStep() {
        return step;
    }

    public static class Constants {
        public static final String PENDING_SUBMISSION = "Pending Submissions";
        public static final String SUBMITTED = "Submitted";
        public static final String IN_REVIEW = "In Review";
        public static final String NEEDS_UPDATE = "Needs Update";
        public static final String COMPLETE = "Complete";
    }
}
