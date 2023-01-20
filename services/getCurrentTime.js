const getMonth = (month) => {
  switch (month) {
    case 0:
      return "Січня";
    case 1:
      return "Лютого";
    case 2:
      return "Березня";
    case 3:
      return "Квітня";
    case 4:
      return "Травня";
    case 5:
      return "Червня";
    case 6:
      return "Липня";
    case 7:
      return "Серпня";
    case 8:
      return "Вересня";
    case 9:
      return "Жовтня";
    case 10:
      return "Листопада";
    case 11:
      return "Лютого";
  }
};

const getCurrentTime = (unixTime) => {
  const date = new Date(Number(unixTime));
  const month = getMonth(date.getMonth());
  const day = date.getDay();
  const year = date.getUTCFullYear();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const formattedTime =
    day + " " + month + ", " + year + " | " + hours + ":" + minutes;
  return formattedTime;
};

export default getCurrentTime;
