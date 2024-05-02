import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { PrivateRoute } from "./hoc/privateRoute";
import { Login } from "./pages/authenticate/login";
import { Content } from "./pages/content/content";
import { Home } from "./pages/content/home/home";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        >
          <Route path="/">
            <Route>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />

              {/* Children */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
