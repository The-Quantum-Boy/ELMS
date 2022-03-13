import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal'
import { Loading } from '../components/Loading';
import moment from "moment";

const LeaveDetail = ({ objId }) => {
    console.log(objId);
    const [action, setAction] = useState({admnAction:'',admnDesc:''});
    // const [id,setId] = useState(objId);
    const [loader, setLoader] = useState(false);
    // const [loader2,setLoader2]= useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fetchObj, setfetchObj] = useState({})
    
    const [details, setDetails] = useState({})
    // const [loading, setLoading] = useState(false);

    const getObjDetails = async () => {

        const resobj = await fetch('/getobjDetails', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ objId })
        })
        const objdata = await resobj.json();
        setfetchObj({ ...objdata });
        // console.log({ ...objdata });

        const empId = fetchObj.empId;

        const res = await fetch('/getEmployeeDetails', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ empId })
        })

        const data = await res.json();
        setLoader(true);
        setDetails({ ...objdata, ...data });
        // console.log({ ...objdata, ...data });
    }
    console.log(fetchObj);



    useEffect(() => {
        getObjDetails();
    })//[empId] if error in future
    // getObjDetails();
    //take action
    const PostAction = async (e) => {
        e.preventDefault();
        const { admnAction, admnDesc } = action;
        const res = await fetch("/addAction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ admnAction, admnDesc, objId })
        });

        // const data = await res.json();
        // setLoader2(true);
        if (res.status === 200) {
            toast.success('Leave is Remarked!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setAction({ ...action, admnAction: "", admnDesc: "" });

        } else {
            toast.warn('Invalid Action!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            // window.alert("Invalid Action");
            console.log("invalid action");
        }
    }

    let name, value;
    const handleAction = (e) => {
        // e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        console.log(name,value);
        // alert(name,value);
        setAction({ ...action, [name]: value });
    }

    return (
        <>
                      
           
            <Modal className="bg-dark bg-opacity-10" show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Leave Take Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                                <FloatingLabel controlId="floatingSelect" label="Select Action...">
                                    <Form.Select 
                                        
                                        onChange={handleAction}
                                        value={action.admnAction}
                                        name="admnAction"
                                        autocomplete="off">
                                        <option selected></option>
                                        <option value="1">Approved</option>
                                        <option value="0">Not_Approved</option>
                                    </Form.Select>
                                </FloatingLabel>

                                
                                <FloatingLabel className="mt-2" controlId="floatingTextarea2" label="">
                                    <textarea
                                        type="text"
                                        style={{ height: '100px', width: '100%', padding: '20px', borderColor: 'LightGray' }}
                                        onChange={(e)=>handleAction(e)}                                 
                                        value={action.admnDesc}
                                        name="admnDesc"
                                        placeholder="Description"     
                                    >

                                    </textarea>

                                 {/* <textarea ></textarea> */}
                                </FloatingLabel>
        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" class="btn  btn-dark btn-primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" class="btn  btn-dark btn-primary" onClick={PostAction}>
                        Submit
                    </Button>
                </Modal.Footer>
               
            </Modal>

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
            
            {loader?(
            <div className="app-container">
                <form method="GET">

                    <div class="container">
                        <div className="row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Employee Name</b></div>
                            <div className="col">{details.firstName}</div>
                            <div className="col"><b>Emp Id</b></div>
                            <div className="col">EMP00{details.empId}</div>
                            <div className="col"><b>Gender</b></div>
                            <div className="col"> {details.gender}</div>
                        </div>
                        <div className="row   p-4 border-bottom bg-white rounded">
                            <div className="col"><b>Email Id</b></div>
                            <div className="col">{details.email}</div>
                            <div className="col"><b>Contact No</b></div>
                            <div className="col">{details.phone}</div>
                            <div className="col"><b>Posting Date</b></div>
                            <div className="col">{details.postingDate}</div>
                        </div>
                        <div className="row row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Leave Type</b></div>
                            <div className="col">{details.leaveType}</div>
                            <div className="col"><b>Leave Date</b></div>
                            <div className="col"><b>From</b>{" "}{moment(details.fromDate).format("DD/MM/YYYY")}  <b>To</b>{" "} {moment(details.toDate).format("DD/MM/YYYY")}</div>

                        </div>
                        <div className="row row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Employee Leave Description</b></div>
                            <div className="col">{details.description}</div>
                        </div>
                        <div className="row row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Leave Status</b></div>
                            <div className="col">{(() => {
                                if (details.status === 1) {
                                    return (<>Approved</>)
                                }
                                else if (details.status === 2) {
                                    return (<>Waiting for approval</>)
                                } else {
                                    return (<>Not Approved</>)
                                }
                            })()

                            }</div>
                        </div>
                        <div className="row row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Admin Remark</b></div>
                            <div className="col">
                                {(() => {
                                    if (details.adminRemark === 1) {
                                        return (<>Approved</>)
                                    }
                                    else if (details.adminRemark === 2) {
                                        return (<>Waiting for approval</>)
                                    } else {
                                        return (<>Not Approved</>)
                                    }
                                })()

                                }

                            </div>
                        </div>
                        <div className="row row  p-4 border-bottom  bg-white rounded">
                            <div className="col"><b>Admin Action Taken Date</b></div>
                            <div className="col">
                                {(() => {
                                    if (!details.adminRemarkDate) {
                                        return (<><b>NA</b></>)
                                    }
                                    else {
                                        return (<>{details.adminRemarkDate}</>)
                                    }
                                })()

                                }

                            </div>
                            {(() => {
                                if (details.status === 1) {
                                    return (<></>)
                                }
                                else if (details.status === 2) {
                                    return (<><div className="col">
                                        <button type="button" class="btn btn-dark btn-primary" onClick={handleShow}>
                                            Take Action
                                        </button></div></>)
                                } else {
                                    return (<></>)
                                }
                            })()
                            }
                        </div>

                    </div>



                </form>
            </div>):<Loading/>}

            {/* </div> */}

        </>
    )
}

export default LeaveDetail;
