import { put, takeLatest } from 'redux-saga/effects';
import {setRequests, setMarkers, setActiveRoute} from "./slice";
import requests from '../mocks/requests.json';
import markers from '../mocks/markers.json';

function* getRequests() {
  try {
    const data = requests;
    yield put(setRequests(data));
    yield put(setActiveRoute(data[0]))
  } catch (e) {
    console.error(e);
  }
}

function* getMarkers() {
  try {
    const data = markers;
    yield put(setMarkers(data));
  } catch (e) {
    console.log(e);
  }
}


function* saga() {
  yield takeLatest("main/getRequests", getRequests);
  yield takeLatest("main/getMarkers", getMarkers);
}

export default saga;