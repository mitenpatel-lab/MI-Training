import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import FlightFinder from "./pages/FlightFinder";
import AdminLayout from "./pages/AdminLayout";
import AddFlight from "./pages/AddFlight";
import AddAirline from "./pages/AddAirline";
import FlightList from "./pages/FlightList";
import AirlineList from './pages/AirlineList';
import Flight from "./pages/Flight";
import Airline from "./pages/Airline";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/index"
          element={
            <ProtectedUserRoute>
              <FlightFinder />
            </ProtectedUserRoute>
          }
        />


        <Route path="/admin" element={<AdminLayout />} >
          <Route path="flight" element={<Flight />}>
            <Route index element={<FlightList />} />
            <Route path="addflight" element={<AddFlight />} />
            <Route path="addflight/:id" element={<AddFlight />} />

          </Route>
          <Route path="airline" element={<Airline />}>
            <Route index element={<AirlineList />} />
            <Route path="addairline" element={<AddAirline />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter >
  );
}
