import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from './components/Header/NavBar';
import CatagoryTable from './components/CatagoryTable/CatagoryTable';
import {useEffect, useState} from 'react';
import ticketMapper from './common/ticketMapper.js'

function App() {
  const data = {
    tickets: [
      {
        id: "CAM-1",
        title: "Update User Profile Page UI",
        tag: ["Feature request"],
        userId: "usr-1",
        status: "Todo",
        priority: 4,
      },
      {
        id: "CAM-2",
        title:
          "Add Multi-Language Support - Enable multi-language support within the application.",
        tag: ["Feature Request"],
        userId: "usr-2",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-3",
        title: "Optimize Database Queries for Performance",
        tag: ["Feature Request"],
        userId: "usr-2",
        status: "In progress",
        priority: 1,
      },
      {
        id: "CAM-4",
        title: "Implement Email Notification System",
        tag: ["Feature Request"],
        userId: "usr-1",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-5",
        title: "Enhance Search Functionality",
        tag: ["Feature Request"],
        userId: "usr-5",
        status: "In progress",
        priority: 0,
      },
      {
        id: "CAM-6",
        title: "Third-Party Payment Gateway",
        tag: ["Feature Request"],
        userId: "usr-2",
        status: "Todo",
        priority: 1,
      },
      {
        id: "CAM-7",
        title: "Create Onboarding Tutorial for New Users",
        tag: ["Feature Request"],
        userId: "usr-1",
        status: "Backlog",
        priority: 2,
      },
      {
        id: "CAM-8",
        title: "Implement Role-Based Access Control (RBAC)",
        tag: ["Feature Request"],
        userId: "usr-3",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-9",
        title: "Upgrade Server Infrastructure",
        tag: ["Feature Request"],
        userId: "usr-5",
        status: "Todo",
        priority: 2,
      },
      {
        id: "CAM-10",
        title: "Conduct Security Vulnerability Assessment",
        tag: ["Feature Request"],
        userId: "usr-4",
        status: "Backlog",
        priority: 1,
      },
      {
        id: "CAM-10",
        title: "Conduct Security Vulnerability Assessment",
        tag: ["Feature Request"],
        userId: "usr-4",
        status: "Backlog",
        priority: 1,
      },
    ],
    users: [
      {
        id: "usr-1",
        name: "Anoop sharma",
        available: false,
      },
      {
        id: "usr-2",
        name: "Yogesh",
        available: true,
      },
      {
        id: "usr-3",
        name: "Shankar Kumar",
        available: true,
      },
      {
        id: "usr-4",
        name: "Ramesh",
        available: true,
      },
      {
        id: "usr-5",
        name: "Suresh",
        available: true,
      },
    ],
  };
  
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [status, setStatus] = useState(new Set());
const [user, setUser] = useState(new Set());
const [finalData,setFinalData] = useState([])

const fetchData = async () => {
  try {
    const response = await fetch('https://apimocha.com/quicksell/data');
    const jsonData = await response.json();
    setData1(jsonData.tickets);
    setData2(jsonData.users);
    
  } catch (error) {
    // You reached the limit of the free tier limit for today(1,000 requests in a rolling 24hr period).
    console.log('Error in fetching data from API:',error);
    
    // using hard coded data since i am out of api request
    const response = data
    setData1(response.tickets);
    setData2(response.users);
  }
};

useEffect(()=>{
  if(data1.length == 0 || data2.length == 0){
    fetchData();
  }
},[])

useEffect(()=>{
  const groupBy = localStorage.getItem('groupBy') || undefined
  const sortBy = localStorage.getItem('sortBy') || undefined
  setFinalData(ticketMapper({ tickets: data1, users: data2,grouping:groupBy,priority:sortBy }))
},[data1,data2])

const handleChange = (groupBy,sortBy) => {
  setFinalData(ticketMapper({ tickets: data1, users: data2,grouping:groupBy,priority:sortBy }))
}
  return (
    <div className="App">
    <NavBar onChange={handleChange}/>
    <CatagoryTable  catagoryData = {finalData}/>
    </div>
    
  );
}

export default App;
