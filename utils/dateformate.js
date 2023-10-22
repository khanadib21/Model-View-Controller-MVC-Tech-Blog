module.exports = {
  format_date: (date) => {
    const newDate = new Date(date);
    const newFormattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
    const newHours = newDate.getHours().toString().padStart(2, '0');
    const newMinutes = newDate.getMinutes().toString().padStart(2, '0');
    const newFormattedTime = `${newHours}:${newMinutes}`;

    return `${newFormattedDate} at ${newFormattedTime}`;
  },
};
