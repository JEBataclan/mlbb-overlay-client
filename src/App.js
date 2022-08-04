import {
  BrowserRouter,
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MinimalLayout />}>
            <Route index element={<Controller />} />
            <Route path="controller" element={<Controller />} />
            <Route path="overlay/:room" element={<Overlay />} />
          </Route>
        </Routes>
      </BrowserRouter></>
  );
}

export default App;