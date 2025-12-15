"use client";
// import { PageLoading } from "@/components/shared/page-loading";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<PageLoading />} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}{" "}
    </Provider>
  );
};

export default ReduxProvider;
