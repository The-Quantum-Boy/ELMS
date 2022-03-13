const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require("cookie-Parser") ;
const app = express();
// const { Server } =require("socket.io");
app.use(cookieParser()) ;
dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());
// app.use(cookieParser());
// app.use(myParser.json({limit: '200mb'}));
// app.use(myParser.urlencoded({limit: '200mb', extended: true}));
// app.use(myParser.text({ limit: '200mb' }));

app.use(require('./router/auth'));

app.get('/' , (_req , res)=>{
    res.send('hello from simple home ')
 
 });
app.get('/signin' , (req , res)=>{
    res.send('hello from simple signup ')
 
 });

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log('server is running at port ',PORT);
})

// notification implementation using soket

/* something about socket 
   at client side:
       to send event to server->use socket.emit
       to take event from server ->use socket.on
   
   at server side:
       to send event to client-> use io 
            use io.emit = to send every client 
            use io.to(socketId).emit=  to send one client event


*/
// const PORT2 = process.env.PORT2;
// const io = new Server({ 
//     cors:{
//         origin: "http://localhost:3000",
//     },
// });

//       let employee=[];
//       const addEmployee =(empId,firstName,lastName,postingDate,socketId)=>{
//           !employee.some((emp)=>emp.empId===empId) && 
//           employee.push({empId,firstName,lastName,postingDate,socketId});
//       }

//       const removeEmployee =(socketId)=>{
//           employee=employee.filter((emp)=>emp.socketId !== socketId);
//       }
      
//       const getEmployee =(empId)=>{
//           return employee.find((emp)=>emp.empId === empId)
//       }




// io.on("connection", (socket) => {
//      socket.on("employee", (empId,firstName,lastName,postingDate)=>{
//          addEmployee(empId,firstName,lastName,postingDate,socket.id)
//      })
//     //  console.log(employee);

// //   console.log("someone has connected to socket");
// //   io.emit("firstevent","hello this my test");
      
  
//   socket.on("disconnect", () => {
//     //   console.log("Someone has left");
//     removeEmployee(socket.id);
//   })
// });

// io.listen(PORT2);






