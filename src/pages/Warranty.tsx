import { useState } from 'react'
import { Layout } from '@/components/ui/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Car,
  Wrench,
  Bell,
  Eye,
  Edit,
  FileText
} from 'lucide-react'
import { formatCurrency, formatDate, getWarrantyStatus } from '@/lib/utils'

export function Warranty() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const warranties = [
    {
      id: "WTY-2024-001",
      workOrderId: "WO-2024-003",
      customer: {
        name: "Mike Rodriguez",
        phone: "(555) 456-7890",
        email: "mike.r@email.com"
      },
      vehicle: "2019 Toyota Camry",
      serviceDate: new Date("2024-08-19T14:00:00"),
      services: ["Engine Diagnostic", "Spark Plug Replacement"],
      laborWarranty: {
        duration: 6,
        unit: "months",
        description: "6-month labor warranty on all diagnostic and repair work"
      },
      partsWarranty: [
        {
          partName: "NGK Spark Plugs",
          duration: 12,
          unit: "months",
          description: "Manufacturer warranty on NGK spark plugs"
        }
      ],
      totalAmount: 175.00,
      status: "active",
      expirationDate: new Date("2025-02-19T14:00:00"),
      claimsHistory: []
    },
    {
      id: "WTY-2024-002",
      workOrderId: "WO-2024-001",
      customer: {
        name: "John Smith",
        phone: "(555) 123-4567",
        email: "john.smith@email.com"
      },
      vehicle: "2020 Honda Civic",
      serviceDate: new Date("2024-07-15T10:30:00"),
      services: ["Brake Pad Replacement", "Rotor Resurfacing"],
      laborWarranty: {
        duration: 12,
        unit: "months",
        description: "12-month labor warranty on brake work"
      },
      partsWarranty: [
        {
          partName: "Bosch Brake Pads",
          duration: 24,
          unit: "months",
          description: "2-year manufacturer warranty on Bosch brake pads"
        }
      ],
      totalAmount: 425.00,
      status: "expiring",
      expirationDate: new Date("2025-01-15T10:30:00"),
      claimsHistory: []
    },
    {
      id: "WTY-2024-003",
      workOrderId: "WO-2023-156",
      customer: {
        name: "Sarah Johnson",
        phone: "(555) 987-6543",
        email: "sarah.j@email.com"
      },
      vehicle: "2018 Ford F-150",
      serviceDate: new Date("2023-12-10T09:00:00"),
      services: ["Transmission Service", "Fluid Change"],
      laborWarranty: {
        duration: 12,
        unit: "months",
        description: "12-month labor warranty on transmission work"
      },
      partsWarranty: [
        {
          partName: "ACDelco Transmission Filter",
          duration: 12,
          unit: "months",
          description: "Manufacturer warranty on transmission filter"
        }
      ],
      totalAmount: 275.00,
      status: "expired",
      expirationDate: new Date("2024-12-10T09:00:00"),
      claimsHistory: []
    },
    {
      id: "WTY-2024-004",
      workOrderId: "WO-2024-005",
      customer: {
        name: "David Wilson",
        phone: "(555) 345-6789",
        email: "david.w@email.com"
      },
      vehicle: "2017 BMW 320i",
      serviceDate: new Date("2024-08-19T15:00:00"),
      services: ["Annual Inspection", "Oil Change", "Tire Rotation"],
      laborWarranty: {
        duration: 3,
        unit: "months",
        description: "3-month labor warranty on routine maintenance"
      },
      partsWarranty: [
        {
          partName: "Mobil 1 Engine Oil",
          duration: 6,
          unit: "months",
          description: "Manufacturer warranty on Mobil 1 oil"
        }
      ],
      totalAmount: 195.00,
      status: "active",
      expirationDate: new Date("2024-11-19T15:00:00"),
      claimsHistory: []
    }
  ]

  const upcomingExpirations = warranties.filter(warranty => {
    const status = getWarrantyStatus(warranty.serviceDate, warranty.laborWarranty.duration)
    return status.status === 'expiring'
  })

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "success" as const, label: "Active", icon: CheckCircle },
      expiring: { variant: "warning" as const, label: "Expiring Soon", icon: AlertTriangle },
      expired: { variant: "destructive" as const, label: "Expired", icon: Clock },
      claimed: { variant: "info" as const, label: "Claimed", icon: FileText }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.active
  }

  const filteredWarranties = warranties.filter(warranty => {
    const matchesSearch = warranty.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warranty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warranty.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warranty.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || warranty.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warranty Management</h1>
            <p className="text-gray-600 mt-2">Track warranties and manage customer follow-ups</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Setup Reminders
            </Button>
            <Button variant="automotive">
              <Plus className="h-4 w-4 mr-2" />
              Add Warranty
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Warranties</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {warranties.filter(w => w.status === 'active').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingExpirations.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Coverage</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(warranties.reduce((sum, w) => sum + w.totalAmount, 0))}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Claims This Month</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expiration Alerts */}
        {upcomingExpirations.length > 0 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Warranty Expiration Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExpirations.map((warranty) => (
                  <div key={warranty.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="font-medium text-gray-900">{warranty.customer.name}</div>
                      <div className="text-sm text-gray-600">{warranty.vehicle} • {warranty.id}</div>
                      <div className="text-sm text-yellow-700">
                        Expires: {formatDate(warranty.expirationDate)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Contact Customer
                      </Button>
                      <Button size="sm" variant="automotive">
                        Schedule Service
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by customer, warranty ID, vehicle, or service..."
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
                  <option value="active">Active</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                  <option value="claimed">Claimed</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warranties Grid */}
        <div className="grid gap-6">
          {filteredWarranties.map((warranty) => {
            const statusConfig = getStatusBadge(warranty.status)
            const StatusIcon = statusConfig.icon
            const warrantyStatus = getWarrantyStatus(warranty.serviceDate, warranty.laborWarranty.duration)
            
            return (
              <Card key={warranty.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900">{warranty.id}</h3>
                          <Badge variant={statusConfig.variant}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="outline">{warranty.workOrderId}</Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Service Date: {formatDate(warranty.serviceDate)}
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        {/* Customer & Vehicle */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Customer & Vehicle</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="font-medium text-gray-700">{warranty.customer.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Car className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600">{warranty.vehicle}</span>
                            </div>
                            <div className="text-gray-600">{warranty.customer.phone}</div>
                            <div className="text-gray-600">{warranty.customer.email}</div>
                          </div>
                        </div>

                        {/* Services & Coverage */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Services Covered</h4>
                          <div className="space-y-1 text-sm">
                            {warranty.services.map((service, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Wrench className="h-3 w-3 text-gray-400" />
                                <span className="text-gray-600">{service}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="font-medium text-automotive-red">
                              Total: {formatCurrency(warranty.totalAmount)}
                            </div>
                          </div>
                        </div>

                        {/* Warranty Details */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Warranty Terms</h4>
                          <div className="space-y-2 text-sm">
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                              <div className="font-medium text-blue-800">Labor Warranty</div>
                              <div className="text-blue-700">
                                {warranty.laborWarranty.duration} {warranty.laborWarranty.unit}
                              </div>
                              <div className="text-blue-600 text-xs mt-1">
                                {warranty.laborWarranty.description}
                              </div>
                            </div>
                            
                            {warranty.partsWarranty.map((part, index) => (
                              <div key={index} className="p-2 bg-green-50 border border-green-200 rounded">
                                <div className="font-medium text-green-800">{part.partName}</div>
                                <div className="text-green-700">
                                  {part.duration} {part.unit}
                                </div>
                                <div className="text-green-600 text-xs mt-1">
                                  {part.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expiration Info */}
                      <div className={`p-3 rounded-lg border ${
                        warranty.status === 'active' ? 'bg-green-50 border-green-200' :
                        warranty.status === 'expiring' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              {warranty.status === 'active' ? 'Valid Until' :
                               warranty.status === 'expiring' ? 'Expires Soon' :
                               'Expired On'}
                            </div>
                            <div className="text-sm">{formatDate(warranty.expirationDate)}</div>
                          </div>
                          {warranty.status === 'active' && (
                            <div className="text-sm text-gray-600">
                              {warrantyStatus.daysRemaining} days remaining
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Terms
                      </Button>
                      {warranty.status === 'expiring' && (
                        <Button variant="automotive" size="sm" className="flex-1 lg:flex-none">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Follow-up
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredWarranties.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No warranties found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Warranties will appear here as you complete work orders"
                }
              </p>
              <Button variant="automotive">
                <Plus className="h-4 w-4 mr-2" />
                Add Warranty
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}