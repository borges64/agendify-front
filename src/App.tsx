// src/App.tsx
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./pages/Auth/login/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard/DashboardLayout"; // Seu DashboardLayout
import NotFoundPage from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserType } from "./utils/allInterfaces"; // Importe o enum UserType

// Importe o novo DashboardRouter
import { DashboardRouter } from "./pages/Dashboard/DashboardRouter";

// Importe suas páginas de funcionalidade comum (elas ainda serão usadas como sub-rotas)
import AppointmentsList from "./pages/Appointments/Appointments";
// import CalendarPage from "./pages/Calendar/CalendarPage";
// import ClientsPage from "./pages/Clients/ClientsPage";a
import Support from "./pages/Support/Suporte";

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  console.log(user)
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
      {shouldShowHeaderAndFooter && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Adicionando a rota de Suporte fora do ProtectedRoute */}
        <Route path="/suporte" element={<Support />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* ALTERADO: Apenas uma Route index que aponta para o DashboardRouter */}
            <Route index element={<DashboardRouter />} />

            {/* Rotas Comuns para Admin e Employee */}
            {(user?.type === UserType.ADMIN || user?.type === UserType.EMPLOYEE) && (
              <>
                <Route path="agendamentos" element={<AppointmentsList />} />
                {/* <Route path="calendario" element={<CalendarPage />} />
                <Route path="clientes" element={<ClientsPage />} /> */}
              </>
            )}

            {/* Rotas Específicas do Admin (se houver e não forem a index) */}
            {user?.type === UserType.ADMIN && (
              <>
                {/* Exemplo: <Route path="gerenciar-usuarios" element={<ManageUsersPage />} /> */}
              </>
            )}

            {/* Rotas Específicas do Paciente (se houver e não forem a index) */}
            {user?.type === UserType.PATIENT && (
              <>
                {/* Exemplo: <Route path="meus-agendamentos" element={<PatientAppointmentsPage />} /> */}
              </>
            )}

            {/* Fallback para tipos de usuário não tratados ou caminhos inválidos dentro de /dashboard */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>

          {/* Outras rotas protegidas que não usam o DashboardLayout (se houver) */}
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
    </>
  );
}

export default App;