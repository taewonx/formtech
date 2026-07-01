// Deno 글로벌 변수 선언 (IDE 에러 방지용)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Deno: any;

// Resend API 엔드포인트
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req: Request) => {
  try {
    // 1. 수퍼베이스 Webhook 페이로드 파싱 (INSERT 시 넘어오는 데이터)
    const payload = await req.json();
    const record = payload.record; // 새로 추가된 leads 데이터

    if (!record || !record.email) {
      return new Response("No email provided", { status: 400 });
    }

    // 2. 상세 분석 JSON 데이터 파싱
    // 문자열로 저장되어 있을 경우 파싱
    const detailedData = typeof record.detailed_analysis === 'string' 
      ? JSON.parse(record.detailed_analysis) 
      : record.detailed_analysis;

    // 3. 횟수별 오류 내역을 HTML 리스트로 변환
    let repsHtml = '';
    if (detailedData && Array.isArray(detailedData)) {
      repsHtml = detailedData.map((rep: { repIndex: number; errorType?: string[] }) => {
        const errorText = rep.errorType && rep.errorType.length > 0 
          ? `<span style="color: #e53e3e;">주의: ${rep.errorType.join(', ')}</span>` 
          : `<span style="color: #38a169;">완벽함!</span>`;
        
        return `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 12px; font-weight: bold;">${rep.repIndex}회차</td>
            <td style="padding: 12px;">${errorText}</td>
          </tr>
        `;
      }).join('');
    }

    // 4. 이메일 발송용 HTML 템플릿 생성
    const htmlContent = `
      <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7fafc; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2d3748; margin-bottom: 10px;">🏋️ FormTech AI 프리미엄 리포트</h1>
          <p style="color: #718096; font-size: 16px;">${record.name}님의 ${record.exercise} 분석 결과입니다.</p>
        </div>

        <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
          <h2 style="color: #2d3748; font-size: 20px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">📊 종합 평가</h2>
          <div style="display: flex; justify-content: space-between; margin-top: 15px;">
            <div>
              <p style="color: #a0aec0; margin: 0; font-size: 14px;">정확도 점수</p>
              <p style="color: #3182ce; font-size: 32px; font-weight: bold; margin: 5px 0;">${record.score}점</p>
            </div>
            <div style="text-align: right;">
              <p style="color: #a0aec0; margin: 0; font-size: 14px;">총 수행 횟수</p>
              <p style="color: #2d3748; font-size: 32px; font-weight: bold; margin: 5px 0;">${record.reps}회</p>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #ebf8ff; border-radius: 8px;">
            <p style="margin: 0; color: #2b6cb0; font-weight: bold;">💡 AI 핵심 코멘트</p>
            <p style="margin: 8px 0 0 0; color: #2c5282;">${record.feedback}</p>
          </div>
        </div>

        <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="color: #2d3748; font-size: 20px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">🔍 횟수별 상세 분석</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; text-align: left;">
            <thead>
              <tr style="background-color: #f7fafc; color: #4a5568;">
                <th style="padding: 12px; border-radius: 8px 0 0 8px;">횟수</th>
                <th style="padding: 12px; border-radius: 0 8px 8px 0;">분석 결과</th>
              </tr>
            </thead>
            <tbody>
              ${repsHtml}
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #a0aec0; font-size: 12px;">
          <p>이 메일은 FormTech AI에 의해 자동 발송되었습니다.</p>
          <p>© ${new Date().getFullYear()} FormTech. All rights reserved.</p>
        </div>
      </div>
    `;

    // 5. Resend API를 통해 이메일 발송 요청
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FormTech <onboarding@resend.dev>", // TODO: 발송자 도메인 변경 필요
        to: [record.email],
        subject: `[FormTech] ${record.name}님의 프리미엄 AI 분석 리포트 도착!`,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Resend API Error:", data);
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Edge Function Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
});
