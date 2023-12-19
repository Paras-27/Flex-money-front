const month = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth();
  return monthNames[month];
};

const year = () => {
  const today = new Date();
  const val = today.getFullYear();
  return val;
};

export { month, year };
