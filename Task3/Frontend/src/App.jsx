import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/Auth";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
