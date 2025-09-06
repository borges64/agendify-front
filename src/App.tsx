// src/App.tsx
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./pages/Auth/login/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard/DashboardLayout";
import NotFoundPage from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserType } from "./utils/allInterfaces";
import { DashboardRouter } from "./pages/Dashboard/DashboardRouter";
import AppointmentsList from "./pages/Appointments/Appointments";
import Support from "./pages/Support/Suporte";
import { NotificationProvider } from "./components/NotifyComponent/notifcationContext";
import { Register } from "./pages/Register/Register";

// Importe o NotificationProvider

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  console.log(user);
  const location = useLocation();

  const shouldShowHeaderAndFooter =
    location.pathname.startsWith("/dashboard") &&
    location.pathname !== "/login" &&
    location.pathname !== "/404";

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Inicializando Aplicação...
      </div>
    );
  }

  return (
    <>
      {/* Envolve o header, as rotas e o footer com o provedor de notificação */}
      <NotificationProvider>
        {shouldShowHeaderAndFooter && <Header />}

        <Routes>
          {/* PAGINAS SEM PROTEÇÃO */}
          <Route path="/login" element={<Login />} />
          <Route path="/suporte" element={<Support />} />
          <Route path="/register" element={<Register/> } />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardRouter />} />

              {(user?.type === UserType.ADMIN || user?.type === UserType.EMPLOYEE) && (
                <>
                  <Route path="agendamentos" element={<AppointmentsList />} />
                </>
              )}

              {user?.type === UserType.ADMIN && (
                <>
                </>
              )}

              {user?.type === UserType.PATIENT && (
                <>
                </>
              )}

              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>

          </Route>

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {shouldShowHeaderAndFooter && <Footer />}
      </NotificationProvider>
    </>
  );
}

export default App;