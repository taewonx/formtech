import type { RepRecord } from '../../types';
import { Link } from 'react-router-dom';

interface RepsListPanelProps {
  exercise: 'squat' | 'deadlift';
  reps: RepRecord[];
  isWebcam: boolean;
  onSeek?: (time: number) => void;
  onSaveSession: () => void;
  saveSuccessMsg: string | null;
  aiScore: number;
  aiFeedbackText: string;
}

export function RepsListPanel({
  reps,
  isWebcam,
  onSeek,
  onSaveSession,
  saveSuccessMsg,
  aiScore,
  aiFeedbackText,
}: RepsListPanelProps) {
  const goodReps = reps.filter((r) => r.isGood).length;
  const accuracy = reps.length > 0 ? Math.round((goodReps / reps.length) * 100) : 0;

  return (
    <div className="reps-summary-panel bg-card border border-border rounded-radius p-5">
      <h4 className="font-bold mb-2">📊 이번 세트 기록</h4>
      <div className="flex gap-4 items-baseline mb-4 bg-elevated p-3 rounded-lg border border-border">
        <div>
          <span className="text-xs text-muted block">총 횟수</span>
          <span className="text-3xl font-bold">{reps.length}</span>
        </div>
        <div>
          <span className="text-xs text-muted block">좋은 폼</span>
          <span className="text-3xl font-bold text-green">{goodReps}</span>
        </div>
        <div className="ml-auto text-right">
          <span className="text-xs text-muted block">폼 정확도</span>
          <span className="text-xl font-bold text-accent">{accuracy}%</span>
        </div>
      </div>

      {reps.length > 0 && (
        <div className="ai-score-panel mb-4 p-4 bg-elevated border border-accent/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-bold text-accent">💯 AI 자세 평가 점수</h5>
            <span className="text-2xl font-black text-accent">{aiScore}점</span>
          </div>
          <p className="text-sm mb-3 leading-relaxed">{aiFeedbackText}</p>
          {aiScore < 100 && (
            <Link to="/feedback" className="block text-center w-full bg-accent text-bg font-bold py-2.5 rounded-md hover:opacity-90 transition shadow-sm hover:scale-[1.02] transform">
              👉 맞춤형 AI 자세 교정 솔루션 확인하기
            </Link>
          )}
        </div>
      )}

      <div className="rep-list-scroll max-h-[220px] overflow-y-auto flex flex-col gap-2 pr-1">
        {reps.length === 0 ? (
          <p className="text-xs text-muted text-center py-6">
            {isWebcam ? '카메라를 켜고 운동을 시작하면 횟수와 자세가 자동으로 기록돼요.' : '영상을 올리고 AI 분석을 실행하면 세트별 운동 기록이 여기에 표시돼요.'}
          </p>
        ) : (
          reps.map((rep) => (
            <div
              key={rep.id}
              className={`rep-item-row p-2.5 rounded-md border flex justify-between items-center text-xs ${
                rep.isGood ? 'bg-green/10 border-green/30 text-green' : 'bg-red/10 border-red/30 text-red'
              }`}
            >
              <div>
                <strong className="block text-sm">{rep.repIndex}회차</strong>
                {isWebcam ? (
                  <span className="text-muted">{rep.duration}초</span>
                ) : (
                  <span className="text-muted">{Math.round((rep.startTime || 0) * 10) / 10}초 지점</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-bold block">{rep.isGood ? '좋아요 👍' : '폼 체크!'}</span>
                  {rep.errorType.length > 0 ? (
                    <span className="text-[10px] text-red-400">{rep.errorType.join(', ')}</span>
                  ) : (
                    <span className="text-[10px] text-muted uppercase">{rep.maxDepth}</span>
                  )}
                </div>
                {!isWebcam && onSeek && (
                  <button
                    type="button"
                    className="bg-elevated border border-border text-[10px] px-1.5 py-1 rounded text-white hover:border-accent"
                    onClick={() => onSeek(rep.startTime || 0)}
                  >
                    이동
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          className="primary-btn bg-accent text-bg w-full font-bold text-sm py-2"
          onClick={onSaveSession}
          disabled={reps.length === 0}
        >
          💾 이번 세트 기록 저장
        </button>
        {saveSuccessMsg && (
          <p className="text-xs text-green text-center mt-2 font-semibold">{saveSuccessMsg}</p>
        )}
      </div>
    </div>
  );
}
