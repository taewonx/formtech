interface GuidelinePanelProps {
  exercise: 'squat' | 'deadlift';
  guideExpanded: boolean;
  setGuideExpanded: (val: boolean) => void;
  hasCompletedGuide: boolean;
  setHasCompletedGuide: (val: boolean) => void;
  guideAngle: boolean;
  setGuideAngle: (val: boolean) => void;
  guideFullBody: boolean;
  setGuideFullBody: (val: boolean) => void;
  guideClothing: boolean;
  setGuideClothing: (val: boolean) => void;
  guideConsent: boolean;
  setGuideConsent: (val: boolean) => void;
  prepGuideReady: boolean;
}

export function GuidelinePanel({
  exercise,
  guideExpanded,
  setGuideExpanded,
  hasCompletedGuide,
  setHasCompletedGuide,
  guideAngle,
  setGuideAngle,
  guideFullBody,
  setGuideFullBody,
  guideClothing,
  setGuideClothing,
  guideConsent,
  setGuideConsent,
  prepGuideReady,
}: GuidelinePanelProps) {
  if (!guideExpanded) {
    return (
      <div 
        className="bg-elevated/50 border border-white/10 rounded-lg p-4 mb-6 flex justify-between items-center cursor-pointer hover:bg-elevated hover:border-accent/50 transition-all group animate-fade-in"
        onClick={() => setGuideExpanded(true)}
      >
        <div className="flex items-center gap-3">
          <span className="text-accent text-lg">✅</span>
          <div>
            <span className="text-sm font-bold block text-white">가이드라인 확인 완료</span>
            <span className="text-xs text-muted">분석 준비가 완료되었습니다.</span>
          </div>
        </div>
        <span className="text-sm text-muted group-hover:text-accent transition-colors flex items-center gap-1">
          가이드라인 다시 보기 <span className="text-xs">▾</span>
        </span>
      </div>
    );
  }

  return (
    <div className="prep-guide-card bg-card border border-accent rounded-radius p-5 mb-6 relative animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-accent font-bold text-lg">📋 정확한 분석을 위해 체크해주세요!</h4>
        {hasCompletedGuide && (
          <button 
            onClick={() => setGuideExpanded(false)}
            className="text-muted hover:text-white text-sm"
          >
            접기 ▴
          </button>
        )}
      </div>
      <p className="text-sm text-muted mb-4">
        정확한 폼 분석을 위한 최적의 촬영 구도와 준비사항이에요:
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-4 md:items-stretch">
        <div className="guide-image-container w-full md:w-1/2 bg-black/40 border border-border rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[200px]">
          <img src={exercise === 'squat' ? '/squat_guide.jpg' : '/deadlift_guide.jpg'} alt={`${exercise === 'squat' ? '스쿼트' : '데드리프트'} 올바른 촬영 구도 가이드`} className="w-full h-full object-contain" />
        </div>
        
        <div className="checklist-grid w-full md:w-1/2 flex flex-col justify-center gap-2 md:gap-3">
          <label className="checklist-item flex items-start gap-2 bg-elevated p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/50">
            <input type="checkbox" checked={guideAngle} onChange={() => setGuideAngle(!guideAngle)} className="mt-1" />
            <div>
              <strong className="text-sm block">1. 골반 높이에서 완벽한 측면 촬영</strong>
              <span className="text-xs text-muted leading-tight block mt-1">카메라 렌즈가 골반 높이에 오도록 맞추고, 비스듬한 각도가 아닌 90도 완벽한 측면에서 촬영해주세요.</span>
            </div>
          </label>
          <label className="checklist-item flex items-start gap-2 bg-elevated p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/50">
            <input type="checkbox" checked={guideFullBody} onChange={() => setGuideFullBody(!guideFullBody)} className="mt-1" />
            <div>
              <strong className="text-sm block">2. 머리부터 발끝까지 전신 포함</strong>
              <span className="text-xs text-muted leading-tight block mt-1">동작 중에도 머리나 발끝이 화면 밖으로 나가지 않도록 카메라와의 거리를 충분히 확보해주세요.</span>
            </div>
          </label>
          <label className="checklist-item flex items-start gap-2 bg-elevated p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/50">
            <input type="checkbox" checked={guideClothing} onChange={() => setGuideClothing(!guideClothing)} className="mt-1" />
            <div>
              <strong className="text-sm block">3. 관절이 잘 보이는 타이트한 옷</strong>
              <span className="text-xs text-muted leading-tight block mt-1">검은색 헐렁한 옷은 관절 추적을 어렵게 합니다. 윤곽이 잘 드러나는 옷이 인식률을 크게 높입니다.</span>
            </div>
          </label>
          <label className="checklist-item flex items-start gap-2 bg-elevated p-3 rounded-lg border border-border cursor-pointer transition-colors hover:border-accent/50">
            <input type="checkbox" checked={guideConsent} onChange={() => setGuideConsent(!guideConsent)} className="mt-1" />
            <div>
              <strong className="text-sm block">4. 가이드라인 준수 확인</strong>
              <span className="text-xs text-muted leading-tight block mt-1">위 가이드라인을 따르지 않으면 AI 분석 정확도가 떨어질 수 있음을 확인했습니다.</span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-0 mt-4 md:mt-0">
        <span className="text-xs text-muted text-center sm:text-left">영상은 내 기기에서만 처리돼요. 외부 전송 없음 🔒</span>
        <button
          type="button"
          className="primary-btn bg-accent text-bg text-sm px-6 py-3 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={!prepGuideReady}
          onClick={() => {
            setHasCompletedGuide(true);
            setGuideExpanded(false);
          }}
        >
          🚀 준비 완료!
        </button>
      </div>
    </div>
  );
}
