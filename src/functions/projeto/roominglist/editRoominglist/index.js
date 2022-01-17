const editRoominglist = async (props, projeto, roominglist) => {
  const page = `/projeto/painel/${projeto}/rooming-list/ficha/${roominglist}`;
  props.history.push(page);
};

export default editRoominglist;
