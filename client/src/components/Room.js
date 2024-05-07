import React, {useState} from "react";
import {Modal, Button, Carousel, CardHeader} from 'react-bootstrap'


function Room({ room }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      
      <div className="col-md-4">
      <img src={room.imageurls[0]} className="smallimg" alt='' />
        
      </div>
      
      <div className="col-md-7 ">
            <h1>{room.name}</h1>
            <b>
            <p>Max Count: {room.maxcount}</p>
            <p>Phone Number : {room.phoneNumber}</p>
            <p>Type: {room.type}</p>
            </b>
            <div style={{float: 'right'}}>
                <button className="btn btn-primary" onClick={handleShow}>View Details</button>
            </div>



      </div>

      

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Carousel>
                { room.imageurls.map( url => {
                    return <Carousel.Item>
                        <img 
                            className="d-block w-100 bigimg"
                            src={url}
                        />
                    </Carousel.Item>
                })}
      
            </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default Room;
