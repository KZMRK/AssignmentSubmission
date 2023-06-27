import React, {useContext, useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import {PopoutContext} from "../provider/PopoutProvider";

const InfoBox = (props) => {
    const {message, title} = props;

    const {show, setShow} = useContext(PopoutContext);

    const handleClose = props.handleClose ? props.handleClose : () => setShow(false);

    console.log("Alert")

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoBox;