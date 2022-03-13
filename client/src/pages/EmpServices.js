import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Button, Table } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdmnNav from '../components/AdmnNav';
import { BsFillPencilFill, BsCheckLg } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import { Loading } from '../components/Loading';

// import { IconName } from "react-icons/bs";

export const EmpServices = () => {
	// const navigate = useNavigate();
	const [employeeData, setEmployeeData] = useState([]);
	const [viewDetail, setViewDetail] = useState([]);
	const [loading, SetLoading] = useState(false);
	// const [show, setShow] = useState(false);
	const callHistoryPage = async () => {
		try {
			const res = await fetch('/getEmpDetail', {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();
			console.log(data);
			setEmployeeData(data);
			SetLoading(true);
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

	// function handleEdit(e, empId) {
	//     e.preventDefault();
	//        setViewDetail(empId);
	//     //    setShow(true);

	//     // navigate(`/LeaveDetail/${empId}`);


	// }
	console.log(viewDetail);
	const postStaus = async (empId, empStatus) => {
		try {
			const res = await fetch('/changeStatus', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ empId, empStatus })
			});

			const data = await res.json();
			console.log(data);
			// SetLoading(true);
			if (res.status === 200) {
				
				toast.success('Employee activated successfully!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.location.reload();

			} else if (res.status === 201) {

				toast.success('Employee inactivated successfully!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.location.reload();
			} else {
				toast.error('something happened wrong!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<AdmnNav />
			{/* <div style={{
			 display: show ? 'block' : 'none'
		 }}>
			 <LeaveDetail />
		 </div>   */}
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
			<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-xl">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Update Employee Information</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<UpdateEmp empId={viewDetail} />
						</div>

					</div>
				</div>
			</div>
			{loading ? (
				<div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '68%', height: '90%' }}>
					<div className="mt-3 mb-3 ml-3"> <h5>Employee Information</h5></div>
					<div className="app-container">
						<form>
							<form method="GET">
								<Table bordered hover responsive>
									<thead className="" >
										<tr className="">
											<th>Sr No</th>
											<th>Emp Id</th>
											<th>Full Name</th>
											<th>Department</th>
											<th>Registration Date</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{employeeData.map((emp, index) => (
											<tr className="text-center">
												<td key={index}>{index + 1}</td>
												<td>{"EMP00" + emp.empId}</td>
												<td>{emp.firstName}{" "}{emp.lastName}</td>
												<td>{emp.departmentName}</td>
												<td>{moment(emp.regDate).format("DD/MM/YYYY")}</td>
												<td >
													{(() => {
														if (emp.empStatus === 0) {
															return (<><b style={{ color: '#ff1a1a' }}>Inactive</b></>)
														}
														else {
															return (<><b style={{ color: '#3CB371' }}>Active</b></>)
														}
													})()}
												</td>
												<td>

													<BsFillPencilFill
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
														onClick={() => setViewDetail(emp.empId)}
														type="submit" />
													&nbsp;&nbsp;&nbsp;&nbsp;

													{(() => {
														if (emp.empStatus === 0) {
															return (<><BiX
																type="submit"
																onClick={() => postStaus(emp.empId, emp.empStatus)}
															/></>)
														}
														else {
															return (<><BsCheckLg
																type="submit"
																onClick={() => postStaus(emp.empId, emp.empStatus)}
															/></>)
														}
													})()}

													{/* <BsCheckLg 
												  
												  type="submit"
												 onClick={()=>setViewDetail(emp.empId)}/> */}

												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</form>
						</form>
					</div>

				</div>) : <Loading />
			}
			
		</>
	);
};

export const AddEmployee = () => {
	// const navigate=useNavigate();
	// const [loading,SetLoading]=useState(false);
	const [employee, setEmployee] = useState({
		empId: "",
		gender: "",
		dob: "",
		firstName: "",
		lastName: "",
		departmentName: "",
		address: "",
		email: "",
		city: "",
		country: "",
		phone: "",
		password: "",
		cpassword: ""
	});
	let name, value;
	const handleInput = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setEmployee({ ...employee, [name]: value });//here name is property

	}
	const PostData = async (e) => {
		e.preventDefault();
		const { empId, gender, dob, firstName, lastName, departmentName, address, email, city, country, phone, password, cpassword } = employee;
		const res = await fetch("/registerEmp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				empId, gender, dob, firstName, lastName, departmentName, address, email, city, country, phone, password, cpassword
			})
		});
		// const data = await res.json();
		// SetLoading(true);
		if (res.status === 201) {
			toast.success('Employee Added Successfully.', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setEmployee({
				...employee, empId: "",
				gender: "",
				dob: "",
				firstName: "",
				lastName: "",
				departmentName: "",
				address: "",
				email: "",
				city: "",
				country: "",
				phone: "",
				password: "",
				cpassword: ""
			});
			console.log(" registration successfull");
		} else if (res.status === 422) {
			toast.warn('please fill the field properly!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});

			console.log("please fill the field properly");
		} else if (res.status === 423) {
			toast.error('Email aready exists!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log("email already exists");
		} else if (res.status === 424) {
			toast.error('Password does not match!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log("password does not match");
		} else {
			toast.error('Something went wrong!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

	}



	return (
		<>
			<AdmnNav />

			<center>


				<div className=" border  p-4 d-inline-block mx-auto shadow-sm rounded-lg" style={{ marginTop: "60px", width: '68%', height: '90%' }} >
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
				</div>
			</center>
		</>
	);
};

export const ManageEmp = () => {
	// const navigate = useNavigate();
	const [employeeData, setEmployeeData] = useState([]);
	const [viewDetail, setViewDetail] = useState([]);
	const [loading, SetLoading] = useState(false);
	// const [show, setShow] = useState(false);
	const callHistoryPage = async () => {
		try {
			const res = await fetch('/getEmpDetail', {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();
			console.log(data);
			setEmployeeData(data);
			SetLoading(true);
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
	
	console.log(viewDetail);
	const postStaus = async (empId, empStatus) => {
		try {
			const res = await fetch('/changeStatus', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ empId, empStatus })
			});

			const data = await res.json();
			console.log(data);
			// SetLoading(true);
			if (res.status === 200) {
				
				toast.success('Employee activated successfully!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.location.reload();

			} else if (res.status === 201) {

				toast.success('Employee inactivated successfully!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.location.reload();
			} else {
				toast.error('something happened wrong!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			
		} catch (err) {
			console.log(err);
		}
	}


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
							<h5 class="modal-title" id="exampleModalLabel">Update Employee Information</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<UpdateEmp empId={viewDetail} />
						</div>

					</div>
				</div>
			</div>
			{loading ? (
				<div className="border shadow-lg bg-white rounded mx-auto px-5 mt-5" style={{ width: '68%', height: '90%' }}>
					<div className="mt-3 mb-3 ml-3"> <h5>Employee Information</h5></div>
					<div className="app-container">
						<form>
							<form method="GET">
								<Table bordered hover responsive>
									<thead className="" >
										<tr className="">
											<th>Sr No</th>
											<th>Emp Id</th>
											<th>Full Name</th>
											<th>Department</th>
											<th>Registration Date</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{employeeData.map((emp, index) => (
											<tr className="text-center">
												<td key={index}>{index + 1}</td>
												<td>{"EMP00" + emp.empId}</td>
												<td>{emp.firstName}{" "}{emp.lastName}</td>
												<td>{emp.departmentName}</td>
												<td>{moment(emp.regDate).format("DD/MM/YYYY")}</td>
												<td >
													{(() => {
														if (emp.empStatus === 0) {
															return (<><b style={{ color: '#ff1a1a' }}>Inactive</b></>)
														}
														else {
															return (<><b style={{ color: '#3CB371' }}>Active</b></>)
														}
													})()}
												</td>
												<td>

													<BsFillPencilFill
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
														onClick={() => setViewDetail(emp.empId)}
														type="submit" />
													&nbsp;&nbsp;&nbsp;&nbsp;

													{(() => {
														if (emp.empStatus === 0) {
															return (<><BiX
																type="submit"
																onClick={() => postStaus(emp.empId, emp.empStatus)}
															/></>)
														}
														else {
															return (<><BsCheckLg
																type="submit"
																onClick={() => postStaus(emp.empId, emp.empStatus)}
															/></>)
														}
													})()}

													{/* <BsCheckLg 
												  
												  type="submit"
												 onClick={()=>setViewDetail(emp.empId)}/> */}

												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</form>
						</form>
					</div>

				</div>) : <Loading />

			}
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
		</>
	);
};





export const UpdateEmp = ({ empId }) => {
	const [loading, SetLoading] = useState(false);
	const [employee, setEmployee] = useState({
		empId: "",
		gender: "",
		dob: "",
		firstName: "",
		lastName: "",
		departmentName: "",
		address: "",
		email: "",
		city: "",
		country: "",
		phone: ""
	});
	const [empdata, setempData] = useState({
		empId: "",
		gender: "",
		dob: "",
		firstName: "",
		lastName: "",
		departmentName: "",
		address: "",
		email: employee.email,
		city: "",
		country: "",
		phone: ""
	});

	// get data from backend
	const empUpdateInfo = async () => {
		try {
			const res = await fetch('/getemployeedata', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ empId })
			});
			const data = await res.json();
			SetLoading(true);
			console.log(data);
			setEmployee({ empId: data.empId, email: data.email });
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		empUpdateInfo();
	});

	let name, value;
	const handleInput = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setempData({ ...empdata, [name]: value });//here name is property
	}

	const PostData = async (e) => {
		e.preventDefault();
		const { gender, dob, firstName, lastName, departmentName, address, city, country, phone } = empdata;
		const { empId, email } = employee;
		const res = await fetch("/UpdateEmp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				empId, gender, dob, firstName, lastName, departmentName, address, email, city, country, phone
			})
		});
		// const data = await res.json();
		// SetLoading(true);
		if (res.status === 200) {
			toast.success('Employee updated successfully', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			// window.alert("Employee updated successfully");
			console.log(" updation successfull");
			setempData({ ...employee, gender: "", dob: "", firstName: "", lastName: "", departmentName: "", address: "", city: "", country: "", phone: "" })

		}
		else if (res.status === 422) {
			toast.warn('Please fill the fields properly!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else if (res.status === 500) {
			toast.error('Unable to update!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
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
		}

	}


	return (
		<>
			{loading ? (
				<center>

					<div className=" mt-2  p-4 h-70  " >

						<form id="myform" method="POST">

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
											autocomplete="off"
											placeholder="Employee code" disabled>

										</Form.Control>
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
											value={empdata.gender}
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
											value={empdata.dob}
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
											value={empdata.firstName}
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
											value={empdata.lastName}
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
											value={empdata.departmentName}
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
											value={empdata.address}
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
											autocomplete="off"
											placeholder="name@example.com" disabled />
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
												value={empdata.city}
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
													value={empdata.country}
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
									<FloatingLabel
										controlId="floatingInput"
										label="Phone number"
										className="mb-3"
									>
										<Form.Control type="number"
											name="phone"
											value={empdata.phone}
											onChange={handleInput}

											placeholder="Phone number" />
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

				</center>) : <Loading />
			}
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
		</>
	);
};
