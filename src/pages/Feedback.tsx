export function Feedback() {
  return (
    <div className="feedback-page min-h-screen py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-card rounded-[30px] border border-border p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* 장식 효과 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent/10 px-3 py-1 text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              AI Correction Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              자주 틀리는 <span className="text-accent">자세 및 교정 가이드</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              FormTech AI가 분석 중에 자주 감지하는 대표적인 자세 오류들과, 이를 집에서 스스로 교정할 수 있는 해결책을 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 스쿼트 가이드 */}
            <div className="bg-elevated rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-colors">
              <h3 className="font-bold text-2xl text-white mb-6 flex items-center gap-2">
                🏋️ 스쿼트 (Squat)
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-red mb-2">⚠️ 벗윙크 (Butt Wink)</h4>
                <p className="text-sm text-white/80 mb-3">
                  스쿼트 하단부에서 골반이 후방으로 말리며 허리 하단부(요추)가 둥글게 굽어지는 현상입니다. 디스크에 압박을 줄 수 있습니다.
                </p>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="text-accent font-bold text-sm block mb-1">💡 교정 솔루션</span>
                  <ul className="text-sm text-muted list-disc pl-4 space-y-1">
                    <li>발목 가동성 스트레칭 (카프 레이즈, 폼롤링)</li>
                    <li>고관절 굴곡근 및 햄스트링 유연성 확보</li>
                    <li>골반이 말리기 직전까지만 깊이를 제한하여 연습</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-yellow mb-2">⚠️ 무릎 모임 (Knee Valgus)</h4>
                <p className="text-sm text-white/80 mb-3">
                  일어설 때 무릎이 안쪽으로 무너지는 현상으로, 전방십자인대 및 무릎 관절에 큰 무리를 줍니다.
                </p>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="text-accent font-bold text-sm block mb-1">💡 교정 솔루션</span>
                  <ul className="text-sm text-muted list-disc pl-4 space-y-1">
                    <li>중둔근 강화를 위한 힙 어브덕션 훈련</li>
                    <li>양쪽 무릎 바깥쪽에 저항 밴드를 걸고 바깥으로 밀어내는 느낌으로 스쿼트 연습</li>
                    <li>발바닥 바깥쪽(소지구)에 체중을 살짝 싣는 느낌 유지</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 데드리프트 가이드 */}
            <div className="bg-elevated rounded-2xl p-6 border border-white/5 hover:border-[#1e90ff]/30 transition-colors">
              <h3 className="font-bold text-2xl text-white mb-6 flex items-center gap-2">
                🏋️ 데드리프트 (Deadlift)
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-red mb-2">⚠️ 허리 말림 (Back Rounding)</h4>
                <p className="text-sm text-white/80 mb-3">
                  무거운 무게를 들어 올릴 때 척추의 중립이 풀리며 등이 둥글게 굽는 현상입니다. 부상 위험이 가장 높은 자세입니다.
                </p>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="text-[#1e90ff] font-bold text-sm block mb-1">💡 교정 솔루션</span>
                  <ul className="text-sm text-muted list-disc pl-4 space-y-1">
                    <li>복압(브레이싱) 유지하는 호흡법 마스터</li>
                    <li>시작 자세에서 광배근을 강하게 수축시켜 등 상부를 조여주기</li>
                    <li>가벼운 무게로 고관절 힌지(Hinge) 패턴부터 다시 연습하기</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-yellow mb-2">⚠️ 바벨 멀어짐 (Bar Path Issue)</h4>
                <p className="text-sm text-white/80 mb-3">
                  리프팅 과정에서 바벨이 정강이/허벅지에서 떨어져 몸 앞쪽으로 쏠리는 현상입니다. 허리에 과부하가 발생합니다.
                </p>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="text-[#1e90ff] font-bold text-sm block mb-1">💡 교정 솔루션</span>
                  <ul className="text-sm text-muted list-disc pl-4 space-y-1">
                    <li>셋업 시 바벨을 발 중앙(미드풋)에 정확히 위치시키기</li>
                    <li>바벨이 정강이와 허벅지를 가볍게 스치면서 올라오도록 의식하기</li>
                    <li>무게 중심이 발가락 쪽으로 쏠리지 않게 발 전체로 바닥을 누르기</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center bg-accent/5 border border-accent/20 rounded-xl p-6">
            <h3 className="font-bold text-white mb-2">항상 부상에 주의하세요!</h3>
            <p className="text-sm text-muted">
              AI의 피드백은 참고용입니다. 통증이 발생할 경우 즉시 운동을 중단하고 전문의나 트레이너와 상담하시길 권장합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
