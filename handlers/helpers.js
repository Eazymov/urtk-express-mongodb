exports.getFormattedDate = () => {
  const date = new Date();

  const D = to2(date.getDate());
  const M = to2(date.getMonth() + 1);
  const Y = date.getFullYear();

  return `${D}-${M}-${Y}`;
}

exports.getFormattedTime = () => {
  const date = new Date();

  const S = to2(date.getSeconds());
  const M = to2(date.getMinutes());
  const H = to2(date.getHours());

  return `${H}:${M}:${S}`;
}

function to2(number) {
  return number < 10 ? `0${number}` : number;
}
