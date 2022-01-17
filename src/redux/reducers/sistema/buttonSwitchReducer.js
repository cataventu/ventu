const initialState = {
  switchChecked: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_SWITCH_CHECKED_TRUE': return { ...state, switchChecked: true };
    case '@SET_SWITCH_CHECKED_FALSE': return { ...state, switchChecked: false };

    default: return state;
  }
}
