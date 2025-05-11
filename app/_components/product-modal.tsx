"use client"

import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingBagIcon, X, Minus, Plus, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductImage {
  url: string
}

interface Category {
  name: string
}

interface Product {
  id?: string
  name: string
  description: string
  mrp: string
  sellingPice: string
  ItemQuantityType: string
  image?: ProductImage[]
  categories?: Category[]
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("10 Kg")
  const [selectedImage, setSelectedImage] = useState(0)

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""

  const mainImgUrl = product.image?.[selectedImage]?.url
    ? product.image[selectedImage].url.startsWith("http")
      ? product.image[selectedImage].url
      : baseUrl + product.image[selectedImage].url
    : "/placeholder.svg?height=500&width=500"

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const category = product.categories?.[0]?.name || "Uncategorized"
  const inStock = true // You can replace this with actual stock check
  const stockCount = 79 // You can replace this with actual stock count

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image Section */}
          <div className="p-6 bg-gray-50">
            <div className="relative mb-4">
              <Image
                src={mainImgUrl || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-md"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(Math.max(product.image?.length || 1, 4))].map((_, index) => {
                const thumbUrl = product.image?.[index]?.url
                  ? product.image[index].url.startsWith("http")
                    ? product.image[index].url
                    : baseUrl + product.image[index].url
                  : "/placeholder.svg?height=100&width=100"

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImage === index ? "border-green-600" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={thumbUrl || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-14 h-14 object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6">
            <div className="mb-1 text-sm text-gray-500">Freshgo-Webibazaar</div>

            <DialogTitle className="text-xl font-bold mb-2">{product.name}</DialogTitle>

            <div className="text-2xl font-bold mb-4">৳{product.sellingPice}</div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex gap-2">
                {["5 Kg", "10 Kg", "25 Kg"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-md px-3 py-1.5 text-sm ${
                      selectedSize === size ? "border-green-600 bg-green-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {inStock && (
              <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                In stock ({stockCount} units), ready to be shipped
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="border-t border-b border-gray-300 px-4 py-1.5">{quantity}</div>
                <button
                  onClick={incrementQuantity}
                  className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Add To Cart
              </Button>
              <Button variant="outline" className="w-full">
                Buy It Now
              </Button>
              <Button variant="ghost" className="w-full flex items-center justify-center">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>

            <div className="text-sm text-gray-700">
              <p className="mb-2">{product.description}</p>
              <p>
                Category: <span className="font-medium">{category}</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}