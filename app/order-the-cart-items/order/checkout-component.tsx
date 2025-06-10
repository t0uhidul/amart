"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Tag,
  ChevronDown,
  MapPin,
  Check,
  AlertCircle,
  Truck,
  FileText,
} from "lucide-react";
import AddressModal from "./address-modal";

export default function CheckoutComponent() {
  const [note, setNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddAddress = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);

  // Optional: handle saving the address
  const handleSaveAddress = (addressData) => {
    // Save address logic here
    setIsAddressModalOpen(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponExpanded) {
      setCouponExpanded(true);
      return;
    }

    if (couponCode.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setCouponApplied(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-3 text-xs">
      {/* Delivery Address Section */}
      <Card className="shadow-sm">
        <CardHeader className="bg-primary text-white py-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <CardTitle className="text-xs font-semibold">
                Delivery Address
              </CardTitle>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddAddress}
              className="bg-white/20 hover:bg-white/30 text-white h-6 px-2 text-[10px]"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add New
            </Button>
            {/* Address Modal */}
            <AddressModal
              isOpen={isAddressModalOpen}
              onClose={handleCloseAddressModal}
              onSave={handleSaveAddress}
            />
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <div>
              <p className="text-amber-800 text-xs font-medium">
                No delivery address selected
              </p>
              <p className="text-amber-600 text-[10px]">
                Please add a delivery address
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method + Coupon Row */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Shipping Method */}
        <Card className="w-full md:w-1/2 shadow-sm">
          <CardHeader className="py-2 px-3">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-green-600" />
              <CardTitle className="text-xs font-semibold">
                Shipping Method
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex items-center justify-between px-2 py-1.5 border border-green-200 bg-green-50 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-800">
                    Standard Delivery
                  </p>
                  <p className="text-[10px] text-green-600">
                    3-5 business days
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-[10px] h-4"
              >
                Free
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Section */}
        <Card className="w-full md:w-1/2 shadow-sm">
          <CardContent className="p-2 space-y-1.5">
            <button
              onClick={handleApplyCoupon}
              className="flex items-center justify-between w-full text-left group"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-100 rounded-md group-hover:bg-red-200">
                  <Tag className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <span className="text-xs font-semibold">Apply Coupon</span>
                  {couponApplied && (
                    <p className="text-[10px] text-green-600">
                      Coupon applied successfully!
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-3 h-3 text-gray-500 transition-transform ${
                  couponExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {couponExpanded && (
              <div className="space-y-1">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-7 text-xs"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim() || isLoading}
                    className="h-7 text-xs bg-red-500 hover:bg-red-600"
                  >
                    {isLoading ? "Applying..." : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <div className="flex items-center gap-1 text-green-600 text-[10px]">
                    <Check className="w-3 h-3" />
                    <span>Coupon "SAVE10" applied - ৳39 discount</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Note Section */}
      <Card className="shadow-sm">
        <CardHeader className="py-2 px-3">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-blue-600" />
            <CardTitle className="text-xs font-semibold">Order Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-2 space-y-1">
          <Textarea
            placeholder="Add special instructions"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[50px] text-xs resize-none"
          />
          <p className="text-[10px] text-gray-500">
            Example: Leave at door, call upon arrival, etc.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
