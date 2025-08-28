export interface Shop {
  id: string
  name: string
  address: string
  phone: string
  email: string
  website?: string
  logo?: string
  isOpen: boolean
  bays: Bay[]
  subscription: Subscription
  settings: ShopSettings
  createdAt: Date
  updatedAt: Date
}

export interface Bay {
  id: string
  shopId: string
  number: number
  name: string
  isOccupied: boolean
  currentWorkOrder?: string
  equipment: string[]
  specializations: string[]
}

export interface Subscription {
  id: string
  shopId: string
  plan: 'basic' | 'premium' | 'enterprise'
  status: 'active' | 'past_due' | 'canceled' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  basePrice: number
  bayCount: number
  totalPrice: number
}

export interface ShopSettings {
  businessHours: BusinessHours
  laborRate: number
  taxRate: number
  currency: string
  timeZone: string
  notifications: NotificationSettings
  integrations: IntegrationSettings
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  isOpen: boolean
  openTime: string
  closeTime: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  customerUpdates: boolean
  warrantyReminders: boolean
  lowInventoryAlerts: boolean
}

export interface IntegrationSettings {
  stripeConnected: boolean
  quickbooksConnected: boolean
  partsSuppliers: PartsSupplier[]
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: CustomerAddress
  vehicles: Vehicle[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomerAddress {
  street: string
  city: string
  state: string
  zipCode: string
}

export interface Vehicle {
  id: string
  customerId: string
  vin: string
  year: number
  make: string
  model: string
  trim?: string
  color?: string
  mileage: number
  licenseplate?: string
  notes?: string
  serviceHistory: WorkOrder[]
}

export interface WorkOrder {
  id: string
  shopId: string
  customerId: string
  vehicleId: string
  bayId?: string
  status: WorkOrderStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  customerConcerns: string[]
  estimatedCost: number
  actualCost?: number
  estimatedCompletion: Date
  actualCompletion?: Date
  laborHours: number
  inspections: Inspection[]
  parts: PartOrder[]
  services: Service[]
  photos: WorkOrderPhoto[]
  notes: WorkOrderNote[]
  warranty: WarrantyInfo
  createdAt: Date
  updatedAt: Date
}

export type WorkOrderStatus = 
  | 'pending'
  | 'inspecting'
  | 'awaiting_approval'
  | 'approved'
  | 'in_progress'
  | 'awaiting_parts'
  | 'quality_check'
  | 'completed'
  | 'delivered'
  | 'cancelled'

export interface Inspection {
  id: string
  workOrderId: string
  type: 'initial' | 'diagnostic' | 'final'
  findings: InspectionFinding[]
  recommendations: string[]
  technicianId: string
  completedAt: Date
  photos: InspectionPhoto[]
  videos: InspectionVideo[]
}

export interface InspectionFinding {
  id: string
  category: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  recommendation: string
  estimatedCost?: number
  photos: string[]
}

export interface InspectionPhoto {
  id: string
  url: string
  caption: string
  category: string
  timestamp: Date
}

export interface InspectionVideo {
  id: string
  url: string
  caption: string
  duration: number
  timestamp: Date
}

export interface PartOrder {
  id: string
  workOrderId: string
  partNumber: string
  partName: string
  brand: string
  quantity: number
  unitCost: number
  totalCost: number
  supplier: string
  status: 'pending' | 'ordered' | 'received' | 'installed'
  estimatedDelivery?: Date
  actualDelivery?: Date
  warranty: PartWarranty
}

export interface PartWarranty {
  duration: number
  unit: 'days' | 'months' | 'years'
  description: string
}

export interface Service {
  id: string
  workOrderId: string
  name: string
  description: string
  laborHours: number
  laborRate: number
  laborCost: number
  status: 'pending' | 'in_progress' | 'completed'
  technicianId: string
  startedAt?: Date
  completedAt?: Date
  warranty: ServiceWarranty
}

export interface ServiceWarranty {
  duration: number
  unit: 'days' | 'months' | 'years'
  description: string
  limitations?: string[]
}

export interface WorkOrderPhoto {
  id: string
  url: string
  caption: string
  category: 'before' | 'during' | 'after' | 'issue' | 'other'
  timestamp: Date
}

export interface WorkOrderNote {
  id: string
  content: string
  authorId: string
  authorName: string
  isInternal: boolean
  timestamp: Date
}

export interface WarrantyInfo {
  laborWarranty: ServiceWarranty
  partsWarranty: PartWarranty[]
  terms: string[]
  exclusions: string[]
}

export interface PartsSupplier {
  id: string
  name: string
  apiKey?: string
  isConnected: boolean
  deliveryTime: number
  minimumOrder?: number
  discountRate?: number
}

export interface Technician {
  id: string
  shopId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'lead_tech' | 'technician' | 'apprentice'
  specializations: string[]
  certifications: Certification[]
  isActive: boolean
  createdAt: Date
}

export interface Certification {
  id: string
  name: string
  issuingBody: string
  issueDate: Date
  expirationDate?: Date
  certificateNumber?: string
}

export interface Invoice {
  id: string
  workOrderId: string
  customerId: string
  invoiceNumber: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  subtotal: number
  tax: number
  total: number
  dueDate: Date
  paidDate?: Date
  paymentMethod?: string
  notes?: string
  createdAt: Date
}

export interface CustomerCommunication {
  id: string
  workOrderId: string
  customerId: string
  type: 'sms' | 'email' | 'call' | 'in_person'
  direction: 'incoming' | 'outgoing'
  subject?: string
  content: string
  status: 'sent' | 'delivered' | 'read' | 'replied'
  timestamp: Date
  attachments?: string[]
}

export interface WarrantyRecord {
  id: string
  workOrderId: string
  customerId: string
  vehicleId: string
  type: 'labor' | 'parts' | 'comprehensive'
  description: string
  startDate: Date
  endDate: Date
  status: 'active' | 'expired' | 'claimed' | 'voided'
  terms: string[]
  claimHistory: WarrantyClaim[]
}

export interface WarrantyClaim {
  id: string
  warrantyId: string
  workOrderId: string
  description: string
  amount: number
  status: 'pending' | 'approved' | 'denied' | 'completed'
  submittedDate: Date
  processedDate?: Date
  notes?: string
}