import React from "react";
import { ErrorBoundary } from "src/components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQuery } from "react-query";
import * as auth from "utils/auth-provider";
import { http } from "utils/http";

const AuthenticatedApp = React.lazy(
  () => import("./screens/authenticated-app")
);
const UnauthenticatedApp = React.lazy(
  () => import("./screens/unauthenticated-app")
);

function App() {
  const bootstrapUser = async () => {
    let data = null;
    const token = auth.getToken();
    if (token) {
      data = await http("me", { token });
    }
    return data;
  };
  const result = useQuery("auth", bootstrapUser, {
    retry: 0,
  });

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {!result.isFetching && !result.data && <UnauthenticatedApp />}
          {result.isSuccess && result.data && <AuthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
