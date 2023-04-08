import Readit from "./readit";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import { Provider } from "react-redux";
import store from './redux/store';

function App() {
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <div className="container">
        <Routes>
            <Route index element={<Readit/>}/>
            <Route path="/readit/*" element={<Readit/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  );
}
export default App;
