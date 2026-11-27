import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "~/features/shop/view/collection-page";

export const Route = createFileRoute("/_shop/promo")({
  component: PromoRouteComponent,
});

function PromoRouteComponent() {
  return <CollectionPage mode="promo" />;
}
