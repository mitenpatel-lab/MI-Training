import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import Register from "./pages/Register";
import LoginUI from "./pages/LoginUI";
import UserLayout from "./pages/UserLayout";
import BookingForm from "./pages/BookingForm";
import TicketList from "./pages/TicketList";
import TicketUI from "./pages/TicketUI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<LoginUI />} >

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          element={
            <ProtectedUserRoute>
              <Outlet />
            </ProtectedUserRoute>
          }
        >

          <Route path="/index/" element={<UserLayout />}>
            <Route index element={<FlightFinder />} />
            <Route path="ticket" element={<TicketUI />} >
              <Route index element={<TicketList />} />

              <Route path=":flight_id" element={<BookingForm />} />

              <Route path="details/:ticket_id" element={<BookingForm />} />

            </Route>

          </Route>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="flight" element={<Flight />}>
              <Route index element={<FlightList />} />
              <Route path="addflight" element={<AddFlight />} />
              <Route path="addflight/:id" element={<AddFlight />} />
            </Route>

            <Route path="airline" element={<Airline />}>
              <Route index element={<AirlineList />} />
              <Route path="addairline" element={<AddAirline />} />
              <Route path="addairline/:id" element={<AddAirline />} />
            </Route>

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
