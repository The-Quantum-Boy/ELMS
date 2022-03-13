import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [loading, setLoading]=useState(false);

    const loginAdmin = async (e) => {
        e.preventDefault();


        const res = await fetch('/AdminSignin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        // const data = res.json();

        if (res.status === 200) {

           
            console.log("Login successfull");
            toast.success('Admin Login Successful!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            navigate("/EmpServices");
        } else {
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
        // if(res.status === 400 && !data){
        //     window.alert("Invalid crenditials");
        //     console.log("Invalid crenditials");
        // } else{
        //     window.alert("Login successfull");
        //     console.log("Login successfull");
        //     navigate("/EmpServices/AddEmployee");
        // }

    }


    return (
        <>
            <Navbar />
            <Container>
                <Row className="" style={{marginTop:"130px"}}>

                    <Col lg={5} md={6} sm={12} className="p-5 border m-auto shadow-sm rounded-lg">
                        <h3 className="shadow-sm text-dark  mb-5 p-2 text-center rounded">Admin Login</h3>
                        <Form method="POST">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}

                                    placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" />
                            </Form.Group>

                            <Button className="mt-4" variant="dark secondary btn-block" name="AdminSignin" type="submit" onClick={loginAdmin}>
                                Login
                            </Button>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                               />
                        </Form>
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default AdminLogin;
