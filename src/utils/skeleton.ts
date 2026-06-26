import type { PoseKeypoint } from '../types';
import type { PostureAnalysisResult } from './angles';
import { getActiveSideKeypoints } from './angles';

export function drawSkeletonOnCanvas(
  ctx: CanvasRenderingContext2D,
  keypoints: PoseKeypoint[],
  result: PostureAnalysisResult
) {
  const sideInfo = getActiveSideKeypoints(keypoints);
  const { shoulder, hip, knee, ankle } = sideInfo;

  if (!shoulder || !hip || !knee || !ankle) return;

  // 감지 상태별 스켈레톤 색상
  let strokeColor = '#00ff88'; // Good (그린)
  if (result.status === 'warning') {
    strokeColor = '#ffb300'; // Warning (옐로우)
  } else if (result.status === 'danger') {
    strokeColor = '#ff4757'; // Danger (레드)
  }

  // 라인 설정
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 뼈대 그리기
  ctx.beginPath();
  ctx.moveTo(shoulder.x, shoulder.y);
  ctx.lineTo(hip.x, hip.y);
  ctx.lineTo(knee.x, knee.y);
  ctx.lineTo(ankle.x, ankle.y);
  ctx.stroke();

  // 조인트 원형 그리기
  const drawJointCircle = (kp: PoseKeypoint) => {
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.arc(kp.x, kp.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  drawJointCircle(shoulder);
  drawJointCircle(hip);
  drawJointCircle(knee);
  drawJointCircle(ankle);

  // 위험 부하 발생 시 추가적인 빨간색 펄스 이펙트 생성
  if (result.status === 'danger') {
    const pulse = 14 + Math.sin(Date.now() / 80) * 4;
    ctx.strokeStyle = 'rgba(255, 71, 87, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (result.hasButtWink) {
      ctx.arc(hip.x, hip.y, pulse, 0, Math.PI * 2);
    } else if (result.hasBackRounding) {
      const midX = (shoulder.x + hip.x) / 2;
      const midY = (shoulder.y + hip.y) / 2;
      ctx.arc(midX, midY, pulse, 0, Math.PI * 2);
    }
    ctx.stroke();
  }

  // 각도 텍스트 그리기
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 4;

  ctx.fillText(`${result.kneeAngle}°`, knee.x + 12, knee.y);
  ctx.fillText(`${result.hipAngle}°`, hip.x + 12, hip.y);
  ctx.fillText(`등 각도: ${result.backAngle}°`, shoulder.x - 10, shoulder.y - 15);

  ctx.shadowBlur = 0; // 초기화
}
