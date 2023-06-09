import React from 'react';
import {Badge} from "react-bootstrap";

const StatusBadge = (props) => {
    const {status} = props;

    function getColorClassOfBadge() {
        switch (status) {
            case "Complete":
                return "complete";
            case "Needs Update":
                return "needs-update";
            case "Submitted":
                return "submitted"
            case "Pending Submissions":
                return "pending-submissions"
            case "Resubmitted":
                return "resubmitted";
            case "In Review":
                return "in-review"
            default:
                return "info"
        }
    }

    return (
        <Badge pill bg={getColorClassOfBadge()} style={{ fontSize: "1em" }}>
            {status}
        </Badge>
    );
};

export default StatusBadge;