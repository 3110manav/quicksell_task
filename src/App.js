import "./App.css";
import Loader from "./components/Loader/Loader";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/Header/NavBar";
import CatagoryTable from "./components/CatagoryTable/CatagoryTable";
import { useEffect, useState } from "react";
import ticketMapper from "./common/ticketMapper.js";

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

  const [ticket, setTicket] = useState([]); //TICKETS
  const [user, setUser] = useState([]); //USERS
  const [finalData, setFinalData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://apimocha.com/quicksell/data");
      const jsonData = await response.json();
      setTicket(jsonData.tickets);
      setUser(jsonData.users);
    } catch (error) {
      // You reached the limit of the free tier limit for today(1,000 requests in a rolling 24hr period).
      console.log("Error in fetching data from API:", error);
      console.log("Due to this reason using hard coded data");

      // using hard coded data since i am out of api request
      const response = data;
      setTicket(response.tickets);
      setUser(response.users);
    }
  };

  useEffect(() => {
    if (ticket.length == 0 || user.length == 0) {
      fetchData();
    }
  }, []);

  //INITIALL WHEN THE DATA IS LOADED
  useEffect(() => {
    const groupBy = localStorage.getItem("groupBy") || undefined; //UNDEFINED BECAUSE WE HAVE BY DEFAULT SET GROUPBY TO STATUS IN tickitmaper
    const sortBy = localStorage.getItem("sortBy") || undefined; //UNDEFINED BECAUSE WE HAVE BY DEFAULT SET SORTBY TO PRIORITY IN tickitmaper
    setFinalData(
      ticketMapper({
        tickets: ticket,
        users: user,
        grouping: groupBy,
        priority: sortBy,
      })
    );
  }, [ticket, user]);

  const handleChange = (groupBy, sortBy) => {
    setFinalData(
      ticketMapper({
        tickets: ticket,
        users: user,
        grouping: groupBy,
        priority: sortBy,
      })
    );
  };

  if (finalData.length == 0) {
    return <><Loader/></>;
  }
  return (
    <div className="App">
      <NavBar onHandelChange={handleChange} />
      <CatagoryTable catagoryData={finalData} />
    </div>
  );
}

export default App;
