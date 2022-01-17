import banner from '../../../assets/img/ventu/banner_default.jpg';

const initialState = {
  step: 1,
  id_pfisica: 0,
  banner,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@HOTSITE_PARTICIPANTE_ID_PFISICA': return { ...state, id_pfisica: actions.payload };
    case '@HOTSITE_PARTICIPANTE_STEP': return { ...state, step: actions.payload };
    case '@HOTSITE_BANNER': return { ...state, banner: actions.payload };

    default: return state;
  }
}
