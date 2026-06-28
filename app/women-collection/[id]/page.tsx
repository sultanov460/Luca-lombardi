import { womenCatalog } from "@/data/catalog";
import Details from "@/widgets/Details";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = womenCatalog.find((p) => p.id === String(id));

  return {
    title: product ? product.title : "Product not found",
  };
}

export default async function WomenDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = womenCatalog.find((p) => p.id === String(id));

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return <Details product={product} />;
}
