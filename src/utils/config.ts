/**
 * 운동 종목별 분석 임계값 설정
 *
 * PoseAnalyzer, repCounter, angles 전역에서 참조하는 상수 모음.
 * 각도 수치 튜닝 시 이 파일만 수정하면 전체에 반영됩니다.
 */

// ─── 스쿼트 각도 임계값 ────────────────────────────────────
export const SQUAT = {
  /** 무릎 각도가 이 이하이면 "내려가는 중(descending)" 상태로 전환 */
  DESCENDING_KNEE: 140,
  /** 무릎 각도가 이 이하이면 "하단(bottom)" 도달 */
  BOTTOM_KNEE: 105,
  /** 하단에서 무릎 각도가 이 이상이면 "올라가는 중(ascending)" */
  ASCENDING_KNEE: 115,
  /** 올라가서 무릎 각도가 이 이상이면 1랩 완료 */
  STANDING_KNEE: 145,
  /** 무릎 각도가 이 이하이면 "deep" 깊이 */
  DEEP_KNEE: 85,
  /** 내려가다가 무릎 각도가 이 이상으로 다시 올라가면 취소 */
  ABORT_KNEE: 145,

  // 벗윙크 감지
  /** 고관절 각도가 이 이하이면 벗윙크 */
  BUTT_WINK_HIP: 55,
  /** 복합 조건: 고관절 < 60 && 무릎 < 92 → 벗윙크 */
  BUTT_WINK_COMBINED_HIP: 60,
  BUTT_WINK_COMBINED_KNEE: 92,
  /** 등 기울기(수직 기준)가 이 이상이면 상체 과도 숙임 경고 */
  BACK_ANGLE_WARNING: 45,
} as const;

// ─── 데드리프트 각도 임계값 ────────────────────────────────
export const DEADLIFT = {
  /** 고관절 각도가 이 이하이면 "내려가는 중(descending)" */
  DESCENDING_HIP: 140,
  /** 고관절 각도가 이 이하이면 "하단(bottom)" */
  BOTTOM_HIP: 90,
  /** 하단에서 고관절 각도가 이 이상이면 "올라가는 중(ascending)" */
  ASCENDING_HIP: 95,
  /** 락아웃: 고관절 > 155 && 무릎 > 160 */
  LOCKOUT_HIP: 155,
  LOCKOUT_KNEE: 160,
  /** 내려가다 취소: 고관절이 이 이상으로 다시 올라가면 */
  ABORT_HIP: 155,

  // 등허리 굽음 감지
  /** 무릎이 이 이상 펴졌는데 고관절이 < 75 → stripper pull */
  BACK_ROUNDING_KNEE: 140,
  BACK_ROUNDING_HIP: 75,
  /** 등 기울기가 이 이상이면 등허리 굽음 danger */
  BACK_ANGLE_DANGER: 55,
  /** 무릎 쏠림: hip.x > knee.x + PX 이면 knee drift */
  KNEE_DRIFT_PX: 20,
  /** 고관절 각도가 이 이하이면 "pulling" 구간으로 판단 */
  PULLING_HIP: 100,
} as const;

// ─── 공통 설정 ──────────────────────────────────────────
export const POSE = {
  /** 관절 인식 최소 신뢰도 (이 이하이면 해당 관절 무시) */
  MIN_CONFIDENCE: 0.45,
  /** 로컬 세션 히스토리 최대 저장 수 */
  MAX_SESSIONS: 15,
  /** 로컬 분석 결과 최대 저장 수 */
  MAX_ANALYSES: 20,
} as const;
