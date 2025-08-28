import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Car,
  Clock,
  Camera,
  Shield,
  MessageSquare,
  CheckCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  Star,
  AlertCircle
} from 'lucide-react'
import { formatCurrency, formatDateTime, formatDate } from '@/lib/utils'

export function CustomerPortal() {
  const { workOrderId } = useParams()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  // Mock data - in real app this would come from API
  const workOrder = {
    id: workOrderId || "WO-2024-001",
    customer: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john.smith@email.com"
    },
    vehicle: {
      year: 2020,
      make: "Honda",
      model: "Civic",
      licensePlate: "ABC-123",
      mileage: 45000
    },
    shop: {
      name: "Rodriguez Auto Repair",
      address: "123 Main St, Phoenix, AZ 85001",
      phone: "(555) 987-6543",
      email: "info@rodriguezauto.com"
    },
    status: "completed",
    createdAt: new Date("2024-08-19T08:30:00"),
    estimatedCompletion: new Date("2024-08-19T16:30:00"),
    actualCompletion: new Date("2024-08-19T15:45:00"),
    services: [
      {
        name: "Oil Change",
        description: "Full synthetic oil change with filter replacement",
        cost: 45.99,
        completed: true
      },
      {
        name: "Multi-Point Inspection",
        description: "Comprehensive 27-point vehicle inspection",
        cost: 0.00,
        completed: true
      },
      {
        name: "Brake Inspection",
        description: "Visual inspection of brake pads and rotors",
        cost: 0.00,
        completed: true
      }
    ],
    parts: [
      {
        name: "Engine Oil - 5W30",
        brand: "Mobil 1",
        quantity: 5,
        unitCost: 6.99,
        totalCost: 34.95
      },
      {
        name: "Oil Filter",
        brand: "Fram",
        quantity: 1,
        unitCost: 12.99,
        totalCost: 12.99
      }
    ],
    laborCost: 35.00,
    partsCost: 47.94,
    taxAmount: 6.23,
    totalCost: 89.17,
    technician: "Mike Johnson",
    findings: [
      {
        category: "Brakes",
        severity: "medium",
        description: "Brake pads at 30% remaining",
        recommendation: "Replace brake pads within 2,000 miles",
        photos: ["/api/photos/brake-pads-1.jpg"]
      },
      {
        category: "Fluids",
        severity: "low", 
        description: "Engine oil was slightly low",
        recommendation: "Monitor oil levels between services",
        photos: []
      }
    ],
    photos: [
      {
        id: "1",
        url: "/api/photos/before-service.jpg",
        caption: "Vehicle condition before service",
        category: "before"
      },
      {
        id: "2", 
        url: "/api/photos/oil-change.jpg",
        caption: "Oil change in progress",
        category: "during"
      },
      {
        id: "3",
        url: "/api/photos/after-service.jpg", 
        caption: "Vehicle ready for pickup",
        category: "after"
      }
    ],
    warranty: {
      laborMonths: 6,
      partsMonths: 12,
      description: "6 months labor warranty, 12 months parts warranty"
    },
    nextService: {
      recommendedDate: new Date("2024-11-19T08:30:00"),
      recommendedMileage: 48000,
      services: ["Oil Change", "Tire Rotation"]
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "warning" as const, label: "Pending" },
      in_progress: { variant: "info" as const, label: "In Progress" },
      completed: { variant: "success" as const, label: "Completed" },
      quality_check: { variant: "info" as const, label: "Quality Check" }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-automotive-red" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Report</h1>
              <p className="text-gray-600">{workOrder.shop.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Status Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Work Order {workOrder.id}</h2>
                <Badge {...getStatusBadge(workOrder.status)} className="text-sm">
                  {getStatusBadge(workOrder.status).label}
                </Badge>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="text-2xl font-bold text-automotive-red">
                  {formatCurrency(workOrder.totalCost)}
                </div>
                <div className="text-sm text-gray-600">Total Cost</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Vehicle Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-400" />
                    <span>{workOrder.vehicle.year} {workOrder.vehicle.make} {workOrder.vehicle.model}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">License Plate:</span>
                    <span>{workOrder.vehicle.licensePlate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Mileage:</span>
                    <span>{workOrder.vehicle.mileage.toLocaleString()} miles</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Service Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Started:</span>
                    <span>{formatDateTime(workOrder.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Completed:</span>
                    <span>{formatDateTime(workOrder.actualCompletion!)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Technician:</span>
                    <span>{workOrder.technician}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Performed */}
        <Card>
          <CardHeader>
            <CardTitle>Services Performed</CardTitle>
            <CardDescription>Complete breakdown of all services and repairs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workOrder.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(service.cost)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Labor</span>
                  <span>{formatCurrency(workOrder.laborCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Parts</span>
                  <span>{formatCurrency(workOrder.partsCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(workOrder.taxAmount)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-automotive-red">{formatCurrency(workOrder.totalCost)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parts Used */}
        <Card>
          <CardHeader>
            <CardTitle>Parts & Materials</CardTitle>
            <CardDescription>All parts and materials used in your service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workOrder.parts.map((part, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <div>
                    <div className="font-medium text-gray-900">{part.name}</div>
                    <div className="text-sm text-gray-600">Brand: {part.brand} • Qty: {part.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(part.totalCost)}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(part.unitCost)} each</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspection Findings */}
        {workOrder.findings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Inspection Findings</CardTitle>
              <CardDescription>Issues found during inspection and our recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrder.findings.map((finding, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(finding.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{finding.category}</span>
                          <Badge variant="outline" className="text-xs capitalize">{finding.severity}</Badge>
                        </div>
                        <div className="text-sm mb-2">{finding.description}</div>
                        <div className="text-sm font-medium">Recommendation:</div>
                        <div className="text-sm">{finding.recommendation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Service Documentation</CardTitle>
            <CardDescription>Photos taken during your service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workOrder.photos.map((photo) => (
                <div key={photo.id} className="space-y-2">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{photo.caption}</div>
                    <div className="text-gray-600 capitalize">{photo.category}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download All Photos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Warranty Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Warranty Coverage
            </CardTitle>
            <CardDescription>Your service is backed by our warranty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-900">Labor Warranty</div>
                <div className="text-blue-700">{workOrder.warranty.laborMonths} months</div>
                <div className="text-sm text-blue-600 mt-1">
                  Covers workmanship and installation
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-900">Parts Warranty</div>
                <div className="text-green-700">{workOrder.warranty.partsMonths} months</div>
                <div className="text-sm text-green-600 mt-1">
                  Manufacturer warranty on all parts
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
              <div className="text-sm text-gray-700">{workOrder.warranty.description}</div>
            </div>
          </CardContent>
        </Card>

        {/* Next Service Recommendation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Next Service Recommendation
            </CardTitle>
            <CardDescription>Keep your vehicle running smoothly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium text-gray-900 mb-2">Recommended Services:</div>
                <div className="text-sm text-gray-600 mb-2">
                  {workOrder.nextService.services.join(", ")}
                </div>
                <div className="text-sm text-gray-600">
                  Due: {formatDate(workOrder.nextService.recommendedDate)} or {workOrder.nextService.recommendedMileage.toLocaleString()} miles
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button variant="automotive">
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Your Experience</CardTitle>
            <CardDescription>Help us improve our service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Satisfaction
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Tell us about your experience..."
                />
              </div>
              
              <Button variant="automotive">
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Get in touch with us</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">{workOrder.shop.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{workOrder.shop.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{workOrder.shop.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{workOrder.shop.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Shop
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}