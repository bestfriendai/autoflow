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
  User,
  Car,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Eye,
  Edit,
  MessageSquare
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('')

  const customers = [
    {
      id: "CUST-001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: {
        street: "123 Main St",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001"
      },
      vehicles: [
        {
          id: "VEH-001",
          year: 2020,
          make: "Honda",
          model: "Civic",
          vin: "1HGBH41JXMN109186",
          mileage: 45000,
          licensePlate: "ABC-123"
        }
      ],
      totalSpent: 1247.50,
      visitCount: 8,
      lastVisit: new Date("2024-08-19T08:30:00"),
      customerSince: new Date("2022-03-15"),
      status: "active",
      notes: "Prefers early morning appointments. Very punctual."
    },
    {
      id: "CUST-002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      address: {
        street: "456 Oak Ave",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85002"
      },
      vehicles: [
        {
          id: "VEH-002",
          year: 2018,
          make: "Ford",
          model: "F-150",
          vin: "1FTFW1ET5JFC10312",
          mileage: 78000,
          licensePlate: "XYZ-789"
        },
        {
          id: "VEH-003",
          year: 2021,
          make: "Honda",
          model: "Pilot",
          vin: "5FNYF6H01MB000001",
          mileage: 32000,
          licensePlate: "DEF-456"
        }
      ],
      totalSpent: 2847.75,
      visitCount: 15,
      lastVisit: new Date("2024-08-19T09:15:00"),
      customerSince: new Date("2021-08-20"),
      status: "active",
      notes: "Fleet customer. Owns small delivery business."
    },
    {
      id: "CUST-003",
      firstName: "Mike",
      lastName: "Rodriguez",
      email: "mike.r@email.com",
      phone: "(555) 456-7890",
      address: {
        street: "789 Pine Rd",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85003"
      },
      vehicles: [
        {
          id: "VEH-004",
          year: 2019,
          make: "Toyota",
          model: "Camry",
          vin: "4T1B11HK5KU000001",
          mileage: 32000,
          licensePlate: "GHI-789"
        }
      ],
      totalSpent: 675.25,
      visitCount: 5,
      lastVisit: new Date("2024-08-19T07:00:00"),
      customerSince: new Date("2023-01-10"),
      status: "active",
      notes: "Mechanic himself. Only comes for complex issues."
    },
    {
      id: "CUST-004",
      firstName: "Lisa",
      lastName: "Chen",
      email: "lisa.chen@email.com",
      phone: "(555) 234-5678",
      address: {
        street: "321 Cedar Ln",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85004"
      },
      vehicles: [
        {
          id: "VEH-005",
          year: 2021,
          make: "Subaru",
          model: "Outback",
          vin: "4S4BTANC8M3000001",
          mileage: 25000,
          licensePlate: "JKL-012"
        }
      ],
      totalSpent: 1125.00,
      visitCount: 6,
      lastVisit: new Date("2024-08-18T14:30:00"),
      customerSince: new Date("2022-11-05"),
      status: "active",
      notes: "Always asks for detailed explanations. Very engaged."
    },
    {
      id: "CUST-005",
      firstName: "David",
      lastName: "Wilson",
      email: "david.w@email.com",
      phone: "(555) 345-6789",
      address: {
        street: "654 Elm St",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85005"
      },
      vehicles: [
        {
          id: "VEH-006",
          year: 2017,
          make: "BMW",
          model: "320i",
          vin: "WBA8E1C50HK000001",
          mileage: 62000,
          licensePlate: "MNO-345"
        }
      ],
      totalSpent: 2150.50,
      visitCount: 12,
      lastVisit: new Date("2024-08-17T11:00:00"),
      customerSince: new Date("2020-06-18"),
      status: "active",
      notes: "Prefers OEM parts. High-value customer."
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "success" as const, label: "Active" },
      inactive: { variant: "warning" as const, label: "Inactive" },
      new: { variant: "info" as const, label: "New" }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.active
  }

  const getCustomerValue = (totalSpent: number) => {
    if (totalSpent >= 2000) return { label: "High Value", color: "text-green-600" }
    if (totalSpent >= 1000) return { label: "Regular", color: "text-blue-600" }
    return { label: "New", color: "text-gray-600" }
  }

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    
    return fullName.includes(searchLower) ||
           customer.email.toLowerCase().includes(searchLower) ||
           customer.phone.includes(searchTerm) ||
           customer.vehicles.some(vehicle => 
             `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchLower) ||
             vehicle.licensePlate.toLowerCase().includes(searchLower)
           )
  })

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600 mt-2">Manage customer information and service history</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="automotive" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by name, email, phone, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
                <User className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.reduce((sum, c) => sum + c.vehicles.length, 0)}
                  </p>
                </div>
                <Car className="h-8 w-8 text-automotive-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Grid */}
        <div className="grid gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        <Badge {...getStatusBadge(customer.status)}>
                          {getStatusBadge(customer.status).label}
                        </Badge>
                        <Badge variant="outline" className={getCustomerValue(customer.totalSpent).color}>
                          {getCustomerValue(customer.totalSpent).label}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Customer since {formatDate(customer.customerSince)}
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      {/* Contact Information */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{customer.phone}</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                            <span className="text-gray-600">
                              {customer.address.street}<br />
                              {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicles */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Vehicles ({customer.vehicles.length})
                        </h4>
                        <div className="space-y-2">
                          {customer.vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="text-sm">
                              <div className="font-medium text-gray-700">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                              <div className="text-gray-500">
                                {vehicle.licensePlate} • {vehicle.mileage.toLocaleString()} mi
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Service History */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Service History</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Visits:</span>
                            <span className="font-medium">{customer.visitCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Spent:</span>
                            <span className="font-medium text-automotive-red">
                              {formatCurrency(customer.totalSpent)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Visit:</span>
                            <span className="font-medium">{formatDate(customer.lastVisit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg per Visit:</span>
                            <span className="font-medium">
                              {formatCurrency(customer.totalSpent / customer.visitCount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {customer.notes && (
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Notes:</div>
                        <div className="text-sm text-gray-600">{customer.notes}</div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Link to={`/customers/${customer.id}`} className="flex-1 lg:flex-none">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first customer"
                }
              </p>
              <Button variant="automotive">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}