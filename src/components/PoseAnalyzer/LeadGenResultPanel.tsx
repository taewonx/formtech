import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { supabase } from '../../lib/supabase';
import type { RepRecord } from '../../types';

interface LeadGenResultPanelProps {
  exercise: 'squat' | 'deadlift';
  reps: RepRecord[];
  isAnalyzed?: boolean;
}

export function LeadGenResultPanel({ exercise, reps, isAnalyzed = false }: LeadGenResultPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Lead Gen Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const goodReps = reps.filter((r) => r.isGood).length;
  const aiScore = reps.length > 0 ? Math.round((goodReps / reps.length) * 100) : 0;

  const getGrade = (score: number) => {
    if (score === 100) return { label: 'S', color: 'text-[#00ff88]' };
    if (score >= 90) return { label: 'A', color: 'text-accent' };
    if (score >= 70) return { label: 'B', color: 'text-[#1e90ff]' };
    return { label: 'C', color: 'text-yellow' };
  };

  const grade = getGrade(aiScore);
  const exerciseName = exercise === 'squat' ? 'SQUAT' : 'DEADLIFT';
  const exerciseEmoji = exercise === 'squat' ? '🏋️' : '💪';

  const uniqueErrors = Array.from(new Set(reps.flatMap(r => r.errorType)));
  let aiFeedbackText: string;
  if (reps.length > 0) {
    if (aiScore === 100) {
      aiFeedbackText = '완벽한 자세입니다! 부상 위험 없이 아주 훌륭하게 수행하셨어요. 👍';
    } else {
      const errorStrings = uniqueErrors.filter(Boolean).join(', ');
      aiFeedbackText = `주로 [${errorStrings}] 문제가 감지되었습니다. 지속될 경우 관절에 무리가 갈 수 있습니다.`;
    }
  } else {
    aiFeedbackText = '정확히 카운트된 동작이 없습니다. 관절이 모두 화면에 나오도록 다시 촬영해주세요.';
  }

  const generateImage = async () => {
    if (!cardRef.current) return null;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
      });
      return dataUrl;
    } catch (err) {
      console.error('Failed to generate image', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareWeb = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'formtech-result.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'FormTech AI 분석 결과',
          text: `[FormTech] 내 ${exerciseName} AI 점수는 ${aiScore}점! 완벽한 자세에 도전해보세요. 🔥`,
          url: 'https://formtech.app',
          files: [file],
        });
      } else {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'formtech-result.png';
        a.click();
        alert('이미지가 저장되었습니다. 인스타그램이나 카카오톡에 직접 업로드해보세요!');
      }
    } catch (err) {
      console.log('Sharing canceled or failed', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://formtech.app');
    alert('FormTech 링크가 복사되었습니다. 친구들에게 공유해보세요!');
  };

  const handleTwitterShare = () => {
    const text = `[FormTech] 내 ${exerciseName} AI 점수는 ${aiScore}점! 내 기기에서 바로 분석하는 무료 AI 폼 체커 🔥`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://formtech.app')}`;
    window.open(url, '_blank');
  };

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    try {
      // 1. Supabase DB에 리드(Lead) 정보 및 상세 분석 데이터 저장
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{ 
          name, 
          age: parseInt(age, 10), 
          email, 
          exercise: exerciseName,
          score: aiScore,
          reps: reps.length,
          feedback: aiFeedbackText,
          detailed_analysis: JSON.stringify(reps), // 각 횟수별 오류 내역 등 상세 JSON
        }]);

      if (dbError) {
        console.warn('Supabase 연동 에러:', dbError.message);
        throw new Error('데이터베이스 저장 실패');
      }

      // 2. UX를 위해 약간의 로딩 딜레이 (Edge Function 발송 시간 대기)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('이메일 발송 중 오류가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  if (reps.length === 0 && !isAnalyzed) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card border border-border rounded-2xl p-6 text-center">
        <span className="text-4xl mb-4 opacity-50">📷</span>
        <p className="text-muted font-semibold">운동을 시작하거나 분석을 완료하면<br/>결과 카드와 상세 리포트 신청 폼이 나타납니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* 1. 간단 요약 결과 */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xl">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <span className="text-accent">📊</span> AI 간단 분석 결과
        </h4>
        <div className="flex justify-between items-center bg-elevated rounded-xl p-4 mb-3 border border-white/5">
           <div className="text-center">
             <span className="text-xs text-muted block mb-1">총 횟수</span>
             <span className="text-2xl font-bold">{reps.length}회</span>
           </div>
           <div className="w-px h-10 bg-border"></div>
           <div className="text-center">
             <span className="text-xs text-muted block mb-1">정확도 점수</span>
             <span className={`text-2xl font-bold ${grade.color}`}>{aiScore}점</span>
           </div>
        </div>
        <p className="text-sm font-semibold bg-accent/10 text-accent p-3 rounded-xl break-keep">
          {aiFeedbackText}
        </p>
      </div>

      {/* 2. 인스타그래머블 공유 카드 */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xl flex flex-col items-center">
        <h4 className="font-bold mb-4 text-center">📸 나의 폼 체크 결과</h4>
        
        <div 
          ref={cardRef} 
          className="w-full max-w-[300px] aspect-[4/5] rounded-[24px] relative overflow-hidden bg-gradient-to-br from-[#090f1f] to-[#1e1b4b] border border-white/10 shadow-lg flex flex-col items-center justify-center p-6 mx-auto"
        >
          {/* 배경 데코레이션 */}
          <div className="absolute top-[-40px] right-[-40px] w-[120px] h-[120px] bg-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-40px] left-[-40px] w-[120px] h-[120px] bg-[#00ff88]/20 rounded-full blur-3xl"></div>

          <div className="z-10 w-full flex flex-col items-center">
            <span className="text-4xl mb-3 animate-float">{exerciseEmoji}</span>
            <div className="text-[9px] font-black tracking-[0.2em] text-white/50 mb-1">AI FORM ANALYSIS</div>
            <h3 className="text-xl font-black text-white tracking-wider mb-4">{exerciseName}</h3>
            
            <div className="w-full bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 mb-4 text-center shadow-inner">
              <div className="text-[10px] text-white/60 mb-1">ACCURACY SCORE</div>
              <div className={`text-5xl font-black tracking-tighter ${grade.color} drop-shadow-[0_0_15px_currentColor]`}>
                {aiScore}
              </div>
              <div className="mt-3 flex justify-around border-t border-white/10 pt-3">
                <div>
                  <div className="text-[9px] text-white/50 mb-1">REPS</div>
                  <div className="text-lg font-bold text-white">{reps.length}</div>
                </div>
                <div>
                  <div className="text-[9px] text-white/50 mb-1">GRADE</div>
                  <div className={`text-lg font-bold ${grade.color}`}>{grade.label}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-2 flex items-center justify-center gap-1.5 opacity-80">
              <span className="w-3 h-3 bg-accent rounded-sm inline-block"></span>
              <span className="font-bold text-[10px] tracking-wider text-white">FORMTECH.APP</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <p className="text-xs text-center text-muted mb-3 font-semibold">친구들에게 결과 자랑하기</p>
          <div className="grid grid-cols-4 gap-2">
            <button 
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-elevated border border-border flex items-center justify-center text-lg group-hover:bg-white/10 transition-colors">
                🔗
              </div>
              <span className="text-[10px] text-muted group-hover:text-white transition-colors">링크복사</span>
            </button>
            <button 
              onClick={handleShareWeb}
              disabled={isGenerating}
              className="flex flex-col items-center gap-2 group disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-full bg-[#FEE500] text-black flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-md">
                💬
              </div>
              <span className="text-[10px] text-muted group-hover:text-white transition-colors">카카오톡</span>
            </button>
            <button 
              onClick={handleTwitterShare}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-black border border-white/20 text-white flex items-center justify-center text-lg group-hover:bg-white/10 transition-colors shadow-md">
                𝕏
              </div>
              <span className="text-[10px] text-muted group-hover:text-white transition-colors">X (트위터)</span>
            </button>
            <button 
              onClick={handleShareWeb}
              disabled={isGenerating}
              className="flex flex-col items-center gap-2 group disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-md">
                📸
              </div>
              <span className="text-[10px] text-muted group-hover:text-white transition-colors">인스타그램</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 상세 리포트 신청 폼 (블러 처리된 가짜 리포트 + 오버레이) */}
      <div className="bg-card border border-border rounded-2xl shadow-xl relative overflow-hidden flex flex-col border-t-4 border-t-accent mt-2">
        
        {/* 가짜 리포트 배경 (블러 처리됨) */}
        <div className="p-5 opacity-40 blur-[5px] pointer-events-none select-none grayscale-[30%]">
          <div className="flex justify-between items-center mb-5">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-accent">📋</span> 프리미엄 AI 분석 리포트
            </h4>
            <span className="text-[10px] bg-accent text-bg px-2 py-1 rounded font-bold">LOCKED</span>
          </div>
          <div className="space-y-4">
            {/* 가짜 종합 평가 */}
            <div className="bg-elevated h-24 rounded-xl border border-white/5 flex items-center justify-around px-4">
               <div className="w-16 h-16 rounded-full bg-accent/20"></div>
               <div className="flex-1 ml-5 space-y-3">
                 <div className="h-2.5 w-3/4 bg-white/20 rounded"></div>
                 <div className="h-2 w-1/2 bg-white/20 rounded"></div>
                 <div className="h-2 w-5/6 bg-white/20 rounded"></div>
               </div>
            </div>
            {/* 가짜 관절 각도 분석 */}
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-elevated h-32 rounded-xl border border-white/5 flex flex-col p-4 gap-3">
                  <div className="h-2 w-1/2 bg-white/20 rounded mb-auto"></div>
                  <div className="w-full h-12 bg-accent/20 rounded border border-accent/30"></div>
               </div>
               <div className="bg-elevated h-32 rounded-xl border border-white/5 flex flex-col p-4 gap-3">
                  <div className="h-2 w-1/2 bg-white/20 rounded mb-auto"></div>
                  <div className="w-full h-12 bg-red-500/20 rounded border border-red-500/30"></div>
               </div>
            </div>
            {/* 가짜 맞춤 솔루션 */}
            <div className="bg-elevated h-20 rounded-xl border border-white/5 p-4 flex flex-col justify-center gap-3">
               <div className="h-2 w-1/3 bg-white/20 rounded"></div>
               <div className="h-2 w-full bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        {/* 폼 오버레이 */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 text-center z-10">
          {!isSubmitted ? (
            <>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-2xl mb-3 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                🔒
              </div>
              <h4 className="font-bold text-lg mb-2 text-white drop-shadow-md">상세 결과 잠금 해제</h4>
              <p className="text-[11px] text-white/80 mb-6 leading-relaxed max-w-[240px] drop-shadow">
                관절별 세부 꺾임 각도, 부상 위험도 평가 및 교정 솔루션이 담긴 <strong>프리미엄 리포트</strong>를 이메일로 받아보세요.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[260px] text-left">
                <div>
                  <label className="text-[10px] text-white/80 font-bold uppercase tracking-wider mb-1 block">이름 (Name)</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동" 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-accent focus:bg-black/80 focus:outline-none transition-colors text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-1/3">
                    <label className="text-[10px] text-white/80 font-bold uppercase tracking-wider mb-1 block">나이</label>
                    <input 
                      type="number" 
                      required 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-accent focus:bg-black/80 focus:outline-none transition-colors text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-white/80 font-bold uppercase tracking-wider mb-1 block">이메일 (Email)</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-accent focus:bg-black/80 focus:outline-none transition-colors text-white"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full bg-accent text-bg font-bold py-3 rounded-lg mt-3 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin"></div>
                      발송 중...
                    </>
                  ) : (
                    '무료 리포트 받아보기'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-xl p-8 text-center animate-fade-in w-full max-w-[260px] shadow-[0_0_30px_rgba(0,255,136,0.1)]">
              <span className="text-4xl mb-4 block">📩</span>
              <p className="font-bold text-[#00ff88] mb-2 text-lg">신청 완료!</p>
              <p className="text-xs text-[#00ff88]/80 leading-relaxed">입력하신 이메일로<br/>프리미엄 리포트가 발송됩니다.<br/>(최대 5분 소요)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
