import { Spinner } from "@heroui/react";

const LoadingPage = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
