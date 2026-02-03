import { womenCatalog } from "@/data/catalog";
import Details from "@/widgets/Details";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WomenDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = womenCatalog.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return <Details product={product} />;
}
