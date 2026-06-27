import { Spinner } from "@heroui/react";
import React from "react";

const loadingPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Spinner color="indigo" size="lg" label="Syncing TaskForge Matrices..." />
    </div>
  );
};

export default loadingPage;
