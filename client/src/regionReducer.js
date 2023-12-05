const initialState = {
    selectedRegion: ""
  };
  
  function regionReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_REGION':
        return { ...state, selectedRegion: action.payload };
      default:
        return state;
    }
  }
  
  export default regionReducer;
  