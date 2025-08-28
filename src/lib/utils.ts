import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function calculateWarrantyExpiration(serviceDate: Date, warrantyMonths: number): Date {
  const expiration = new Date(serviceDate)
  expiration.setMonth(expiration.getMonth() + warrantyMonths)
  return expiration
}

export function getWarrantyStatus(serviceDate: Date, warrantyMonths: number): {
  status: 'active' | 'expiring' | 'expired'
  daysRemaining: number
} {
  const expiration = calculateWarrantyExpiration(serviceDate, warrantyMonths)
  const now = new Date()
  const daysRemaining = Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysRemaining < 0) {
    return { status: 'expired', daysRemaining: 0 }
  } else if (daysRemaining <= 30) {
    return { status: 'expiring', daysRemaining }
  } else {
    return { status: 'active', daysRemaining }
  }
}

export function generateInvoiceNumber(): string {
  const prefix = 'INV'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 3).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function calculateLaborCost(hours: number, ratePerHour: number): number {
  return Math.round(hours * ratePerHour * 100) / 100
}

export function getVehicleDisplayName(make: string, model: string, year: number): string {
  return `${year} ${make} ${model}`
}

export function getShopStatus(isOpen: boolean, currentCapacity: number, maxCapacity: number): {
  status: 'open' | 'busy' | 'full' | 'closed'
  label: string
  color: string
} {
  if (!isOpen) {
    return { status: 'closed', label: 'Closed', color: 'red' }
  }
  
  const utilizationRate = currentCapacity / maxCapacity
  
  if (utilizationRate >= 1) {
    return { status: 'full', label: 'Full', color: 'red' }
  } else if (utilizationRate >= 0.8) {
    return { status: 'busy', label: 'Busy', color: 'yellow' }
  } else {
    return { status: 'open', label: 'Open', color: 'green' }
  }
}