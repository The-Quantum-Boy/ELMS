import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const LeaveDetail = ({ empId }) => {

    const [action,setAction] =useState({
        admnAction:"",
        admnDesc:""
    });
    const [details, setDetails] = useState({})
    const getDetails = async () => {
        const res = await fetch('/getEmployeeDetails', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'

            },
            body: JSON.stringify({ empId })
        })

        const data = await res.json();
        const res2 = await fetch('/getLeaveDetails', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ empId })
        })

        const data2 = await res2.json();
        setDetails({ ...data, ...data2 });
        console.log({ ...data, ...data2 })
        //  console.log(data);
    }

    useEffect(() => {
        getDetails();
    })//[empId] if error in future

    //take action
    const PostAction = async (e) =>{
        e.preventDefault();
        const {admnAction, admnDesc}=action;
        const res =await fetch("/addAction",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({admnAction, admnDesc})
        });

        const data = await res.json({empId});
        if(data.status === 422 || !data){
            window.alert("Invalid Action");
            console.log("invalid action");
        }
    }

    let name,value;
    const handleAction=(e)=>{
        name = e.target.name;
        value= e.target.value;
        setAction({...action,[name]:value});
    }

    return (
        <>
            {/* <AdmnNav/> */}

            {/* <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}> */}
            {/* <div className="mt-3 mb-3 ml-3"> <h5><b>Leave Details</b></h5></div> */}
            <div class="modal fade bg-dark bg-opacity-10" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class=" modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="staticBackdropLabel">Leave Take Action</h6>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <FloatingLabel controlId="floatingSelect" label="Select Action...">
                                <Form.Select name="admnAction" value={action.admnAction} onChange={handleAction} autocomplete="off">
                                    <option selected></option>
                                    <option value={1}>Approved</option>
                                    <option value={0}>Not Approved</option>
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel className="mt-2" controlId="floatingTextarea2" label="">
                                   <textarea
                                    name="admnDesc"
                                    style={{ height: '100px', width: '100%', padding: '20px', borderColor: 'LightGray' }}
                                    value={action.admnDesc}
                                    onChange={handleAction}
                                    placeholder="Description"
                                   >
                                </textarea>
                            </FloatingLabel>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn  btn-dark btn-primary" onClick={PostAction}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

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
                            <div className="col"><b>From</b> {details.fromDate} <b>To</b> {details.toDate}</div>

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
                                if (details.status === 1) {
                                    return (<>Approved</>)
                                }
                                else if (details.status === 2) {
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
                                        <button type="button" class="btn btn-dark btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
            </div>

            {/* </div> */}

        </>
    )
}

export default LeaveDetail;
