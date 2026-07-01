import type { PostureAnalysisResult } from '../../utils/angles';

interface AnglesFeedbackProps {
  exercise: 'squat' | 'deadlift';
  analysisResult: PostureAnalysisResult;
  isWebcam: boolean;
}

export function AnglesFeedback({ analysisResult }: AnglesFeedbackProps) {
  return (
    <div className="absolute top-4 right-4 w-48 flex flex-col gap-2 z-20 pointer-events-none">
      {/* 실시간 텍스트 피드백 배너 (상단) */}
      <div
        className={`p-3 rounded-xl shadow-lg backdrop-blur-md border text-sm font-bold flex items-start gap-2 ${
          analysisResult.status === 'danger'
            ? 'bg-red/80 border-red text-white'
            : analysisResult.status === 'warning'
            ? 'bg-yellow/80 border-yellow text-white'
            : 'bg-green/80 border-green text-white'
        } animate-fade-in`}
      >
        <span className="text-lg leading-none mt-0.5">
          {analysisResult.status === 'danger'
            ? '🚨'
            : analysisResult.status === 'warning'
            ? '⚠️'
            : '✅'}
        </span>
        <p className="margin-0 leading-tight">
          {analysisResult.feedback}
        </p>
      </div>

      {/* 계측 데이터 HUD */}
      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center p-1 bg-white/5 rounded-lg">
            <span className="text-[10px] text-white/60">KNEE</span>
            <span className="text-sm font-bold text-accent">{analysisResult.kneeAngle}°</span>
          </div>
          <div className="flex flex-col items-center p-1 bg-white/5 rounded-lg">
            <span className="text-[10px] text-white/60">HIP</span>
            <span className="text-sm font-bold text-accent">{analysisResult.hipAngle}°</span>
          </div>
          <div className="flex flex-col items-center p-1 bg-white/5 rounded-lg">
            <span className="text-[10px] text-white/60">BACK</span>
            <span className="text-sm font-bold text-accent">{analysisResult.backAngle}°</span>
          </div>
          <div className="flex flex-col items-center p-1 bg-white/5 rounded-lg">
            <span className="text-[10px] text-white/60">DEPTH</span>
            <span className="text-sm font-bold text-accent uppercase">{analysisResult.depth}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
