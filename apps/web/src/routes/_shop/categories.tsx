import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "~/features/shop/view/collection-page";

export const Route = createFileRoute("/_shop/categories")({
  component: CategoriesRouteComponent,
});

function CategoriesRouteComponent() {
  return <CollectionPage mode="categories" />;
}
