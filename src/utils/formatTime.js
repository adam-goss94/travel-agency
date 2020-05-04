export const formatTime = (countDown) => {
  if(countDown == undefined || isNaN(countDown) || countDown < 0){
    return null;
  } else{
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    seconds = (seconds + Math.floor(countDown % 60) + '').padStart(2, '0');
    minutes = (minutes + Math.floor((countDown / 60) % 60) + '').padStart(2, '0');
    hours = (hours + Math.floor(countDown / 3600 ) + '').padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds;
  }
};
