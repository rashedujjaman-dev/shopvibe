import ProductDetails from "@/component/ProductDetails";
import { sampleProducts } from "@/data/products";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

 
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="mt-2 text-gray-500">
          The product with ID &quot;{id}&quot; does not exist.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}