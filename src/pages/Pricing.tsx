import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, CheckCircle } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 149,
      period: "per shop/month",
      description: "Perfect for small independent shops",
      features: [
        "Up to 2 service bays",
        "Digital inspections",
        "Basic customer communication",
        "Parts ordering",
        "Mobile app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: 149,
      additionalBay: 29,
      period: "per shop + $29/bay/month",
      description: "Ideal for growing repair shops",
      features: [
        "Unlimited service bays",
        "Advanced inspections with video",
        "Automated customer updates",
        "Multi-supplier parts ordering",
        "Warranty tracking",
        "Business analytics",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "For multi-location operations",
      features: [
        "Multiple shop locations",
        "Advanced reporting",
        "Custom integrations",
        "Dedicated account manager",
        "On-site training",
        "24/7 phone support"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-automotive-red" />
              <span className="text-2xl font-bold text-white">AutoFlow</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/signup">
                <Button variant="automotive" size="sm">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that scales with your business. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-automotive-red scale-105' : ''} mechanic-card text-white border-gray-600`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="bg-automotive-red">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-automotive-red">
                    ${plan.price}
                    {plan.additionalBay && <span className="text-lg text-gray-400"> + ${plan.additionalBay}/bay</span>}
                  </div>
                  <CardDescription className="text-gray-400">{plan.period}</CardDescription>
                  <p className="text-gray-300">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button 
                      variant={plan.popular ? "automotive" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How does the free trial work?</h3>
                <p className="text-gray-300">You get full access to all features for 14 days. No credit card required to start.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I change plans later?</h3>
                <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300">We accept all major credit cards and ACH bank transfers for annual plans.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Is there a setup fee?</h3>
                <p className="text-gray-300">No setup fees. We'll help you get started with free onboarding and training.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-300">Yes, you can cancel your subscription at any time. No long-term contracts required.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Do you offer discounts for annual plans?</h3>
                <p className="text-gray-300">Yes, save 20% when you pay annually. Contact sales for enterprise discounts.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 1,500+ auto repair shops using AutoFlow to grow their business
            </p>
            <Link to="/signup">
              <Button variant="automotive" size="xl">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}