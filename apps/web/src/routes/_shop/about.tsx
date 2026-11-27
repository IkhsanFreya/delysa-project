import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "~/features/shop/view/about-page";

export const Route = createFileRoute("/_shop/about")({
  component: AboutRouteComponent,
});

function AboutRouteComponent() {
  return <AboutPage />;
}
