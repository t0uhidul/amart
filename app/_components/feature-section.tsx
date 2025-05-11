import { Headphones, Truck, DollarSign, Gift } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Affordable Grocery Delivery",
      description:
        "Enjoy doorstep delivery starting at just ৳40. For orders over 10kg, a minimal charge of ৳10 per extra kg applies.",
    },
    {
      icon: DollarSign,
      title: "Transparent Shipping Costs",
      description:
        "No hidden fees—just a flat ৳40 for up to 10kg. Add more, and pay only ৳10 per kg after that.",
    },
    {
      icon: Headphones,
      title: "Always Here to Help",
      description:
        "Our support team is available 24/7 to assist with your orders, shipping questions, and more.",
    },
    {
      icon: Gift,
      title: "Earn Rewards on Every Order",
      description:
        "Get points with each delivery and redeem for discounts or free shipping on your next grocery run.",
    },
  ];

  return (
    <section className="py-12 bg-white h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-[#f2f5e9] rounded-full p-4 mb-4 w-16 h-16 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
