import "./App.css";
import Main from "components/pages/main/Main";
import { Provider } from "react-redux";
import { persistor, store } from "store/store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
