import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import { GlobalStyle } from "./globalStyles";

import MinimalLayout from "./layouts/MinimalLayout";
import Controller from "./pages/Controller";
import Overlay from "./pages/Overlay";

function App() {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<MinimalLayout />}>
            <Route index element={<Controller />} />
            <Route path="controller" element={<Controller />} />
            <Route path="overlay/:room" element={<Overlay />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;