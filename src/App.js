import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import store from "./redux/store";
import { Provider } from "react-redux";
import Readit from "./readit";
import CurrentUserContext from "./readit/components/current-user-context";
function App() {
    return (
        <Provider store={store}>
            <CurrentUserContext >
            <div className="container-fluid">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Readit />} />
                        <Route path="/readit/*" element={<Readit/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            </CurrentUserContext>
        </Provider>
    );
}

export default App;
