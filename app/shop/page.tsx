import { ProductSection } from '@/component/ProductSection'
import React from 'react'
import ShopBanner from './ShopBanner'

const ShopPage = () => {
  return (
    <section className=" py-2 md:py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <ShopBanner />
        <ProductSection />
      </div>
    </section>
  )
}

export default ShopPage
