import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/ui/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Camera,
  Video,
  Search,
  Filter,
  User,
  Car,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export function Inspections() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const inspections = [
    {
      id: "INSP-2024-001",
      workOrderId: "WO-2024-001",
      type: "initial",
      customer: "John Smith",
      vehicle: "2020 Honda Civic",
      technician: "Mike Johnson",
      status: "completed",
      createdAt: new Date("2024-08-19T09:00:00"),
      completedAt: new Date("2024-08-19T09:45:00"),
      findings: [
        { severity: "medium", category: "Brakes", description: "Brake pads at 30% remaining" },
        { severity: "low", category: "Fluids", description: "Engine oil slightly low" },
        { severity: "high", category: "Tires", description: "Front tires showing uneven wear" }
      ],
      photos: 12,
      videos: 2,
      recommendations: ["Replace brake pads within 2,000 miles", "Top off engine oil", "Alignment check recommended"]
    },
    {
      id: "INSP-2024-002",
      workOrderId: "WO-2024-002",
      type: "diagnostic",
      customer: "Sarah Johnson",
      vehicle: "2018 Ford F-150",
      technician: "Carlos Rodriguez",
      status: "in_progress",
      createdAt: new Date("2024-08-19T10:30:00"),
      completedAt: null,
      findings: [
        { severity: "critical", category: "Brakes", description: "Brake pads completely worn" },
        { severity: "high", category: "Brakes", description: "Rotors require resurfacing" }
      ],
      photos: 8,
      videos: 1,
      recommendations: ["Immediate brake pad replacement required", "Rotor resurfacing necessary"]
    },
    {
      id: "INSP-2024-003",
      workOrderId: "WO-2024-003",
      type: "final",
      customer: "Mike Rodriguez",
      vehicle: "2019 Toyota Camry",
      technician: "Alex Chen",
      status: "completed",
      createdAt: new Date("2024-08-19T13:00:00"),
      completedAt: new Date("2024-08-19T13:30:00"),
      findings: [
        { severity: "low", category: "Engine", description: "Mass airflow sensor cleaned" },
        { severity: "low", category: "Engine", description: "No error codes present" }
      ],
      photos: 6,
      videos: 0,
      recommendations: ["All systems functioning normally", "Regular maintenance schedule recommended"]
    },
    {
      id: "INSP-2024-004",
      workOrderId: "WO-2024-005",
      type: "initial",
      customer: "David Wilson",
      vehicle: "2017 BMW 320i",
      technician: "Mike Johnson",
      status: "pending",
      createdAt: new Date("2024-08-19T14:00:00"),
      completedAt: null,
      findings: [],
      photos: 0,
      videos: 0,
      recommendations: []
    }
  ]

  const getTypeBadge = (type: string) => {
    const typeMap = {
      initial: { variant: "info" as const, label: "Initial" },
      diagnostic: { variant: "warning" as const, label: "Diagnostic" },
      final: { variant: "success" as const, label: "Final" }
    }
    return typeMap[type as keyof typeof typeMap] || typeMap.initial
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "warning" as const, label: "Pending" },
      in_progress: { variant: "info" as const, label: "In Progress" },
      completed: { variant: "success" as const, label: "Completed" }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || inspection.type === typeFilter
    
    return matchesSearch && matchesType
  })

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Inspections</h1>
            <p className="text-gray-600 mt-2">Comprehensive vehicle inspections with photo and video documentation</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="automotive" className="w-full sm:w-auto">
              <Camera className="h-4 w-4 mr-2" />
              New Inspection
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
                    placeholder="Search by customer, inspection ID, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="initial">Initial</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="final">Final</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inspections Grid */}
        <div className="grid gap-6">
          {filteredInspections.map((inspection) => (
            <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{inspection.id}</h3>
                        <Badge {...getTypeBadge(inspection.type)}>{getTypeBadge(inspection.type).label}</Badge>
                        <Badge {...getStatusBadge(inspection.status)}>{getStatusBadge(inspection.status).label}</Badge>
                        <Link to={`/work-orders/${inspection.workOrderId}`}>
                          <Badge variant="outline">{inspection.workOrderId}</Badge>
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {formatDateTime(inspection.createdAt)}
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      {/* Customer & Vehicle */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{inspection.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{inspection.vehicle}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Technician: {inspection.technician}
                        </div>
                      </div>

                      {/* Media Count */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Camera className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700">Documentation</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Camera className="h-3 w-3" />
                            <span>{inspection.photos} photos</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="h-3 w-3" />
                            <span>{inspection.videos} videos</span>
                          </div>
                        </div>
                        {inspection.completedAt && (
                          <div className="text-sm text-gray-500 mt-2">
                            Completed: {formatDateTime(inspection.completedAt)}
                          </div>
                        )}
                      </div>

                      {/* Summary */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700">Summary</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>{inspection.findings.length} findings</div>
                          <div>{inspection.recommendations.length} recommendations</div>
                        </div>
                      </div>
                    </div>

                    {/* Findings */}
                    {inspection.findings.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Key Findings:</h4>
                        <div className="space-y-2">
                          {inspection.findings.slice(0, 3).map((finding, index) => (
                            <div 
                              key={index} 
                              className={`p-3 rounded-lg border ${getSeverityColor(finding.severity)}`}
                            >
                              <div className="flex items-start space-x-2">
                                {getSeverityIcon(finding.severity)}
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-sm">{finding.category}</span>
                                    <Badge variant="outline" className="text-xs">{finding.severity}</Badge>
                                  </div>
                                  <div className="text-sm mt-1">{finding.description}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {inspection.findings.length > 3 && (
                            <div className="text-sm text-gray-500 text-center">
                              +{inspection.findings.length - 3} more findings
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {inspection.recommendations.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <div className="text-sm font-medium text-blue-800 mb-1">Recommendations:</div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {inspection.recommendations.slice(0, 2).map((rec, index) => (
                            <li key={index}>• {rec}</li>
                          ))}
                          {inspection.recommendations.length > 2 && (
                            <li className="text-blue-600">+{inspection.recommendations.length - 2} more...</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Link to={`/inspections/${inspection.id}`} className="flex-1 lg:flex-none">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    {inspection.status === "completed" && (
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInspections.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inspections found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || typeFilter !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first digital inspection"
                }
              </p>
              <Button variant="automotive">
                <Camera className="h-4 w-4 mr-2" />
                Start Inspection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}