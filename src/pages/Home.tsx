import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full animate-fade-in">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl px-4 py-16 md:py-24">
        <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6">
          ✨ 100% 무료 · 별도 설치 없음
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          당신의 운동을 완벽하게 분석하는<br />
          <span className="bg-gradient-to-r from-accent via-[#ff79c6] to-accent bg-clip-text text-transparent">차세대 AI 포즈 체커</span>
        </h1>
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          서버 전송 없이 내 기기에서 바로 분석하는 완벽한 프라이버시.
          실시간 웹캠부터 영상 업로드까지, AI가 바패스와 관절 움직임을 정밀하게 추적합니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/analysis" 
            className="primary-btn bg-accent text-bg px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)] w-full sm:w-auto"
          >
            🚀 지금 바로 시작하기
          </Link>
          <a href="#features" className="px-8 py-4 text-lg font-bold rounded-full border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto text-center">
            기능 살펴보기 ↓
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl px-4 py-16 md:py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 FormTech 인가요?</h2>
          <p className="text-muted">전문가의 눈을 대신하는 강력한 분석 도구를 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-left">🔒</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">완벽한 프라이버시</h3>
            <p className="text-muted text-sm leading-relaxed">
              모든 영상 분석은 브라우저(내 기기) 내부에서만 이루어집니다. 외부 서버로 어떠한 영상이나 데이터도 전송되지 않아 안심하고 사용할 수 있습니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-[#00ff88]/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,255,136,0.15)] transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-left">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00ff88] transition-colors">정밀한 바패스 추적</h3>
            <p className="text-muted text-sm leading-relaxed">
              운동 중 바벨의 궤적(Bar Path)과 주요 관절의 움직임을 화면에 직관적인 선으로 그려주어 자세의 불안정성을 한눈에 파악할 수 있습니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-[#1e90ff]/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(30,144,255,0.15)] transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-left">🎥</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#1e90ff] transition-colors">실시간 & 영상 파일 지원</h3>
            <p className="text-muted text-sm leading-relaxed">
              스마트폰 웹캠이나 PC 카메라로 실시간 자세 교정을 받거나, 기존에 촬영해둔 MP4/MOV 운동 영상을 업로드하여 정밀 분석할 수 있습니다.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-[#ff4757]/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,71,87,0.15)] transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-left">✍️</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff4757] transition-colors">전문가용 드로잉 툴</h3>
            <p className="text-muted text-sm leading-relaxed">
              영상 위에 직접 관절 포인트를 찍거나 자유로운 궤적을 그릴 수 있는 강력한 그리기 도구를 제공하여 코칭 피드백 작성에 최적화되어 있습니다.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-[#ffa502]/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,165,2,0.15)] transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-left">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ffa502] transition-colors">압도적인 퍼포먼스</h3>
            <p className="text-muted text-sm leading-relaxed">
              최신 WebGL 및 WebAssembly 기술을 활용하여 무거운 앱 설치 없이도 웹 브라우저에서 초당 30프레임 이상의 부드러운 실시간 분석을 제공합니다.
            </p>
          </div>

          {/* Feature 6 */}
          <Link to="/analysis" className="bg-accent/10 border border-accent/30 p-8 rounded-2xl hover:bg-accent/20 hover:border-accent hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 group flex flex-col justify-center items-center text-center cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300">🔥</div>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">준비되셨나요?</h3>
            <span className="text-accent font-bold group-hover:underline">무료로 분석 시작하기 →</span>
          </Link>

        </div>
      </section>

    </div>
  );
}
