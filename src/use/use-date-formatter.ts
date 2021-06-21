export default function useDateFormatter(temp):string {
  console.log(temp);
  const dateTime = new Date(temp);
  const date = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
  const altTime = dateTime.toLocaleTimeString();
  return `${date} | ${altTime}`;
}
