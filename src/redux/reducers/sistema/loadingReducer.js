const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_LOADING_ON': return { isLoading: true };
    case '@SET_LOADING_OFF': return { isLoading: false };
    default: return state;
  }
}
