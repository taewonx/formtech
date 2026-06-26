import type { PostureAnalysisResult } from '../../utils/angles';

interface AnglesFeedbackProps {
  exercise: 'squat' | 'deadlift';
  analysisResult: PostureAnalysisResult;
  isWebcam: boolean;
}

export function AnglesFeedback({ exercise, analysisResult }: AnglesFeedbackProps) {
  return (
    <div className="angles-panel mt-4 bg-card border border-border rounded-radius p-5">
      <h4 className="font-bold border-b border-border pb-2 mb-4 text-sm text-accent">
        📊 {exercise === 'squat' ? '스쿼트' : '데드리프트'} 실시간 폼 분석
      </h4>
      
      {/* 계측 데이터 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="angle-card bg-elevated rounded-lg p-3 flex flex-col">
          <span className="angle-label text-xs text-muted">무릎 각도</span>
          <span className="angle-value text-2xl font-bold text-accent">
            {analysisResult.kneeAngle}°
          </span>
        </div>
        <div className="angle-card bg-elevated rounded-lg p-3 flex flex-col">
          <span className="angle-label text-xs text-muted">골반 각도</span>
          <span className="angle-value text-2xl font-bold text-accent">
            {analysisResult.hipAngle}°
          </span>
        </div>
        <div className="angle-card bg-elevated rounded-lg p-3 flex flex-col">
          <span className="angle-label text-xs text-muted">등 각도</span>
          <span className="angle-value text-2xl font-bold text-accent">
            {analysisResult.backAngle}°
          </span>
        </div>
        <div className="angle-card bg-elevated rounded-lg p-3 flex flex-col">
          <span className="angle-label text-xs text-muted">깊이</span>
          <span className="angle-value text-lg font-bold text-accent uppercase">
            {analysisResult.depth}
          </span>
        </div>
      </div>

      {/* 실시간 텍스트 피드백 카드 */}
      <div
        className={`feedback-box p-4 rounded-lg border text-sm font-semibold flex items-center gap-3 ${
          analysisResult.status === 'danger'
            ? 'bg-red/10 border-red text-red'
            : analysisResult.status === 'warning'
            ? 'bg-yellow/10 border-yellow text-yellow'
            : 'bg-green/10 border-green text-green'
        }`}
      >
        <span className="text-xl">
          {analysisResult.status === 'danger'
            ? '🚨'
            : analysisResult.status === 'warning'
            ? '⚠️'
            : '✅'}
        </span>
        <p className="margin-0 leading-relaxed">
          {analysisResult.feedback}
        </p>
      </div>
    </div>
  );
}
