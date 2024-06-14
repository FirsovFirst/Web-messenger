import React from "react";
import { Route, Routes } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./hoc/RequireAuth"
import { ConnectionProvider } from "./hoc/ConnectionProvider";
import { ChatPage } from "./pages/chat/ChatPage";

function App() {
  return (
    <main className="App">
      <ConnectionProvider>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <ChatPage/>
            </RequireAuth>
          }/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
        </Routes>
      </ConnectionProvider>
    </main>
  );
}

export default App;
