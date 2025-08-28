import { type ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Badge } from './badge'
import { 
  Car, 
  LayoutDashboard, 
  Wrench, 
  Camera, 
  Users, 
  ShoppingCart, 
  Shield, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Work Orders', href: '/work-orders', icon: Wrench, badge: '3' },
    { name: 'Inspections', href: '/inspections', icon: Camera },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Parts', href: '/parts', icon: ShoppingCart, badge: '2' },
    { name: 'Warranty', href: '/warranty', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-automotive-black via-automotive-darkGray to-automotive-black">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40 md:hidden">
            <motion.div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.div 
              className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-automotive-black to-automotive-darkGray border-r border-automotive-red/20"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <motion.button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-automotive-red bg-automotive-red/20 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <motion.div 
                  className="flex-shrink-0 flex items-center px-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Car className="h-8 w-8 text-automotive-red" />
                  </motion.div>
                  <span className="ml-2 text-xl font-bold text-white">AutoFlow</span>
                </motion.div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={`group flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                          location.pathname === item.href
                            ? 'bg-gradient-to-r from-automotive-red to-automotive-orange text-white shadow-lg shadow-automotive-red/30'
                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:shadow-lg hover:shadow-automotive-red/20'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="mr-4 h-6 w-6" />
                        </motion.div>
                        {item.name}
                        {item.badge && (
                          <motion.div
                            className="ml-auto"
                            whileHover={{ scale: 1.1 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                          >
                            <Badge variant="urgent" className="animate-pulse">
                              {item.badge}
                            </Badge>
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <motion.div 
          className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-automotive-black to-automotive-darkGray border-r border-automotive-red/20 backdrop-blur-sm"
          initial={{ x: -264 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <motion.div 
              className="flex items-center flex-shrink-0 px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.1 }}
              >
                <Car className="h-8 w-8 text-automotive-red" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-white">AutoFlow</span>
            </motion.div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      location.pathname === item.href
                        ? 'bg-gradient-to-r from-automotive-red to-automotive-orange text-white shadow-lg shadow-automotive-red/30'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:shadow-lg hover:shadow-automotive-red/20'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                    </motion.div>
                    {item.name}
                    {item.badge && (
                      <motion.div
                        className="ml-auto"
                        whileHover={{ scale: 1.1 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      >
                        <Badge variant="urgent" className="animate-pulse">
                          {item.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gradient-to-r from-automotive-black/90 to-automotive-darkGray/90 backdrop-blur-sm">
          <motion.button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-automotive-red focus:outline-none focus:ring-2 focus:ring-automotive-red bg-gray-800/50"
            onClick={() => setSidebarOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Top navigation */}
        <motion.div 
          className="bg-gradient-to-r from-automotive-black/90 to-automotive-darkGray/90 backdrop-blur-sm border-b border-automotive-red/20"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 md:hidden">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Car className="h-8 w-8 text-automotive-red" />
                  </motion.div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-600/50 rounded-lg bg-gray-900/50 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-automotive-red backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-automotive-red relative">
                    <Bell className="h-5 w-5" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-automotive-red rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-automotive-red">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page content */}
        <motion.main 
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}