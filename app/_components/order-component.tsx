import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image src="/placeholder.svg?height=40&width=40" alt="Freshgo Logo" width={40} height={40} className="mr-2" />
          <h1 className="text-xl font-semibold text-green-600">Freshgo</h1>
        </div>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Contact Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Contact</h2>
              <button className="text-sm text-green-600 hover:underline">Log in</button>
            </div>
            <div className="space-y-4">
              <div>
                <Input type="tel" placeholder="Email or mobile phone number" className="w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email-updates" />
                <Label htmlFor="email-updates" className="text-sm">
                  Email me with news and offers
                </Label>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Delivery</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="country" className="text-sm">
                  Country/Region
                </Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input placeholder="First name (optional)" />
                </div>
                <div>
                  <Input placeholder="Last name" />
                </div>
              </div>
              <div>
                <Input placeholder="Address" />
              </div>
              <div>
                <Input placeholder="Apartment, suite, etc. (optional)" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input placeholder="City" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input placeholder="ZIP code" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="save-info" />
                <Label htmlFor="save-info" className="text-sm">
                  Save this information for next time
                </Label>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="text-lg font-medium mb-4">Shipping method</h2>
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              Enter your shipping address to view available shipping methods.
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Payment</h2>
            <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
            <div className="border rounded-md">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border border-green-600 flex items-center justify-center mr-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  </div>
                  <span>Credit card</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <Input placeholder="Card number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Expiration date (MM / YY)" />
                  </div>
                  <div>
                    <Input placeholder="Security code" />
                  </div>
                </div>
                <div>
                  <Input placeholder="Name on card" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="billing-same" defaultChecked />
                  <Label htmlFor="billing-same" className="text-sm">
                    Use shipping address as billing address
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              {/* Cart Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                    <div className="absolute top-0 left-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                      2
                    </div>
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Onion"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Onion - Organically Grown</p>
                    <p className="text-sm text-gray-500">10 kg</p>
                  </div>
                </div>
                <p className="font-medium">$2,070.00</p>
              </div>

              {/* Cart Item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                    <div className="absolute top-0 left-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                      1
                    </div>
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Pomegranate"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Pomegranate - Small</p>
                  </div>
                </div>
                <p className="font-medium">$280.00</p>
              </div>

              <Separator className="my-4" />

              {/* Subtotal */}
              <div className="flex justify-between">
                <p>Subtotal - 3 items</p>
                <p className="font-medium">$2,350.00</p>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-gray-500">Enter shipping address</p>
              </div>

              <Separator className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Total</p>
                  <p className="text-sm text-gray-500">USD</p>
                </div>
                <p className="text-xl font-bold">$2,950.00</p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Complete order</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}