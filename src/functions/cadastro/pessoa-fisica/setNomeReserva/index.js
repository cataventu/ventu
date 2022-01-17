const setNomeReserva = (value) => {
  const nome = value;
  const array = nome.split(' ');
  let reserva = `${array[array.length - 1]}/${array[0]}`;
  if (array[array.length - 1] === '') {
    reserva = `${array[array.length - 2]}/${array[0]}`;
  }
  return reserva;
};

export default setNomeReserva;
