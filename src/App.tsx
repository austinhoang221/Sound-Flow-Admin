import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Login } from "./pages/authenticate/login";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/">
          <Route>
            <Route path="/" element={<Navigate to="/home" replace />} />
            {/* Children */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
