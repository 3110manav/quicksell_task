export const priorityMapper = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No",
};

const titleSort = (tickets) => {
  // ref - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  return tickets.sort((a, b) => {
    let title_a = a.title.toLowerCase();
    let title_b = b.title.toLowerCase();
    if (title_a < title_b) {
      return -1;
    }
    if (title_a > title_b) {
      return 1;
    }
    return 0;
  });
};

const ticketMapper = ({
  tickets,
  users,
  grouping = "status",
  priority = "priority",
}) => {
  const allStatus = new Set(tickets.map((item) => item.status));
  const allUsers = new Set(tickets.map((item) => item.userId));
  const allPriority = new Set(tickets.map((item) => item.priority).sort((a, b) => b - a));

  let data = [];

  //WHEN GROUPING BY STATUS 
  if (grouping == "status") {
    allStatus.forEach((status) => {
      data.push({
        title: status,                 //WE SORT THE TABLES BY 'STATUS' - SO TITLE 
        tickets:
          priority == "priority"
            ? tickets
                .filter((ticket) => ticket.status == status)      // WE PUSH ENTIRE TICKIT WHOSE STATUS MATCHES THE SELECTED STATUS BY THE USER 
                .sort((a, b) => b.priority - a.priority)          // SORTING THEM BY PRIORITY BY DEFAULT 
            : titleSort(tickets.filter((ticket) => ticket.status == status)),     // IF SORTING BY TITLE IS SELECTED THEN WE CALL 'TITLESORT' AND SORT ACC TO TITLE
      });
    });
  }
  if (grouping == "priority") {
    allPriority.forEach((priority) => {
      data.push({
        title: priorityMapper[priority],              //WE SORT THE TABLES BY 'PRIORITY' - SO TITLE 
        tickets:
          priority == "priority"
            ? tickets.filter((ticket) => ticket.priority == priority)            // WE PUSH ENTIRE TICKIT WHOSE PRIORITY MATCHES THE SELECTED PRIORITY BY THE USER
            : titleSort(
                tickets.filter((ticket) => ticket.priority == priority)          // IF SORTING BY TITLE IS SELECTED THEN WE CALL 'TITLESORT' AND SORT ACC TO TITLE 
              ),
      });
    });
  }
  if (grouping == "user") {
    allUsers.forEach((all_user) => {
      data.push({
        title: users.filter((user) => {                //WE SORT THE TABLES BY 'USERS' - SO TITLE 
          if (user.id == all_user) {
            return user.name;                         //EXTRACTING THE NAME OF THE USER FROM THE USER ID
          }
        })[0].name,                                   //RETURNING AN ARRAY WHOSE FIRST INDEX HAS NAME OF THE USER
        tickets:
          priority == "priority"
            ? tickets
                .filter((ticket) => ticket.userId == all_user).sort((a, b) => b.priority - a.priority)
            : titleSort(tickets.filter((ticket) => ticket.userId == all_user)),
      });
    });
  }
  console.log(grouping,priority,data);
  return data;                                       //RETURNING DATA ACC TO USERS SELECTION 
};

export default ticketMapper;
