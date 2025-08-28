import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Car, Eye, EyeOff, CheckCircle } from 'lucide-react'

export function Signup() {
  const [formData, setFormData] = useState({
    shopName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bays: 2,
    address: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      // In real app, redirect to onboarding or dashboard
      window.location.href = '/dashboard'
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateMonthlyPrice = () => {
    const basePrice = 149
    const additionalBays = Math.max(0, formData.bays - 1)
    const bayPrice = additionalBays * 29
    return basePrice + bayPrice
  }

  const features = [
    "Digital vehicle inspections",
    "Automated parts ordering", 
    "Customer communication hub",
    "Warranty tracking",
    "Mobile customer portal",
    "Business analytics"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Car className="h-8 w-8 text-automotive-red" />
            <span className="text-2xl font-bold text-white">AutoFlow</span>
          </Link>
          <p className="text-gray-400 mt-2">Start your 14-day free trial</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Signup Form */}
          <div className="lg:col-span-2">
            <Card className="mechanic-card border-gray-600">
              <CardHeader>
                <CardTitle className="text-xl text-white">Create Your Account</CardTitle>
                <CardDescription className="text-gray-300">
                  Get started with AutoFlow in less than 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Shop Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Shop Information</h3>
                    
                    <div>
                      <label htmlFor="shopName" className="block text-sm font-medium text-gray-300 mb-2">
                        Shop Name *
                      </label>
                      <Input
                        id="shopName"
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => handleInputChange('shopName', e.target.value)}
                        placeholder="Your Auto Shop Name"
                        required
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                        Address *
                      </label>
                      <Input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="123 Main St, City, State 12345"
                        required
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="bays" className="block text-sm font-medium text-gray-300 mb-2">
                        Number of Service Bays *
                      </label>
                      <select
                        id="bays"
                        value={formData.bays}
                        onChange={(e) => handleInputChange('bays', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} bay{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="space-y-4 pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-white">Owner Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          required
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Smith"
                          required
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@yourshop.com"
                        required
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Create a strong password"
                          required
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirm your password"
                          required
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-automotive-red focus:ring-automotive-red border-gray-600 rounded bg-gray-800 mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-automotive-red hover:text-automotive-darkRed">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-automotive-red hover:text-automotive-darkRed">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="automotive"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Start Free Trial'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-automotive-red hover:text-automotive-darkRed font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Features */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="bg-automotive-red border-automotive-darkRed">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="w-fit mx-auto mb-2">14-Day Free Trial</Badge>
                <CardTitle className="text-2xl text-white">Your Plan</CardTitle>
                <div className="text-4xl font-bold text-white">
                  ${calculateMonthlyPrice()}
                  <span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription className="text-red-100">
                  ${149} base + ${29} per additional bay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-red-100">
                  <div className="text-sm mb-2">For {formData.shopName || 'Your Shop'}</div>
                  <div className="text-sm">{formData.bays} service bay{formData.bays > 1 ? 's' : ''}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-red-400">
                  <div className="text-center text-red-100 text-sm">
                    <div>✓ No credit card required</div>
                    <div>✓ Cancel anytime</div>
                    <div>✓ Full feature access</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mechanic-card border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="bg-blue-900/50 border-blue-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-blue-100 mb-2">Trusted by 1,500+ Shops</h3>
                  <div className="grid grid-cols-2 gap-4 text-blue-200 text-sm">
                    <div>
                      <div className="text-xl font-bold">25%</div>
                      <div>Revenue Increase</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">40%</div>
                      <div>Time Savings</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">4.8/5</div>
                      <div>Customer Rating</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">99%</div>
                      <div>Uptime</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}