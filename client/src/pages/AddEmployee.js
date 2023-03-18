import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddEmployee() {
  // const navigate=useNavigate();
  const [employee,setEmployee] = useState({
      empId:"",
      gender:"",
      dob:"",
      firstName:"",
      lastName:"",
      departmentName:"",
      address:"",
      email:"",
      city:"",
      country:"",
      phone:"",
      password:"",
      cpassword:""
  });
  let name,value;
  const handleInput =(e) =>{
      console.log(e);
      name=e.target.name;
      value=e.target.value;
      setEmployee({...employee,[name]:value});//here name is property

  }
  
  const PostData = async (e)=>{
      e.preventDefault();
      const { empId,gender,dob,firstName,lastName,departmentName, address,email,city,country,phone,password,cpassword} = employee;
      const res =await fetch("/registerEmp",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
            empId,gender,dob,firstName,lastName,departmentName, address,email,city,country,phone,password,cpassword
          })
      });
      const data = await res.json();
      
      if(data.status === 422 || !data){
          window.alert("Employee invalid Registration");
          console.log("Invalide registration");
      }
      else{
          e.target.reset();
          window.alert("Employee Registration successfull");
          console.log(" registration successfull");
          
          
          // navigate("/Login");//if successfull then redirect to login page
      }
      

  }

  

  return (
    <>
    <center>
   
      <div className="app-container border mt-4   p-4  d-inline-block shadow-sm rounded-lg" style={{width: '68%', height: '90%'}}>
      <label className="my-3 "> <h4> Add Employee </h4></label>
        <form id="myform" className="border-top" method="POST">
          <label className="my-4"> <h2>Employee Information </h2></label>
          <Row > 
            <Col>

              <FloatingLabel
                controlId="floatingInput"
                label="Employee code(Must be unique)"
                className="mb-3"
              >
                <Form.Control type="number"
                name="empId"
                value={employee.empId}
                onChange={handleInput}
                autocomplete="off"
                placeholder="Employee code" />
              </FloatingLabel>

            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Gender..."
                className="mb-3"
              >
                <Form.Select size=""
                 name="gender"
                 value={employee.gender}
                 autocomplete="off"
                 onChange={handleInput}
                >
                  <option selected></option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Birth Date"
                className="mb-3"
              >
                <Form.Control type="date" 
                 name="dob" 
                value={employee.dob}
                onChange={handleInput}
                autocomplete="off"
                 placeholder="Bith date" />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="First name"
                className="mb-3"
              >
                
                <Form.Control type="text" 
                name="firstName"
                value={employee.firstName}
                onChange={handleInput}
                autocomplete="off"
                placeholder="first name" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Last name"
                className="mb-3"
              >
                <Form.Control type="text"
                name="lastName"
                value={employee.lastName}
                onChange={handleInput}
                autocomplete="off"
                placeholder="Last name" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Department"
                className="mb-3"
              >
                <Form.Select size=""
                 name="departmentName"
                 value={employee.departmentName}
                 autocomplete="off"
                 onChange={handleInput}
                >
                  <option selected></option>
                  <option>Human Resource</option>
                  <option>Information Technology</option>
                  <option>Operationals</option>
                </Form.Select>
              </FloatingLabel>

            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Address"
                className="mb-3"
              >
                <Form.Control type="text" 
                name="address"
                value={employee.address}
                onChange={handleInput}
                autocomplete="off"
                placeholder="At post..." />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email"
                name="email"
                value={employee.email}
                onChange={handleInput}
                autocomplete="off"
                placeholder="name@example.com" />
              </FloatingLabel>
            </Col>
            <Col>
              <Row>
                <Col><FloatingLabel
                  controlId="floatingInput"
                  label="City/Town"
                  className="mb-3"
                >
                  <Form.Control type="text" 
                  name="city"
                  value={employee.city}
                  onChange={handleInput}
                  autocomplete="off"
                  placeholder="Ex.Amravati" />
                </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Country"
                    className="mb-3"
                  >
                    <Form.Control type="text" 
                    name="country"
                    value={employee.country}
                    onChange={handleInput}
                    autocomplete="off"
                    placeholder="Ex.India" />
                  </FloatingLabel>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" 
                name="password"
                value={employee.password}
                onChange={handleInput}
                autocomplete="off"
                placeholder="Password" />
              </FloatingLabel>



            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Phone number"
                className="mb-3"
              >
                <Form.Control type="number" 
                name="phone"
                value={employee.phone}
                onChange={handleInput}
       
                placeholder="Phone number" />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                <Form.Control type="password" 
                name="cpassword"
                value={employee.cpassword}
                onChange={handleInput}
                autocomplete="off"
                placeholder="Confirm Password" />
              </FloatingLabel>
            </Col>
            <Col>
              <div className="mb-2">
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" name="postdata" onClick={PostData} size="lg">
                  Submit
                </Button>
              </div>

            </div>
          </Col>
        </Row>

      </form>
    </div>
   
    </center>
    </>
  );
}
export default AddEmployee;