import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "~/features/shop/view/collection-page";

export const Route = createFileRoute("/_shop/best-sellers")({
  component: BestSellersRouteComponent,
});

function BestSellersRouteComponent() {
  return <CollectionPage mode="best-sellers" />;
}
