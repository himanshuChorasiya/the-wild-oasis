


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Booking from "./pages/Booking"
import Cabin from "./pages/Cabin"
import User from "./pages/Users"
import Setting from "./pages/Settings"
import Account from "./pages/Account"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import GlobalStyle from "./styles/GlobalStyle"
import AppLayout from "./ui/AppLayout"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Toaster} from "react-hot-toast"
import Checkin from "./pages/checkin"
import ProtectedRoute from "./ui/ProtectedRoute"
import { DarkModeProvider } from "./context/DarkModeContext"

//configure ReactQuery
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:60*1000,
    },
  },
});


function App() {
  
  return (
  <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
        <Route element={
        <ProtectedRoute>
          <AppLayout/>
        </ProtectedRoute>
      }>
        <Route index element={<Navigate replace to="dashboard"/>}/> 
        <Route path="dashboard" element={<Dashboard/>}/> 
        <Route path="bookings" element={<Bookings/>}/>
        <Route path="bookings/:bookingId" element={<Booking/>}/>
        <Route path="checkin/:bookingId" element={<Checkin/>}/>
        <Route path="cabins" element={<Cabin/>}/>
        <Route path="users" element={<User/>}/> 
        <Route path="settings" element={<Setting/>}/>
        <Route path="account" element={<Account/>}/>  
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
      
      <Toaster
         position="top-center"
         gutter={12}
         containerStyle={{margin:"8px"}}
         toastOptions={{
          success:{
            duration:3000,
          },
          error:{
            duration:4000,
          },
          style:{
            fontSize:"16Px",
            maxWidth:"500px",
            padding:"16px 24px",
            backgroundColor:'var(--color-grey-0)',
            color:'var(--color-grey-700)',

          }
         }}
      />
    </QueryClientProvider>
    </DarkModeProvider>   
  )
}

export default App
