import { fichaRoomingList } from '../../initials/projeto/roomingList';

const initialState = {
  fichaData: fichaRoomingList,
  hos_tipo: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_ROOMINGLIST_FICHA': return { ...state, fichaData: actions.payload };
    case '@SET_ROOMINGLIST_HOS_TIPO': return { ...state, hos_tipo: actions.payload };

    case '@RESET_ROOMINGLIST_FICHA': return {
      ...state,
      fichaData: fichaRoomingList,
      hos_tipo: 0,
    };

    default: return state;
  }
}
