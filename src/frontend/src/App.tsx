import BootSequence from "@/components/BootSequence";
import StatusBar from "@/components/StatusBar";
import OmegaDashboard from "@/pages/OmegaDashboard";
import { useOmegaStore } from "@/store/omegaStore";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const isBooted = useOmegaStore((s) => s.isBooted);

  return (
    <div className="dark min-h-screen" style={{ background: "#0a0e27" }}>
      {!isBooted && <BootSequence />}
      <div
        style={{
          opacity: isBooted ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StatusBar />
        <main className="flex-1">
          <OmegaDashboard />
        </main>
      </div>
    </div>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => null,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
