import React from 'react';
import {Badge} from "react-bootstrap";

const StatusBadge = (props) => {
    const {text} = props;

    function getColorClassOfBadge() {
        switch (text) {
            case "Complete":
                return "complete";
            case "Needs Update":
                return "needs-update";
            case "Submitted":
                return "submitted"
            default:
                return "info"
        }
    }

    return (
        <Badge pill bg={getColorClassOfBadge()} style={{ fontSize: "1em" }}>
            {text}
        </Badge>
    );
};

export default StatusBadge;