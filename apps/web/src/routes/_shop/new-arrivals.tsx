import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "~/features/shop/view/collection-page";

export const Route = createFileRoute("/_shop/new-arrivals")({
  component: NewArrivalsRouteComponent,
});

function NewArrivalsRouteComponent() {
  return <CollectionPage mode="new-arrivals" />;
}
