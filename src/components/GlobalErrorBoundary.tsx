import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", background: "#f8d7da", color: "#721c24", minHeight: "100vh", fontFamily: "monospace" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>App Crashed</h1>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.error?.toString()}</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "white", padding: "10px", marginTop: "16px", borderRadius: "4px" }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", background: "white", padding: "10px", marginTop: "16px", borderRadius: "4px" }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
