import React,{useState} from 'react'
import {Col,Container,Row,Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';


const EmployeeLogin = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const loginEmployee =async (e)=>{
        e.preventDefault();
        
        const res = await fetch('/EmpLogin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        // const data = res.json();
        if(res.status===200){
            // window.alert("Login successfull");
            toast.success('Login Successful!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
            console.log("Login successfull");
            navigate("/Leaves/LeaveHistory");
            
        }else if(res.status===400){
            toast.warn('please fill the field properly!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});
            console.log("please fill the fields properly");
        }
        else if(res.status===403){
            toast.info('You are not registered please contact the administrator!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                console.log("NOt registered");
        }else if(res.status===402){
            toast.error('Invalid crenditials!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log("Invalid crenditials");
        }
        else {
            toast.error('something happened wrong!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // window.alert("Invalid crenditials");
            // console.log("Invalid crenditials");
        }
        
    }
    

    return (
        <>
           <Navbar/>
           <ToastContainer position="top-center"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
           <Container >
                <Row className="" style={{marginTop:"150px"}}>
                    
                    <Col lg={5} md={7} sm={18} className="p-5 m-auto shadow-sm border rounded-lg">
                    <h3 className="shadow-sm text-dark mt-2 mb-4 p-2 text-center rounded">Employee Login</h3>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" 
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Password" />
                            </Form.Group>

                            <Button className="mt-4" variant="dark secondary btn-block" type="submit" name="EmpLogin" value="Log in" onClick={loginEmployee}>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EmployeeLogin;
