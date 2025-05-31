"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Textarea } from "@/components/ui/textarea"; // Update this path if your Textarea component is located elsewhere, e.g. "@/components/textarea" or "@/components/ui/Textarea"
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Home, Briefcase, Heart, Plus, MapPin } from "lucide-react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: AddressData) => void;
}

interface AddressData {
  city: string;
  area: string;
  houseNumber: string;
  floorNumber: string;
  blockSector: string;
  apartmentNumber: string;
  roadStreet: string;
  name: string;
  phoneNumber: string;
  deliveryNote: string;
  label: string;
}

const addressLabels = [
  { id: "home", label: "Home", icon: Home },
  { id: "workplace", label: "Workplace", icon: Briefcase },
  { id: "dear", label: "Dear", icon: Heart },
  { id: "other", label: "Other", icon: Plus },
];

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
}: AddressModalProps) {
  const [formData, setFormData] = useState<AddressData>({
    city: "Dhaka",
    area: "Badda, Dhaka",
    houseNumber: "cha 71/2",
    floorNumber: "",
    blockSector: "",
    apartmentNumber: "",
    roadStreet: "Matabbar",
    name: "01785250717",
    phoneNumber: "+88 01785250717",
    deliveryNote: "",
    label: "home",
  });

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-[600px]">
          {/* Map Section */}
          <div className="flex-1 relative bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive Map</p>
                <p className="text-xs text-gray-500">
                  Click to select delivery location
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-red-700">
                  Use the map pin to select the delivery area.
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-96 flex flex-col">
            <DialogHeader className="p-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">
                  Add new address
                </DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* City and Area */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="area" className="text-sm font-medium">
                    Area <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.area}
                    onValueChange={(value) => handleInputChange("area", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Badda, Dhaka">Badda, Dhaka</SelectItem>
                      <SelectItem value="Gulshan, Dhaka">
                        Gulshan, Dhaka
                      </SelectItem>
                      <SelectItem value="Dhanmondi, Dhaka">
                        Dhanmondi, Dhaka
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* House Number and Floor Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="houseNumber" className="text-sm font-medium">
                    House number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="houseNumber"
                    value={formData.houseNumber}
                    onChange={(e) =>
                      handleInputChange("houseNumber", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="floorNumber" className="text-sm font-medium">
                    Floor number
                  </Label>
                  <Input
                    id="floorNumber"
                    value={formData.floorNumber}
                    onChange={(e) =>
                      handleInputChange("floorNumber", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Block/Sector and Apartment Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="blockSector" className="text-sm font-medium">
                    Block/Sector
                  </Label>
                  <Input
                    id="blockSector"
                    value={formData.blockSector}
                    onChange={(e) =>
                      handleInputChange("blockSector", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="apartmentNumber"
                    className="text-sm font-medium"
                  >
                    Apartment number
                  </Label>
                  <Input
                    id="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={(e) =>
                      handleInputChange("apartmentNumber", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Road/Street */}
              <div>
                <Label htmlFor="roadStreet" className="text-sm font-medium">
                  Road/Street <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="roadStreet"
                  value={formData.roadStreet}
                  onChange={(e) =>
                    handleInputChange("roadStreet", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone number
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              {/* Delivery Note */}
              <div>
                <Label htmlFor="deliveryNote" className="text-sm font-medium">
                  Delivery note
                </Label>
                <Textarea
                  id="deliveryNote"
                  placeholder="Place it in front of the door, do not ring the bell, next to the mosque, etc."
                  value={formData.deliveryNote}
                  onChange={(e) =>
                    handleInputChange("deliveryNote", e.target.value)
                  }
                  className="mt-1 min-h-[60px]"
                />
              </div>

              {/* Add Label */}
              <div>
                <Label className="text-sm font-medium">Add label</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {addressLabels.map((labelOption) => {
                    const IconComponent = labelOption.icon;
                    return (
                      <button
                        key={labelOption.id}
                        type="button"
                        onClick={() =>
                          handleInputChange("label", labelOption.id)
                        }
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors ${
                          formData.label === labelOption.id
                            ? "border-red-300 bg-red-50 text-red-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-xs">{labelOption.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="p-6 pt-4 border-t">
              <Button
                onClick={handleSave}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Save address
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
