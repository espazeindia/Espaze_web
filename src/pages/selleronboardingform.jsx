import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SellerOnboarding() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <Card className="w-full max-w-4xl shadow-xl border rounded-2xl bg-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Seller Onboarding – Basic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller Name */}
            <div>
              <Label className="block mb-2 text-gray-700">Seller Name</Label>
              <Input placeholder="Enter seller name" />
            </div>

            {/* Phone Number */}
            <div>
              <Label className="block mb-2 text-gray-700">Phone Number</Label>
              <Input type="tel" placeholder="Enter phone number" />
            </div>

            {/* Shop Address */}
            <div className="md:col-span-2">
              <Label className="block mb-2 text-gray-700">Shop Address</Label>
              <Input placeholder="Enter shop address" />
            </div>

            {/* PAN */}
            <div>
              <Label className="block mb-2 text-gray-700">PAN</Label>
              <Input placeholder="Enter PAN" />
            </div>

            {/* GSTIN */}
            <div>
              <Label className="block mb-2 text-gray-700">GSTIN</Label>
              <Input placeholder="Enter GSTIN" />
            </div>

            {/* Company Registered Name */}
            <div>
              <Label className="block mb-2 text-gray-700">
                Company Registered Name
              </Label>
              <Input placeholder="Enter company registered name" />
            </div>

            {/* Shop Name */}
            <div>
              <Label className="block mb-2 text-gray-700">Shop Name</Label>
              <Input placeholder="Enter shop name" />
            </div>

            {/* Security Pin */}
            <div>
              <Label className="block mb-2 text-gray-700">Security PIN</Label>
              <Input type="password" placeholder="Enter 6-digit pin" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg">
              Save & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
