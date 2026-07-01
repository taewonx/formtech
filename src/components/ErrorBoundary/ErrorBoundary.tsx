import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-card p-8 rounded-2xl border border-red/30 max-w-lg">
            <div className="text-4xl mb-4">🚨</div>
            <h1 className="text-2xl font-bold text-red mb-2">앗! 문제가 발생했습니다.</h1>
            <p className="text-muted text-sm mb-6">
              일시적인 오류가 발생했습니다. 새로고침을 누르시거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-accent text-bg px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
