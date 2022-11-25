import "./App.css";
import Main from "components/pages/main/Main";
import { Provider } from "react-redux";
import { store } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
