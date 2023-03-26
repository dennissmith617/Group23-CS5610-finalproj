import Readit from "./readit";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
           <Route index element={<Readit/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
