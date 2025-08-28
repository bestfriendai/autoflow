import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { WorkOrders } from './pages/WorkOrders'
import { WorkOrderDetail } from './pages/WorkOrderDetail'
import { Inspections } from './pages/Inspections'
import { InspectionDetail } from './pages/InspectionDetail'
import { Customers } from './pages/Customers'
import { CustomerDetail } from './pages/CustomerDetail'
import { Parts } from './pages/Parts'
import { Warranty } from './pages/Warranty'
import { Settings } from './pages/Settings'
import { CustomerPortal } from './pages/CustomerPortal'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Pricing } from './pages/Pricing'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground dark">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/portal/:workOrderId" element={<CustomerPortal />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/inspections/:id" element={<InspectionDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App