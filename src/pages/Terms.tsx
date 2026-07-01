export function Terms() {
  return (
    <div className="min-h-[80vh] w-full max-w-4xl mx-auto py-12 px-4 text-white/90">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">이용약관 (Terms of Service)</h1>
      
      <div className="space-y-8 bg-card border border-border p-8 rounded-2xl">
        <section>
          <h2 className="text-xl font-bold text-accent mb-3">1. 목적</h2>
          <p className="text-muted leading-relaxed text-sm">
            본 약관은 FormTech(이하 "서비스")가 제공하는 AI 운동 자세 분석 서비스의 이용과 관련하여, 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">2. 서비스의 성격 및 면책</h2>
          <p className="text-muted leading-relaxed text-sm">
            1. 본 서비스는 인공지능(AI) 비전 기술을 활용하여 운동 자세에 대한 참고용 시각적 피드백을 제공합니다.<br/>
            2. 본 서비스의 분석 결과는 <strong>의학적 진단이나 전문적인 의료 조언을 대체할 수 없습니다.</strong><br/>
            3. 사용자는 본인의 건강 상태에 맞게 서비스를 이용해야 하며, 서비스 이용 중 발생한 신체적 부상이나 손해에 대해 서비스 제공자는 어떠한 법적 책임도 지지 않습니다.<br/>
            4. 질병이 있거나 통증이 발생하는 경우 즉시 전문의나 공인된 트레이너와 상담하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">3. 데이터의 로컬 처리</h2>
          <p className="text-muted leading-relaxed text-sm">
            1. 본 서비스의 모든 영상 분석(실시간 카메라 및 업로드 영상)은 사용자의 브라우저 및 기기 내부에서만 처리됩니다.<br/>
            2. 사용자의 영상 데이터는 당사의 서버로 전송, 저장, 또는 제3자에게 공유되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">4. 저작권 및 서비스 이용 제한</h2>
          <p className="text-muted leading-relaxed text-sm">
            본 서비스 내의 UI/UX, AI 모델 구성, 텍스트 등에 대한 지적재산권은 FormTech에 있습니다. 이를 무단으로 복제하거나 상업적으로 이용하는 행위는 금지됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
