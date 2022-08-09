import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Split from "react-split";
import DataTable from "./components/Table/Table";
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
      <Provider store={store}>
        <Split
            className="split"
            sizes={[50, 50]}
            gutterSize={10}
        >
          <DataTable />
          <Map />
        </Split>
      </Provider>
  );
}

export default App;
