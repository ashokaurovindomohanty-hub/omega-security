import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
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
import { useState } from "react";

const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const isBooted = useOmegaStore((s) => s.isBooted);
  const [showSim, setShowSim] = useState(false);

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
<div className="flex justify-end gap-2 p-2">
  <SignedOut><SignInButton mode="modal"><button className="px-4 py-2 bg-white text-black rounded">Sign In</button></SignInButton></SignedOut>
  <SignedIn><UserButton /></SignedIn>
</div>
        <StatusBar onSimClick={() => setShowSim(true)} />
        <main className="flex-1">
          <OmegaDashboard
            showSim={showSim}
            onSimClose={() => setShowSim(false)}
          />
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
