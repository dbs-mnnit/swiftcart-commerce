import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, User, MapPin, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import { useCartStore, useCheckoutStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/storefront/Header';
import { toast } from 'sonner';

const steps = [
  { id: 'details', label: 'Your Details', icon: User },
  { id: 'address', label: 'Shipping Address', icon: MapPin },
  { id: 'review', label: 'Review & Pay', icon: CreditCard },
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCartStore();
  const { state, setStep, setCustomer, setShippingAddress, setSameAsShipping } = useCheckoutStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepIndex = steps.findIndex((s) => s.id === state.step);

  const validateCustomerDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.customer.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!state.customer.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.customer.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!state.customer.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(state.customer.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.shippingAddress.addressLine1?.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    if (!state.shippingAddress.city?.trim()) {
      newErrors.city = 'City is required';
    }
    if (!state.shippingAddress.state?.trim()) {
      newErrors.state = 'State is required';
    }
    if (!state.shippingAddress.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(state.shippingAddress.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (state.step === 'details') {
      if (validateCustomerDetails()) {
        setStep('address');
      }
    } else if (state.step === 'address') {
      if (validateAddress()) {
        setStep('review');
      }
    }
  };

  const handleBack = () => {
    if (state.step === 'address') {
      setStep('details');
    } else if (state.step === 'review') {
      setStep('address');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    // In production, this would integrate with Razorpay
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      clearCart();
      navigate(`/order-success/${orderId}`);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-premium py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to proceed to checkout</p>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-premium py-8 md:py-12">
        {/* Steps Indicator */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === state.step;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isCompleted
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className="text-xs mt-2 hidden md:block font-medium">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 md:w-24 h-0.5 mx-2 ${
                        isCompleted ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card-premium p-6 md:p-8">
              <AnimatePresence mode="wait">
                {state.step === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="font-display text-2xl font-bold mb-6">Your Details</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={state.customer.fullName || ''}
                          onChange={(e) => setCustomer({ fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={state.customer.email || ''}
                          onChange={(e) => setCustomer({ email: e.target.value })}
                          placeholder="your@email.com"
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={state.customer.phone || ''}
                          onChange={(e) => setCustomer({ phone: e.target.value })}
                          placeholder="9876543210"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name (Optional)</Label>
                        <Input
                          id="companyName"
                          value={state.customer.companyName || ''}
                          onChange={(e) => setCustomer({ companyName: e.target.value })}
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gstin">GSTIN (Optional)</Label>
                        <Input
                          id="gstin"
                          value={state.customer.gstin || ''}
                          onChange={(e) => setCustomer({ gstin: e.target.value })}
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {state.step === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="font-display text-2xl font-bold mb-6">Shipping Address</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="addressLine1">Address Line 1 *</Label>
                        <Input
                          id="addressLine1"
                          value={state.shippingAddress.addressLine1 || ''}
                          onChange={(e) => setShippingAddress({ addressLine1: e.target.value })}
                          placeholder="Street address, apartment, suite, etc."
                          className={errors.addressLine1 ? 'border-destructive' : ''}
                        />
                        {errors.addressLine1 && (
                          <p className="text-sm text-destructive mt-1">{errors.addressLine1}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                        <Input
                          id="addressLine2"
                          value={state.shippingAddress.addressLine2 || ''}
                          onChange={(e) => setShippingAddress({ addressLine2: e.target.value })}
                          placeholder="Building, floor, landmark, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={state.shippingAddress.city || ''}
                            onChange={(e) => setShippingAddress({ city: e.target.value })}
                            placeholder="Mumbai"
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={state.shippingAddress.pincode || ''}
                            onChange={(e) => setShippingAddress({ pincode: e.target.value })}
                            placeholder="400001"
                            className={errors.pincode ? 'border-destructive' : ''}
                          />
                          {errors.pincode && (
                            <p className="text-sm text-destructive mt-1">{errors.pincode}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={state.shippingAddress.state || ''}
                          onValueChange={(value) => setShippingAddress({ state: value })}
                        >
                          <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="text-sm text-destructive mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value="India"
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {state.step === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="font-display text-2xl font-bold mb-6">Review Your Order</h2>
                    
                    {/* Customer Details Summary */}
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Contact Details</h3>
                        <Button variant="ghost" size="sm" onClick={() => setStep('details')}>
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {state.customer.fullName}<br />
                        {state.customer.email}<br />
                        {state.customer.phone}
                      </p>
                    </div>

                    {/* Shipping Address Summary */}
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Shipping Address</h3>
                        <Button variant="ghost" size="sm" onClick={() => setStep('address')}>
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {state.shippingAddress.addressLine1}<br />
                        {state.shippingAddress.addressLine2 && <>{state.shippingAddress.addressLine2}<br /></>}
                        {state.shippingAddress.city}, {state.shippingAddress.state} - {state.shippingAddress.pincode}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.product.id} className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="font-semibold">
                              {formatPrice((item.product.discountedPrice || item.product.price) * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Estimate */}
                    <div className="p-4 border border-success/30 bg-success/5 rounded-lg flex items-start gap-3">
                      <Truck className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          5-7 business days after order confirmation
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                {state.step !== 'details' ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => navigate('/')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                )}

                {state.step !== 'review' ? (
                  <Button onClick={handleNext} className="bg-primary text-primary-foreground">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-primary text-primary-foreground min-w-[160px]"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Pay {formatPrice(getTotal())}
                        <CreditCard className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>
              
              <ScrollArea className="max-h-[300px] mb-6">
                <div className="space-y-4 pr-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice((item.product.discountedPrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {getShipping() === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(getShipping())
                    )}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Secure checkout with Razorpay
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Invoice & receipt sent to email
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  30-day easy returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
