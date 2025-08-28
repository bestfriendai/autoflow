import { useState } from 'react'
import { Layout } from '@/components/ui/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  X,
  Eye,
  Edit
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function Parts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const partsOrders = [
    {
      id: "PO-2024-001",
      workOrderId: "WO-2024-002",
      partNumber: "BP-1234",
      partName: "Brake Pads - Front Set",
      brand: "Bosch",
      supplier: "Parts Direct",
      quantity: 2,
      unitCost: 45.99,
      totalCost: 91.98,
      status: "pending",
      orderDate: new Date("2024-08-19T09:30:00"),
      estimatedDelivery: new Date("2024-08-21T10:00:00"),
      actualDelivery: null,
      customer: "Sarah Johnson",
      vehicle: "2018 Ford F-150"
    },
    {
      id: "PO-2024-002", 
      workOrderId: "WO-2024-001",
      partNumber: "OF-5678",
      partName: "Oil Filter",
      brand: "Fram",
      supplier: "AutoZone",
      quantity: 1,
      unitCost: 12.99,
      totalCost: 12.99,
      status: "received",
      orderDate: new Date("2024-08-18T14:00:00"),
      estimatedDelivery: new Date("2024-08-19T12:00:00"),
      actualDelivery: new Date("2024-08-19T11:30:00"),
      customer: "John Smith",
      vehicle: "2020 Honda Civic"
    },
    {
      id: "PO-2024-003",
      workOrderId: "WO-2024-003",
      partNumber: "SP-9101",
      partName: "Spark Plugs Set",
      brand: "NGK",
      supplier: "NAPA Auto Parts",
      quantity: 4,
      unitCost: 8.75,
      totalCost: 35.00,
      status: "installed",
      orderDate: new Date("2024-08-18T08:00:00"),
      estimatedDelivery: new Date("2024-08-19T09:00:00"),
      actualDelivery: new Date("2024-08-19T08:45:00"),
      customer: "Mike Rodriguez",
      vehicle: "2019 Toyota Camry"
    },
    {
      id: "PO-2024-004",
      workOrderId: "WO-2024-004",
      partNumber: "TF-1122",
      partName: "Transmission Filter",
      brand: "ACDelco",
      supplier: "Parts Direct",
      quantity: 1,
      unitCost: 24.50,
      totalCost: 24.50,
      status: "ordered",
      orderDate: new Date("2024-08-19T11:00:00"),
      estimatedDelivery: new Date("2024-08-22T10:00:00"),
      actualDelivery: null,
      customer: "Lisa Chen",
      vehicle: "2021 Subaru Outback"
    },
    {
      id: "PO-2024-005",
      workOrderId: "WO-2024-001",
      partNumber: "EO-3344",
      partName: "Engine Oil - 5W30",
      brand: "Mobil 1",
      supplier: "AutoZone",
      quantity: 5,
      unitCost: 6.99,
      totalCost: 34.95,
      status: "received",
      orderDate: new Date("2024-08-18T14:00:00"),
      estimatedDelivery: new Date("2024-08-19T12:00:00"),
      actualDelivery: new Date("2024-08-19T11:30:00"),
      customer: "John Smith",
      vehicle: "2020 Honda Civic"
    }
  ]

  const inventory = [
    {
      partNumber: "OF-GENERIC",
      partName: "Oil Filter - Generic",
      brand: "Various",
      currentStock: 12,
      reorderLevel: 5,
      unitCost: 8.99,
      supplier: "Multiple",
      lastOrdered: new Date("2024-08-15T10:00:00")
    },
    {
      partNumber: "BP-GENERIC",
      partName: "Brake Pads - Generic",
      brand: "Various", 
      currentStock: 3,
      reorderLevel: 8,
      unitCost: 35.99,
      supplier: "Multiple",
      lastOrdered: new Date("2024-08-10T10:00:00")
    },
    {
      partNumber: "EO-5W30",
      partName: "Engine Oil 5W30",
      brand: "Mobil 1",
      currentStock: 24,
      reorderLevel: 10,
      unitCost: 6.99,
      supplier: "AutoZone",
      lastOrdered: new Date("2024-08-18T14:00:00")
    }
  ]

  const suppliers = [
    {
      name: "Parts Direct",
      deliveryTime: "2-3 days",
      discountRate: 15,
      totalOrders: 145,
      totalSpent: 12750.50,
      status: "connected"
    },
    {
      name: "AutoZone",
      deliveryTime: "1-2 days",
      discountRate: 10,
      totalOrders: 89,
      totalSpent: 8234.75,
      status: "connected"
    },
    {
      name: "NAPA Auto Parts",
      deliveryTime: "1-3 days",
      discountRate: 12,
      totalOrders: 67,
      totalSpent: 9876.25,
      status: "connected"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "warning" as const, label: "Pending", icon: Clock },
      ordered: { variant: "info" as const, label: "Ordered", icon: ShoppingCart },
      received: { variant: "success" as const, label: "Received", icon: Package },
      installed: { variant: "completed" as const, label: "Installed", icon: CheckCircle },
      cancelled: { variant: "destructive" as const, label: "Cancelled", icon: X }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }



  const filteredPartsOrders = partsOrders.filter(order => {
    const matchesSearch = order.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const lowStockItems = inventory.filter(item => item.currentStock <= item.reorderLevel)

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parts Management</h1>
            <p className="text-gray-600 mt-2">Track inventory, orders, and supplier relationships</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Manage Inventory
            </Button>
            <Button variant="automotive">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {partsOrders.filter(o => o.status === 'pending' || o.status === 'ordered').length}
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(partsOrders.reduce((sum, o) => sum + o.totalCost, 0))}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                </div>
                <Package className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="font-medium text-gray-900">{item.partName}</div>
                      <div className="text-sm text-gray-600">{item.partNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-700">{item.currentStock} remaining</div>
                      <Button size="sm" variant="outline" className="mt-1">
                        Reorder Now
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
                    placeholder="Search by part name, number, customer, or vehicle..."
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
                  <option value="ordered">Ordered</option>
                  <option value="received">Received</option>
                  <option value="installed">Installed</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parts Orders Grid */}
        <div className="grid gap-6">
          {filteredPartsOrders.map((order) => {
            const statusConfig = getStatusBadge(order.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                          <Badge variant={statusConfig.variant}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="outline">{order.workOrderId}</Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Ordered: {formatDate(order.orderDate)}
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Part Details */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Part Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium text-gray-700">{order.partName}</div>
                            <div className="text-gray-600">Part #: {order.partNumber}</div>
                            <div className="text-gray-600">Brand: {order.brand}</div>
                            <div className="text-gray-600">Supplier: {order.supplier}</div>
                            <div className="text-gray-600">Qty: {order.quantity}</div>
                          </div>
                        </div>

                        {/* Customer & Vehicle */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">For Work Order</h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium text-gray-700">{order.customer}</div>
                            <div className="text-gray-600">{order.vehicle}</div>
                            <div className="text-gray-600">{order.workOrderId}</div>
                          </div>
                        </div>

                        {/* Delivery & Cost */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Delivery & Cost</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Unit Cost:</span>
                              <span className="font-medium">{formatCurrency(order.unitCost)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-bold text-automotive-red">
                                {formatCurrency(order.totalCost)}
                              </span>
                            </div>
                            <div className="text-gray-600">
                              Est. Delivery: {formatDate(order.estimatedDelivery)}
                            </div>
                            {order.actualDelivery && (
                              <div className="text-green-600">
                                Delivered: {formatDate(order.actualDelivery)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {order.status === 'received' && (
                        <Button variant="success" size="sm" className="flex-1 lg:flex-none">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Installed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredPartsOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No parts orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by placing your first parts order"
                }
              </p>
              <Button variant="automotive">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}