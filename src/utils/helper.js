export function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let formattedHours = hours.toString().padStart(2, '0');
  let formattedMinutes = minutes.toString().padStart(2, '0');
  let formattedSeconds = seconds.toString().padStart(2, '0');

  if (minutes >= 60) {
    formattedHours = '60';
    formattedMinutes = '00';
    formattedSeconds = '00';
  }

  const formattedDuration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedDuration;
}

export const formatTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Format waktu dengan menambahkan angka 0 di depan jika nilainya kurang dari 10
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const convert12HourTo24Hour = (time12h) => {
  let [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'pm' && hours < 11) {
    hours = +hours + 12;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
};
