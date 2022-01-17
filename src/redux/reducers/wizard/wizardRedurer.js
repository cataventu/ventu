const initialState = {
  step: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// FICHA
    case '@STEP_CLICK': return { ...state, step: actions.payload };
    case '@RESET_STEP': return { ...state, step: 0 };

    default: return state;
  }
}
