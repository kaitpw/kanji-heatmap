import { Component, ErrorInfo, ReactNode } from "react";
import { DefaultErrorFallback } from "./DefaultErrorFallback";
import { useNetworkState } from "@/hooks/use-network-state";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
  details?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryRaw extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error(
      "ErrorBoundary caught an error:",
      error,
      errorInfo,
      this.props.details
    );

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />;
    }

    return this.props.children;
  }
}

const offlineMessage = `This feature isn’t cached yet 😅—Try it out once while online, and it'll be available anytime, anywhere—even offline! 📱✨`;
const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const network = useNetworkState();
  const offline = !network.online;
  return (
    <ErrorBoundaryRaw
      {...props}
      fallback={
        (props.fallback ?? offline) ? (
          <DefaultErrorFallback
            message={offlineMessage}
            showDefaultCta={false}
          />
        ) : null
      }
    />
  );
};

export default ErrorBoundary;
