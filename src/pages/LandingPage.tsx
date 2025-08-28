import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ModernCard } from '@/components/ui/modern-card'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { ModernInput } from '@/components/ui/modern-input'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { 
  Camera, 
  ShoppingCart, 
  MessageSquare, 
  Shield, 
  Smartphone,
  Car,
  CheckCircle,
  BarChart3,
  Menu,
  X,
  Play,
  Star
} from 'lucide-react'

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Camera,
      title: "Digital Vehicle Inspections",
      description: "Capture high-quality photos and videos with built-in templates for comprehensive vehicle documentation",
      benefit: "Reduce inspection time by 40%"
    },
    {
      icon: ShoppingCart,
      title: "Automated Parts Ordering",
      description: "Connect with multiple suppliers, compare prices, and automatically generate purchase orders",
      benefit: "Save 3 hours daily on parts management"
    },
    {
      icon: MessageSquare,
      title: "Customer Communication Hub",
      description: "Send automated updates via SMS and email with real-time repair progress and cost estimates",
      benefit: "Increase customer satisfaction by 60%"
    },
    {
      icon: Shield,
      title: "Smart Warranty Tracking",
      description: "Automated warranty reminders and follow-up campaigns to drive repeat business",
      benefit: "Boost repeat customers by 35%"
    },
    {
      icon: Smartphone,
      title: "Mobile Customer Portal",
      description: "Customers access service history, photos, and communicate directly through mobile app",
      benefit: "Reduce phone calls by 50%"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track KPIs, bay utilization, technician performance, and revenue optimization",
      benefit: "Increase profit margins by 25%"
    }
  ]

  const testimonials = [
    {
      name: "Mike Rodriguez",
      shop: "Rodriguez Auto Repair",
      location: "Phoenix, AZ",
      quote: "AutoFlow transformed our shop from paper chaos to digital efficiency. We've increased our monthly revenue by $15,000 since switching.",
      rating: 5,
      savings: "$15,000/month increase"
    },
    {
      name: "Sarah Chen",
      shop: "Precision Motors",
      location: "Seattle, WA", 
      quote: "The digital inspections alone save us 2 hours per vehicle. Our customers love the transparency and photo documentation.",
      rating: 5,
      savings: "2 hours saved per vehicle"
    },
    {
      name: "David Thompson",
      shop: "Thompson's Garage",
      location: "Austin, TX",
      quote: "AutoFlow's parts ordering system cut our supplier management time in half. We focus on repairs, not paperwork.",
      rating: 5,
      savings: "50% less admin time"
    }
  ]

  const pricingPlans = [
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
    <AnimatedBackground variant="automotive" className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-automotive-red/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-automotive-red" />
              <span className="text-2xl font-bold text-white">AutoFlow</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/signup">
                <EnhancedButton variant="automotive" size="sm">Start Free Trial</EnhancedButton>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link to="/signup">
                  <EnhancedButton variant="automotive" size="sm" className="w-full">Start Free Trial</EnhancedButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Floating background elements */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 bg-automotive-red/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -top-10 -right-20 w-60 h-60 bg-automotive-orange/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="info" className="mb-6 backdrop-blur-sm">
              Trusted by 1,500+ Auto Repair Shops
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Modernize Your
            <motion.span 
              className="automotive-gradient bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            > Auto Shop</motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform paper-based workflows into digital efficiency. AutoFlow helps repair shops 
            increase revenue by 25% through automated inspections, parts ordering, and customer communication.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/signup">
              <EnhancedButton variant="automotive" size="xl" className="w-full sm:w-auto">
                Start 14-Day Free Trial
              </EnhancedButton>
            </Link>
            <EnhancedButton variant="outline" size="xl" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-gray-900" icon={<Play className="w-5 h-5" />}>
              Watch Demo
            </EnhancedButton>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { value: '$4.4M', label: 'Total ARR Potential' },
              { value: '1,500', label: 'Target Shops' },
              { value: '25%', label: 'Revenue Increase' },
              { value: '40%', label: 'Time Savings' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <motion.div 
                  className="text-3xl font-bold text-automotive-red group-hover:text-automotive-orange transition-colors duration-300"
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(229, 62, 62, 0.5)',
                      '0 0 20px rgba(229, 62, 62, 0.8)',
                      '0 0 0px rgba(229, 62, 62, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything Your Shop Needs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Replace outdated paper systems with modern digital tools designed specifically for auto repair shops
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <ModernCard variant="automotive" className="group h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="p-2 bg-gradient-to-r from-automotive-red to-automotive-orange rounded-lg shadow-lg shadow-automotive-red/30"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="h-6 w-6" />
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4">
                      {feature.description}
                    </CardDescription>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <Badge variant="success" className="text-xs">
                        {feature.benefit}
                      </Badge>
                    </motion.div>
                  </CardContent>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Shop Owners
            </h2>
            <p className="text-xl text-gray-300">
              See how AutoFlow is transforming auto repair shops across America
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <ModernCard variant="glass" className="group h-full">
                  <CardHeader>
                    <motion.div 
                      className="flex items-center space-x-1 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.5 + index * 0.1 + i * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Star className="h-4 w-4 fill-automotive-red text-automotive-red" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {testimonial.shop} • {testimonial.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <Badge variant="success">
                        {testimonial.savings}
                      </Badge>
                    </motion.div>
                  </CardContent>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that scales with your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.05 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: plan.popular ? 1.08 : 1.03 }}
              >
                <ModernCard variant={plan.popular ? "neon" : "automotive"} className={`relative group h-full ${plan.popular ? 'ring-2 ring-automotive-red shadow-2xl shadow-automotive-red/20' : ''}`}>
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      animate={{ 
                        y: [-2, 2, -2],
                        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Badge variant="default" className="bg-automotive-red">Most Popular</Badge>
                    </motion.div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <motion.div 
                      className="text-4xl font-bold text-automotive-red"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ${plan.price}
                      {plan.additionalBay && <span className="text-lg text-gray-400"> + ${plan.additionalBay}/bay</span>}
                    </motion.div>
                    <CardDescription className="text-gray-400">{plan.period}</CardDescription>
                    <p className="text-gray-300">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + featureIndex * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          </motion.div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link to="/signup">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EnhancedButton 
                          variant={plan.popular ? "automotive" : "outline"} 
                          className="w-full"
                          size="lg"
                        >
                          {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                        </EnhancedButton>
                      </motion.div>
                    </Link>
                  </CardContent>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Shop?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 1,500+ repair shops already using AutoFlow to increase revenue and efficiency
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <ModernInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="glass"
              className="max-w-sm text-white placeholder:text-gray-400"
            />
            <Link to="/signup">
              <EnhancedButton variant="automotive" size="lg">
                Start Free 14-Day Trial
              </EnhancedButton>
            </Link>
          </div>
          
          <p className="text-gray-400">
            No credit card required • Cancel anytime • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-automotive-red" />
                <span className="text-2xl font-bold text-white">AutoFlow</span>
              </div>
              <p className="text-gray-400">
                Modern auto repair shop management for the digital age.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AnimatedBackground>
  )
}