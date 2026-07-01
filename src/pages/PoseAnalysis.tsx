import { PoseAnalyzer } from '../components/PoseAnalyzer/PoseAnalyzer';
import { useSEO } from '../hooks/useSEO';

export function PoseAnalysis() {
  useSEO({
    title: '스쿼트/데드리프트 AI 자세 교정 | FormTech',
    description: '내 기기에서 바로 분석하는 100% 무료 실시간 AI 폼 체크. 스쿼트와 데드리프트 자세를 AI가 실시간으로 분석하고 교정해 줍니다.',
  });

  return (
    <div className="page pose-page">
      <header className="mb-6 md:mb-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">실시간 AI 폼 체크</h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto px-4">
          스쿼트·데드리프트할 때 자세가 잘 잡혀있는지, AI가 실시간으로 분석해줘요. 측면에서 찍어주세요!
        </p>
      </header>

      <PoseAnalyzer />
    </div>
  );
}


