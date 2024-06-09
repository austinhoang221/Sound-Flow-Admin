import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { PrivateRoute } from "./hoc/privateRoute";
import { Login } from "./pages/authenticate/login/login";
import { Album } from "./pages/content/album/album";
import { Content } from "./pages/content/content";
import { Genre } from "./pages/content/genre/genre";
import { Home } from "./pages/content/home/home";
import { Tracks } from "./pages/content/tracks/tracks";
import { User } from "./pages/content/user/user";

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
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/album" element={<Album />} />
              <Route path="/album/:configType" element={<Album />} />
              <Route path="/album/:configType/:id" element={<Album />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
