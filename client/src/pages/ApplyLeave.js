import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
function ApplyLeave() {
  return (
    <>
      <div className="mt-5 mx-5 w-75 p-2 h-75 d-inline-block" >
        <Form >
          <label className="my-4"> <h2>Apply For Leave</h2></label>
          <FloatingLabel controlId="floatingSelect" label="Select leave type...">
            <Form.Select >

              <option value="1">Casual</option>
              <option value="2">Medical Leave</option>
              <option value="3">Restricted Hollydays(RH)</option>
            </Form.Select>
          </FloatingLabel>


          <div className="row my-5">
            <div className="col-md-5">
              <Form.Group controlId="dob">
                <Col>
                  <FloatingLabel
                    controlId="floatdate"
                    label="From"
                    className="mb-3"
                  >
                    <Form.Control type="date" name="dob" placeholder="from" />
                  </FloatingLabel>
                </Col>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group controlId="dob">
                <Col>
                <FloatingLabel
                    controlId="floatdate"
                    label="To"
                    className="mb-3"
                  >
                    <Form.Control type="date" name="dob" placeholder="from" />
                  </FloatingLabel>
                </Col>
              </Form.Group>
            </div>
          </div>

          <FloatingLabel controlId="floatingTextarea2" label="Discription">
            <Form.Control
              as="textarea"
              placeholder="Write discription here..."
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <Button className="my-5 sm-lg" variant="primary">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default ApplyLeave;