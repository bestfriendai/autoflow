import { Layout } from '@/components/ui/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  Wrench, 
  Users, 
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Car,
  Plus
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function Dashboard() {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$3,247",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      description: "vs yesterday"
    },
    {
      title: "Active Work Orders",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Wrench,
      description: "in progress"
    },
    {
      title: "Bay Utilization",
      value: "85%",
      change: "-5%",
      trend: "down",
      icon: Car,
      description: "6 of 7 bays occupied"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Users,
      description: "average rating"
    }
  ]

  const recentWorkOrders = [
    {
      id: "WO-2024-001",
      customer: "John Smith",
      vehicle: "2020 Honda Civic",
      service: "Oil Change & Inspection",
      status: "in_progress",
      bay: "Bay 2",
      estimatedCompletion: new Date("2024-08-19T16:30:00"),
      totalCost: 89.99
    },
    {
      id: "WO-2024-002", 
      customer: "Sarah Johnson",
      vehicle: "2018 Ford F-150",
      service: "Brake Repair",
      status: "awaiting_approval",
      bay: null,
      estimatedCompletion: new Date("2024-08-20T10:00:00"),
      totalCost: 425.00
    },
    {
      id: "WO-2024-003",
      customer: "Mike Rodriguez",
      vehicle: "2019 Toyota Camry",
      service: "Engine Diagnostic", 
      status: "completed",
      bay: "Bay 1",
      estimatedCompletion: new Date("2024-08-19T14:00:00"),
      totalCost: 150.00
    },
    {
      id: "WO-2024-004",
      customer: "Lisa Chen",
      vehicle: "2021 Subaru Outback",
      service: "Transmission Service",
      status: "pending",
      bay: null,
      estimatedCompletion: new Date("2024-08-20T08:00:00"),
      totalCost: 275.00
    }
  ]

  const upcomingAppointments = [
    {
      time: "9:00 AM",
      customer: "David Wilson",
      vehicle: "2017 BMW 320i",
      service: "Annual Inspection",
      phone: "(555) 123-4567"
    },
    {
      time: "11:30 AM",
      customer: "Amy Thompson",
      vehicle: "2019 Mercedes C300",
      service: "Oil Change",
      phone: "(555) 987-6543"
    },
    {
      time: "2:00 PM",
      customer: "Robert Davis",
      vehicle: "2020 Audi A4",
      service: "Brake Inspection",
      phone: "(555) 456-7890"
    }
  ]

  const alerts = [
    {
      type: "warning",
      message: "Low inventory: Brake pads (2 sets remaining)",
      action: "Order Parts"
    },
    {
      type: "info", 
      message: "Work Order WO-2024-002 awaiting customer approval",
      action: "Follow Up"
    },
    {
      type: "success",
      message: "Monthly revenue target achieved (102%)",
      action: "View Report"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "warning" as const, label: "Pending" },
      in_progress: { variant: "info" as const, label: "In Progress" },
      awaiting_approval: { variant: "warning" as const, label: "Awaiting Approval" },
      completed: { variant: "success" as const, label: "Completed" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" }
    }
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your shop today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Work Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Work Orders</CardTitle>
                    <CardDescription>Latest vehicle services and repairs</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Work Order
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWorkOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          {getStatusBadge(order.status)}
                          {order.bay && (
                            <Badge variant="outline">{order.bay}</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="font-medium">{order.customer}</div>
                          <div>{order.vehicle} • {order.service}</div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Due: {formatDate(order.estimatedCompletion)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(order.totalCost)}</div>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="border-l-4 border-automotive-red pl-4">
                      <div className="font-medium text-gray-900">{appointment.time}</div>
                      <div className="text-sm text-gray-600">
                        <div>{appointment.customer}</div>
                        <div>{appointment.vehicle}</div>
                        <div>{appointment.service}</div>
                        <div className="text-automotive-red font-medium">{appointment.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Appointments
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start space-x-2">
                        {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                        {alert.type === "info" && <Clock className="h-4 w-4 text-blue-500 mt-0.5" />}
                        {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">{alert.message}</div>
                          <Button variant="link" size="sm" className="p-0 h-auto text-automotive-red">
                            {alert.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}