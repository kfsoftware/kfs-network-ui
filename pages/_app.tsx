import "../styles/globals.css";

import { usePolkadotExtension } from "@substra-hooks/core";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
const SubstraHooksProviderSSR = dynamic(
  () => import("../components/substra-hooks-provider"),
  {
    ssr: false,
  }
);
function ComponentWrapper({ children }: { children: React.ReactNode }) {
  const { accounts, w3enable, w3Enabled } = usePolkadotExtension();
  const [isPolkadotExtensionEnabled, setIsPolkadotExtensionEnabled] =
    useState(false);
  useEffect(() => {
    if (!w3Enabled) {
      w3enable();
      setIsPolkadotExtensionEnabled(true);
    }
  }, [w3enable, w3Enabled]);
  console.log(w3Enabled);

  return w3Enabled ? (
    <>{children}</>
  ) : isPolkadotExtensionEnabled ? (
    <a
      className="font-medium text-indigo-700 underline"
      href="https://polkadot.js.org/extension/"
      rel="noreferrer"
      target="_blank"
    >
      Install polkadot extension and create at least one acount
    </a>
  ) : (
    <p>Loading...</p>
  );
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubstraHooksProviderSSR
      apiProviderConfig={{
        kusama: {
          id: "kusama",
          wsProviderUrl: "wss://kusama-rpc.polkadot.io",
        },
        statemine: {
          id: "statemine",
          wsProviderUrl: "wss://kusama-statemine-rpc.paritytech.net",
        },
        // local: {
        //   id: "local",
        //   wsProviderUrl: "ws://localhost:9944",
        // },
        local: {
          id: "local",
          wsProviderUrl: "wss://wss.bootnode3.test.kfs.network",
        },
      }}
    >
      <ComponentWrapper>
        <Component {...pageProps} />
      </ComponentWrapper>
    </SubstraHooksProviderSSR>
  );
}

export default MyApp;
