import { Provider } from "react-redux";
import { Body } from "./components/Body";
import appStore from "./utils/appStore";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <Provider store={appStore}>
    <Body />
    <ToastContainer/>
    </Provider>
     
  );
}

export default App;
