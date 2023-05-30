import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import RequireAuth from "./components/RequireAuth";
import NoMatch from "./components/NoMatch";
import Game from "./pages/Game";
import { AuthProvider } from "./context/AuthProvider";

import "./App.css";
import Signup from "./pages/Signup";
import MultiplayerGame from "./pages/MultiplayerGame";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Menu />} />
              <Route path="/game" element={<Game />} />
              <Route path="/multiplayer" element={<MultiplayerGame />} />
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
