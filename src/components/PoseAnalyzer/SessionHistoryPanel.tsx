import type { SavedSession } from '../../types';

interface SessionHistoryPanelProps {
  sessions: SavedSession[];
  onDelete: (id: string) => void;
}

export function SessionHistoryPanel({ sessions, onDelete }: SessionHistoryPanelProps) {
  return (
    <div className="saved-history-panel bg-card border border-border rounded-radius p-5">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold">📂 내 운동 기록</h4>
        <span className="text-[10px] bg-border px-2 py-0.5 rounded text-muted">최대 15개</span>
      </div>
      
      <div className="history-list max-h-[300px] overflow-y-auto flex flex-col gap-2">
        {sessions.length === 0 ? (
          <p className="text-xs text-muted text-center py-8">
            아직 저장된 기록이 없어요. 운동 후 기록을 저장해보세요!
          </p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="history-item bg-elevated border border-border rounded p-3 text-xs relative"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-accent">
                  {session.exercise === 'squat' ? '🏋️ 스쿼트' : '🏋️ 데드리프트'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted">{session.date}</span>
                  <button
                    type="button"
                    className="text-muted hover:text-red border-none bg-transparent cursor-pointer p-0 text-sm leading-none"
                    onClick={() => onDelete(session.id)}
                    title="기록 지우기"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex gap-4 text-muted mb-1.5">
                <span>총: <strong>{session.totalReps}회</strong></span>
                <span>좋은 폼: <strong className="text-green">{session.goodReps}회</strong></span>
                <span>정확도: <strong className="text-accent">{session.successRate}%</strong></span>
              </div>
              <p className="m-0 text-muted italic bg-card p-1.5 rounded text-[11px]">
                {session.notes}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
