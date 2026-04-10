import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      let isFirebaseError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            isFirebaseError = true;
            errorMessage = `Lỗi hệ thống (${parsed.operationType}): ${parsed.error}`;
          }
        }
      } catch (e) {
        // Not a JSON error message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Rất tiếc!</h2>
            <p className="text-slate-400 mb-8">
              {errorMessage}
            </p>
            {isFirebaseError && (
              <p className="text-xs text-slate-500 mb-8 italic">
                Gợi ý: Kiểm tra kết nối mạng hoặc cấu hình Firebase của bạn.
              </p>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <RefreshCcw className="w-5 h-5" />
              TẢI LẠI TRANG
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
