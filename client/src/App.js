import React from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css'
import ChatRoom from "./components/ChatRoom"
import Login from './components/Login'
import AuthProvider from "./context/AuthProvider"
import AppProvider from './context/AppProvider'
import InviteMemberModal from "./components/ChatWindow/partials/InviteMemberModal"

function App() {
  return <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route element={<Login />} path='/login' />
          <Route element={<ChatRoom />} path='/' />
        </Routes>
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App
