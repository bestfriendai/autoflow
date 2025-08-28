import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/ui/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus,
  Search,
  Filter,
  Clock,
  DollarSign,
  User,
  Car,
  Wrench,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'
import { formatCurrency, formatDateTime } from '@/lib/utils'

export function WorkOrders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const workOrders = [
    {
      id: "WO-2024-001",
      customer: {
        name: "John Smith",
        phone: "(555) 123-4567",
        email: "john.smith@email.com"
      },
      vehicle: {
        year: 2020,
        make: "Honda",
        model: "Civic",
        vin: "1HGBH41JXMN109186",
        mileage: 45000,
        licensePlate: "ABC-123"
      },
      services: ["Oil Change", "Multi-Point Inspection"],
      status: "in_progress",
      priority: "medium",
      bay: "Bay 2",
      technician: "Mike Johnson",
      estimatedCost: 89.99,
      actualCost: 89.99,
      laborHours: 1.5,
      createdAt: new Date("2024-08-19T08:30:00"),
      estimatedCompletion: new Date("2024-08-19T16:30:00"),
      customerConcerns: ["Strange noise when braking", "Dashboard warning light"]
    },
    {
      id: "WO-2024-002",
      customer: {
        name: "Sarah Johnson", 
        phone: "(555) 987-6543",
        email: "sarah.j@email.com"
      },
      vehicle: {
        year: 2018,
        make: "Ford",
        model: "F-150",
        vin: "1FTFW1ET5JFC10312",
        mileage: 78000,
        licensePlate: "XYZ-789"
      },
      services: ["Brake Pad Replacement", "Rotor Resurfacing"],
      status: "awaiting_approval",
      priority: "high",
      bay: null,
      technician: "Carlos Rodriguez",
      estimatedCost: 425.00,
      actualCost: null,
      laborHours: 3.0,
      createdAt: new Date("2024-08-19T09:15:00"),
      estimatedCompletion: new Date("2024-08-20T10:00:00"),
      customerConcerns: ["Squealing brakes", "Vibration when stopping"]
    },
    {
      id: "WO-2024-003",
      customer: {
        name: "Mike Rodriguez",
        phone: "(555) 456-7890",
        email: "mike.r@email.com"
      },
      vehicle: {
        year: 2019,
        make: "Toyota",
        model: "Camry",
        vin: "4T1B11HK5KU000001",
        mileage: 32000,
        licensePlate: "DEF-456"
      },
      services: ["Engine Diagnostic", "Check Engine Light"],
      status: "completed",
      priority: "medium",
      bay: "Bay 1",
      technician: "Alex Chen",
      estimatedCost: 150.00,
      actualCost: 175.00,
      laborHours: 2.0,
      createdAt: new Date("2024-08-19T07:00:00"),
      estimatedCompletion: new Date("2024-08-19T14:00:00"),
      customerConcerns: ["Check engine light", "Rough idle"]
    },
    {
      id: "WO-2024-004",
      customer: {
        name: "Lisa Chen",
        phone: "(555) 234-5678",
        email: "lisa.chen@email.com"
      },
      vehicle: {
        year: 2021,
        make: "Subaru", 
        model: "Outback",
        vin: "4S4BTANC8M3000001",
        mileage: 25000,
        licensePlate: "GHI-789"
      },
      services: ["Transmission Service", "Fluid Change"],
      status: "pending",
      priority: "low",
      bay: null,
      technician: null,
      estimatedCost: 275.00,
      actualCost: null,
      laborHours: 2.5,
      createdAt: new Date("2024-08-19T10:30:00"),
      estimatedCompletion: new Date("2024-08-20T08:00:00"),
      customerConcerns: ["Transmission slipping", "Delayed shifting"]
    },
    {
      id: "WO-2024-005",
      customer: {
        name: "David Wilson",
        phone: "(555) 345-6789",
        email: "david.w@email.com"
      },
      vehicle: {
        year: 2017,
        make: "BMW",
        model: "320i",
        vin: "WBA8E1C50HK000001",
        mileage: 62000,
        licensePlate: "JKL-012"
      },
      services: ["Annual Inspection", "Oil Change", "Tire Rotation"],
      status: "quality_check",
      priority: "medium",
      bay: "Bay 3",
      technician: "Mike Johnson",
      estimatedCost: 195.00,
      actualCost: 195.00,
      laborHours: 1.0,
      createdAt: new Date("2024-08-19T11:00:00"),
      estimatedCompletion: new Date("2024-08-19T15:00:00"),
      customerConcerns: ["Routine maintenance"]
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "warning" as const, label: "Pending" },
      in_progress: { variant: "info" as const, label: "In Progress" },
      awaiting_approval: { variant: "warning" as const, label: "Awaiting Approval" },
      quality_check: { variant: "info" as const, label: "Quality Check" },
      completed: { variant: "success" as const, label: "Completed" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { variant: "low" as const, label: "Low" },
      medium: { variant: "medium" as const, label: "Medium" },
      high: { variant: "high" as const, label: "High" },
      urgent: { variant: "urgent" as const, label: "Urgent" }
    }
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium
  }

  const filteredWorkOrders = workOrders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${order.vehicle.year} ${order.vehicle.make} ${order.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
            <p className="text-gray-600 mt-2">Manage all vehicle repairs and services</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="automotive" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Work Order
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by customer, work order ID, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="awaiting_approval">Awaiting Approval</option>
                  <option value="quality_check">Quality Check</option>
                  <option value="completed">Completed</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Orders Grid */}
        <div className="grid gap-6">
          {filteredWorkOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <Badge {...getStatusBadge(order.status)}>{getStatusBadge(order.status).label}</Badge>
                        <Badge {...getPriorityBadge(order.priority)}>{getPriorityBadge(order.priority).label}</Badge>
                        {order.bay && (
                          <Badge variant="outline">{order.bay}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {formatDateTime(order.createdAt)}
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Customer & Vehicle */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{order.customer.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.vehicle.mileage.toLocaleString()} miles • {order.vehicle.licensePlate}
                        </div>
                      </div>

                      {/* Services & Details */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Wrench className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700">Services</span>
                        </div>
                        <div className="space-y-1">
                          {order.services.map((service, index) => (
                            <div key={index} className="text-sm text-gray-600">• {service}</div>
                          ))}
                        </div>
                        {order.technician && (
                          <div className="text-sm text-gray-500 mt-2">
                            Technician: {order.technician}
                          </div>
                        )}
                      </div>

                      {/* Timeline & Cost */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700">Timeline</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Due: {formatDateTime(order.estimatedCompletion)}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Labor: {order.laborHours}h
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-bold text-automotive-red">
                            {formatCurrency(order.actualCost || order.estimatedCost)}
                          </span>
                          {order.actualCost && order.actualCost !== order.estimatedCost && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(order.estimatedCost)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Customer Concerns */}
                    {order.customerConcerns.length > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="text-sm font-medium text-yellow-800 mb-1">Customer Concerns:</div>
                        <div className="text-sm text-yellow-700">
                          {order.customerConcerns.join(", ")}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Link to={`/work-orders/${order.id}`} className="flex-1 lg:flex-none">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="lg:hidden">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorkOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No work orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first work order"
                }
              </p>
              <Button variant="automotive">
                <Plus className="h-4 w-4 mr-2" />
                Create Work Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}