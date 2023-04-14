import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import store from "./redux/store";
import { Provider } from "react-redux";
import Readit from "./readit";
import Details from "./readit/details/comments";
function App() {
    return (
        <Provider store={store}>
            <div className="container-fluid">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Readit />} />
                        <Route path="/readit/*" element={<Readit/>}/>

                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
