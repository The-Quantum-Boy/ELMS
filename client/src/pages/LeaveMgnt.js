import React, { useState, useEffect } from "react";
import AdmnNav from '../components/AdmnNav';
import { Table} from 'react-bootstrap';
import LeaveDetail from "./LeaveDetail";
import { Loading } from "../components/Loading";
// import { useNavigate } from 'react-router-dom';
import moment from "moment";

export const LeaveMgnt = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [loader,setLoader]= useState(false);
    // const [show, setShow] = useState(false);
    const callHistoryPage = async () => {
        try {
            const res = await fetch('/allLeavesapply', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setEmployeeData(data);
            setLoader(true);
            console.log(data);
            
            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    useEffect(() => {
        callHistoryPage();

    }, []);
   
    return (
        <>
            <AdmnNav />
            {/* <LeaveDetail/> */}
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            {loader?(
            <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}>
                <div className="mt-3 mb-3 ml-3"> <h5>Leave History</h5></div>
                <div className="app-container">
                    <form>
                        <form method="GET">
                            <Table bordered hover responsive>
                                <thead className="" >
                                    <tr className="">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Leave type</th>
                                        <th>Posting Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeData.map((leaves, index) => (
                                        <tr key={index} className="text-center">
                                            <td key={index} >{index + 1}</td>
                                            <td>{leaves.firstName}{" "}{leaves.lastName}{"(EMP00" + leaves.empId + ")"}</td>
                                            <td>{leaves.leaveType}</td>
                                            <td>{moment(leaves.postingDate).format("DD/MM/YYYY")}</td>
                                            <td >
                                                {(() => {
                                                    if (leaves.status === 1) {
                                                        return (<>Approved</>)
                                                    }
                                                    else if (leaves.status === 2) {
                                                        return (<>Waiting for approval</>)
                                                    } else {
                                                        return (<>Not Approved</>)
                                                    }
                                                })()}
                                            </td>
                                            <td>
                                               
                                                <button type="button" class="btn btn-sm btn-dark btn-primary"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={()=>setViewDetail(leaves._id)}
                                                    >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </form>
                    </form>
                </div>

            </div>):<Loading/>}
        </>
    );
};

export const AllLeaves = () => {
    // const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [loader,setLoader] = useState(false);
    // const [show, setShow] = useState(false);
    const callHistoryPage = async () => {
        try {
            const res = await fetch('/allLeavesapply', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            setEmployeeData(data);
            setLoader(true);

            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    useEffect(() => {
        callHistoryPage();

    }, [viewDetail]);
    // function handleEdit(e, empId) {
    //     e.preventDefault();
    //        setViewDetail(empId);
    //     //    setShow(true);

    //     // navigate(`/LeaveDetail/${empId}`);


    // }

    return (
        <>
            <AdmnNav />
            {/* <div style={{
                display: show ? 'block' : 'none'
            }}>
                <LeaveDetail />
            </div>   */}
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            {loader?(
            <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}>
                <div className="mt-3 mb-3 ml-3"> <h5>Leave History</h5></div>
                <div className="app-container">
                    <form>
                        <form method="GET">
                            <Table bordered hover responsive>
                                <thead className="" >
                                    <tr className="">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Leave type</th>
                                        <th>Posting Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeData.map((leaves, index) => (
                                        <tr className="text-center">
                                            <td key={index}>{index + 1}</td>
                                            <td>{leaves.firstName}{" "}{leaves.lastName}{"(EMP00" + leaves.empId + ")"}</td>
                                            <td>{leaves.leaveType}</td>
                                            <td>{moment(leaves.postingDate).format("DD/MM/YYYY")}</td>
                                            <td >
                                                {(() => {
                                                    if (leaves.status === 1) {
                                                        return (<>Approved</>)
                                                    }
                                                    else if (leaves.status === 2) {
                                                        return (<>Waiting for approval</>)
                                                    } else {
                                                        return (<>Not Approved</>)
                                                    }
                                                })()}
                                            </td>
                                            <td>
                                                {/* <Button variant="primary" size="sm"
                                                    type="submit"
                                                    name="edit"
                                                    onClick={(e) => (handleEdit(e, leaves.empId))}
                                                >
                                                    View Details
                                                </Button> */}
                                                <button type="button" class="btn btn-sm btn-dark btn-primary"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={()=>setViewDetail(leaves._id)}
                                                    >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </form>
                    </form>
                </div>

            </div>):<Loading/>}
        </>
    );
};

export const PendingLeaves = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [loader, setLoader] = useState(false);
    const callHistoryPage = async () => {
        try {
            const res = await fetch('/pendingLeaves', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setEmployeeData(data);
            setLoader(true);

            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }
        } catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    useEffect(() => {
        callHistoryPage();

    }, []);

    return (
        <>
            <AdmnNav />
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            {loader?(
            <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}>
                <div className="mt-3 mb-3 ml-3"> <h5><b>Pending Leave History</b></h5></div>
                <div className="app-container">
                    <form method="GET">
                        <Table bordered hover responsive>
                            <thead className="" >
                                <tr className="">
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Leave type</th>
                                    <th>Posting Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {employeeData.map((leaves,index) => (
                                    <tr className="text-center">
                                        <td key={index}>{index + 1}</td>
                                        <td>{leaves.firstName}{" "}{leaves.lastName}</td>
                                        <td>{leaves.leaveType}</td>
                                        <td>{moment(leaves.postingDate).format("DD/MM/YYYY")}</td>
                                        <td >
                                            {(() => {
                                                if (leaves.status === 2) {
                                                    return (<>Waiting for approval</>);
                                                }
                                            })()}
                                        </td>
                                        <td>
                                        <button type="button" class="btn btn-sm btn-dark btn-primary"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={()=>setViewDetail(leaves._id)}
                                                    >
                                                    View Details
                                                </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </form>
                </div>

            </div>):<Loading/>}
        </>
    );
};

export const ApprovedLeaves = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [loader,setLoader]= useState(false);
    const callHistoryPage = async () => {
        try {
            const res = await fetch('/approvedLeaves', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            setEmployeeData(data);
            setLoader(true);
            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    useEffect(() => {
        callHistoryPage();

    }, []);

    return (
        <>
            <AdmnNav />
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            {loader?(
            <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}>
                <div className="mt-3 mb-3 ml-3"> <h5><b>Approved Leave History</b></h5></div>
                <div className="app-container">
                    <form method="GET">
                        <Table bordered hover responsive>
                            <thead className="" >
                                <tr className="">
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Leave type</th>
                                    <th>Posting Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {employeeData.map((leaves, index) => (
                                    <tr className="text-center">
                                        <td key={index}>{index + 1}</td>
                                        <td>{leaves.firstName}{" "}{leaves.lastName}</td>
                                        <td>{leaves.leaveType}</td>
                                        <td>{moment(leaves.postingDate).format("DD/MM/YYYY")}</td>
                                        <td >
                                            {(() => {
                                                if (leaves.status === 1) {
                                                    return (<>Approved</>);
                                                }
                                            })()}
                                        </td>
                                        <td>
                                        <button type="button" class="btn btn-sm btn-dark btn-primary"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={()=>setViewDetail(leaves._id)}
                                                    >
                                                    View Details
                                                </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </form>
                </div>

            </div>):<Loading />}
        </>
    );
};

export const NotApprovedLeaves = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [loader,setLoader]= useState(false);
    const callHistoryPage = async () => {
        try {
            const res = await fetch('/notapprovedLeaves', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setEmployeeData(data);
            setLoader(true);
            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    useEffect(() => {
        callHistoryPage();

    }, []);

    return (
        <>
            <AdmnNav />
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            {loader?(
            <div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '65%', height: '90%' }}>
                <div className="mt-3 mb-3 ml-3"> <h5><b>Not Approved Leave History</b></h5></div>
                <div className="app-container">
                    <form method="GET">
                        <Table bordered hover responsive>
                            <thead className="" >
                                <tr className="">
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Leave type</th>
                                    <th>Posting Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeData.map((leaves, index) => (
                                    <tr className="text-center">
                                        <td key={index}>{index + 1}</td>
                                        <td>{leaves.firstName}{" "}{leaves.lastName}</td>
                                        <td>{leaves.leaveType}</td>
                                        <td>{moment(leaves.postingDate).format("DD/MM/YYYY")}</td>
                                        <td className="">
                                            {(() => {
                                                if (leaves.status === 0) {
                                                    return (<>Not Approved</>);
                                                }
                                            })()}
                                        </td>
                                        <td>
                                        <button type="button" class="btn btn-sm btn-dark btn-primary"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#exampleModal"
                                                    onClick={()=>setViewDetail(leaves._id)}
                                                    >
                                                    View Details
                                                </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </form>
                </div>
            </div>):<Loading />}
        </>
    );
};

