export function Privacy() {
  return (
    <div className="min-h-[80vh] w-full max-w-4xl mx-auto py-12 px-4 text-white/90">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">개인정보처리방침 (Privacy Policy)</h1>
      
      <div className="space-y-8 bg-card border border-border p-8 rounded-2xl">
        <section>
          <h2 className="text-xl font-bold text-accent mb-3">1. 수집하는 개인정보의 항목 및 수집 방법</h2>
          <p className="text-muted leading-relaxed text-sm">
            <strong>FormTech은 사용자 회원가입 절차를 요구하지 않으며, 이름, 연락처 등의 민감한 개인정보를 수집하지 않습니다.</strong><br/>
            다만, 서비스 품질 향상 및 통계 분석을 위해 Google Analytics와 같은 웹 분석 도구를 사용하여 다음과 같은 익명의 사용 데이터를 자동으로 수집할 수 있습니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>브라우저 종류 및 OS 정보</li>
              <li>사이트 방문 일시 및 체류 시간</li>
              <li>서비스 내 메뉴 클릭 이벤트 등 (익명화된 데이터)</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">2. 영상 데이터 처리 방침 (핵심)</h2>
          <p className="text-muted leading-relaxed text-sm">
            본 서비스의 가장 큰 특징은 프라이버시 보호입니다.<br/>
            1. 사용자가 웹캠을 통해 촬영하거나 업로드한 모든 <strong>운동 영상 데이터는 사용자의 기기(브라우저) 내에서만 처리 및 분석</strong>됩니다.<br/>
            2. 어떠한 영상 원본이나 뼈대(Skeleton) 추출 데이터도 당사의 서버나 외부 클라우드로 <strong>전송, 저장, 공유되지 않습니다.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">3. 쿠키(Cookie) 및 로컬 스토리지의 사용</h2>
          <p className="text-muted leading-relaxed text-sm">
            사용자에게 더 나은 사용 환경을 제공하기 위해 브라우저의 '로컬 스토리지(Local Storage)' 기능을 사용합니다. 이를 통해 사용자의 분석 기록(세트 수, 점수 등)이 <strong>사용자 본인의 기기에만 안전하게 저장</strong>되며, 브라우저 데이터를 삭제하면 모든 기록이 영구적으로 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-accent mb-3">4. 제휴 링크 및 외부 서비스</h2>
          <p className="text-muted leading-relaxed text-sm">
            웹 분석을 위해 삽입된 Google Analytics 4의 경우 Google의 자체 개인정보처리방침을 따르며, 사용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
