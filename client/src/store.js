import { createStore } from 'redux';
import regionReducer from './regionReducer';

const store = createStore(regionReducer);
const SET_SELECTED_REGION = 'SET_SELECTED_REGION';

export const setSelectedRegion = (regionName) => ({
  type: SET_SELECTED_REGION,
  payload: regionName
});

export default store;