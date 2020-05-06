export const formatDays = days => {
  if(!isNaN(days) && days > 0){
    return (days == 1 ? days + ' day to summer!' : days + ' days to summer!');
  } else {
    return null;
  }
};
