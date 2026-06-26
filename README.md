# 🏋️ FormTech (폼테크)

> 클라이언트 100% 처리, 완벽한 프라이버시가 보장되는 AI 운동 폼 분석 솔루션

![FormTech Preview](./public/squat_guide.jpg)

FormTech는 MediaPipe의 경량화된 AI 모델(TensorFlow.js)을 활용하여 **사용자의 기기(브라우저)에서 직접 영상 및 실시간 카메라를 분석**하는 스마트 폼 체크 도구입니다. 영상이나 데이터가 외부 서버로 전송되지 않으므로 개인정보 보호와 비용 절감이라는 두 가지 목적을 동시에 달성합니다.

## ✨ 주요 기능
- **실시간 웹캠 분석**: 카메라 앞에서 운동하면 횟수(Rep)와 자세를 실시간으로 피드백 (음성 코칭 포함)
- **비디오 일괄 분석**: 녹화된 영상을 업로드하면 세트/랩을 자동 스캔하여 정확도 평가
- **자동 랩 카운팅**: 스쿼트/데드리프트 상태 머신을 이용한 정확한 횟수 및 오류 감지 (골반 말림, 깊이 부족, 허리 굽음 등)
- **운동 세션 기록**: 브라우저 LocalStorage에 이전 세트 기록 자동 저장 및 통계 제공

## 🛠 기술 스택
- **프론트엔드**: React 19, TypeScript, Vite
- **스타일링**: Tailwind CSS v4, Vanilla CSS
- **AI / 비전 모델**: `@tensorflow-models/pose-detection` (MoveNet - Singlepose Lightning)
- **배포 & 저장**: 로컬 브라우저 구동 (서버 및 DB 의존성 없음)

## 🚀 시작하기

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 브라우저 접속
http://localhost:5173
```

## 📸 프로젝트 스크린샷 

- 실시간 웹캠 & AI 폼 피드백 시스템
- 각도 (무릎, 고관절, 등) 모니터링
- 세트 당 운동 정확도(%) 및 리포트 제공

## 📜 라이선스
MIT License
