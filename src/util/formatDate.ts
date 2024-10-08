export function formatDate(date?: Date | string) {
  if (!date) {
    date = new Date();
  } else if (typeof date === 'string') {
    date = new Date(date);
  }
  const hour = date.getHours();
  const min = date.getMinutes();

  const indicator = hour >= 12 ? 'PM' : 'AM';

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${min} ${indicator}`,
  };
}
