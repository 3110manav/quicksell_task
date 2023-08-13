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
  const allPriority = new Set(
    tickets.map((item) => item.priority).sort((a, b) => b - a)
  );
  let data = [];
  if (grouping == "status") {
    allStatus.forEach((status) => {
      data.push({
        title: status,
        tickets:
          priority == "priority"
            ? tickets
                .filter((ticket) => ticket.status == status)
                .sort((a, b) => b.priority - a.priority)
            : titleSort(tickets.filter((ticket) => ticket.status == status)),
      });
    });
  }
  if (grouping == "priority") {
    allPriority.forEach((priority) => {
      data.push({
        title: priorityMapper[priority],
        tickets:
          priority == "priority"
            ? tickets.filter((ticket) => ticket.priority == priority)
            : titleSort(
                tickets.filter((ticket) => ticket.priority == priority)
              ),
      });
    });
  }
  if (grouping == "user") {
    allUsers.forEach((all_user, key) => {
      data.push({
        title: users.filter((user) => {
          if (user.id == all_user) {
            return user.name;
          }
        })[0].name,
        tickets:
          priority == "priority"
            ? tickets
                .filter((ticket) => ticket.userId == all_user).sort((a, b) => b.priority - a.priority)
            : titleSort(tickets.filter((ticket) => ticket.userId == all_user)),
      });
    });
  }
  console.log(grouping,priority,data);
  return data;
};

export default ticketMapper;
