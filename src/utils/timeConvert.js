export const PTtocolConvert = (duration) => {
  if(duration==undefined)
  return
  const regex = /P(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?/;
  const match = duration.match(regex);
  if (!match) return "0:00:00"; // Return zero duration in H:M:S format

  const parts = match[0]
    .slice(1)
    .split(/[PTHMS]/)
    .filter(Boolean);
  
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
    seconds = parseInt(parts[2], 10);
  } else if (parts.length === 2) {
    minutes = parseInt(parts[0], 10);
    seconds = parseInt(parts[1], 10);
  } else if (parts.length === 1) {
    seconds = parseInt(parts[0], 10);
  }

  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return hours > 0 ? `${hours}:${timeString}` : timeString;
}

export const formatDate=function(inputDate) {
  if(inputDate==undefined)
  return
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export const formatTimetohour=function(input) {
  if(input==undefined)return
  const arr = input.match(/\d+/g).map(Number);
  if(arr.length==3){
    return arr[0] + ' hours   ' + arr[1]+ 'mins'
  }
  else{
    return arr[0] + ' mins'
  }
}

