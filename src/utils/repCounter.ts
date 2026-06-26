import type { PostureAnalysisResult } from './angles';
import type { RepRecord, RepPhase, SquatDepth } from '../types';
import { SQUAT, DEADLIFT } from './config';

export interface RepCounterState {
  state: RepPhase;
  startTime: number;
  hasWinkOrRounding: boolean;
  maxDepth: SquatDepth;
  errors: Set<string>;
}

export function createInitialRepState(): RepCounterState {
  return {
    state: 'none',
    startTime: 0,
    hasWinkOrRounding: false,
    maxDepth: 'standing',
    errors: new Set<string>(),
  };
}

/**
 * 스쿼트/데드리프트 단일 프레임 결과를 받아 랩 상태를 업데이트하고,
 * 랩이 완성되었으면 RepRecord 객체를 반환합니다.
 */
export function processRepFrame(
  res: PostureAnalysisResult,
  timestampSec: number,
  repState: RepCounterState,
  currentRepCount: number
): RepRecord | null {
  if (res.confidenceWarning) return null;

  const kneeAngle = res.kneeAngle;
  const hipAngle = res.hipAngle;

  if (res.exercise === 'squat') {
    if (repState.state === 'none') {
      if (kneeAngle < SQUAT.DESCENDING_KNEE) {
        repState.state = 'descending';
        repState.startTime = timestampSec;
        repState.hasWinkOrRounding = false;
        repState.maxDepth = res.depth;
        repState.errors.clear();
      }
    } else if (repState.state === 'descending') {
      if (kneeAngle < SQUAT.BOTTOM_KNEE) {
        repState.state = 'bottom';
      } else if (kneeAngle > SQUAT.ABORT_KNEE) {
        repState.state = 'none'; // 도중 상승 혹은 포기
      }
      if (res.hasButtWink) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('골반 말림 (Butt-wink)');
      }
      if (res.depth === 'parallel' && repState.maxDepth === 'partial') repState.maxDepth = 'parallel';
      if (res.depth === 'deep') repState.maxDepth = 'deep';
    } else if (repState.state === 'bottom') {
      if (kneeAngle > SQUAT.ASCENDING_KNEE) {
        repState.state = 'ascending';
      }
      if (res.hasButtWink) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('골반 말림 (Butt-wink)');
      }
      if (res.depth === 'parallel' && repState.maxDepth === 'partial') repState.maxDepth = 'parallel';
      if (res.depth === 'deep') repState.maxDepth = 'deep';
    } else if (repState.state === 'ascending') {
      if (kneeAngle > SQUAT.STANDING_KNEE) {
        // 스쿼트 완료
        const isGoodDepth = repState.maxDepth === 'parallel' || repState.maxDepth === 'deep';
        if (!isGoodDepth) {
          repState.errors.add('깊이 부족');
        }
        const isGoodRep = isGoodDepth && !repState.hasWinkOrRounding;

        const newRep: RepRecord = {
          id: crypto.randomUUID(),
          repIndex: currentRepCount + 1,
          startTime: repState.startTime,
          endTime: timestampSec,
          duration: Math.round((timestampSec - repState.startTime) * 10) / 10,
          maxDepth: repState.maxDepth,
          isGood: isGoodRep,
          errorType: Array.from(repState.errors),
        };
        repState.state = 'none';
        return newRep;
      } else if (kneeAngle < SQUAT.BOTTOM_KNEE) {
        repState.state = 'bottom';
      }
      if (res.hasButtWink) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('골반 말림 (Butt-wink)');
      }
    }
  } else {
    // 데드리프트
    if (repState.state === 'none') {
      if (hipAngle < DEADLIFT.DESCENDING_HIP) {
        repState.state = 'descending'; // 힙 힌지 개시
        repState.startTime = timestampSec;
        repState.hasWinkOrRounding = false;
        repState.errors.clear();
      }
    } else if (repState.state === 'descending') {
      if (hipAngle < DEADLIFT.BOTTOM_HIP) {
        repState.state = 'bottom'; // 바닥 셋업
      } else if (hipAngle > DEADLIFT.ABORT_HIP) {
        repState.state = 'none';
      }
      if (res.hasBackRounding) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('등허리 굽음');
      }
    } else if (repState.state === 'bottom') {
      if (hipAngle > DEADLIFT.ASCENDING_HIP) {
        repState.state = 'ascending'; // 뽑아 올림
      }
      if (res.hasBackRounding) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('등허리 굽음');
      }
    } else if (repState.state === 'ascending') {
      if (hipAngle > DEADLIFT.LOCKOUT_HIP && kneeAngle > DEADLIFT.LOCKOUT_KNEE) {
        // 데드리프트 완료
        const isGoodRep = !repState.hasWinkOrRounding;
        const newRep: RepRecord = {
          id: crypto.randomUUID(),
          repIndex: currentRepCount + 1,
          startTime: repState.startTime,
          endTime: timestampSec,
          duration: Math.round((timestampSec - repState.startTime) * 10) / 10,
          maxDepth: 'standing',
          isGood: isGoodRep,
          errorType: Array.from(repState.errors),
        };
        repState.state = 'none';
        return newRep;
      } else if (hipAngle < DEADLIFT.BOTTOM_HIP) {
        repState.state = 'bottom';
      }
      if (res.hasBackRounding) {
        repState.hasWinkOrRounding = true;
        repState.errors.add('등허리 굽음');
      }
    }
  }

  return null;
}

import type { PoseFrame } from '../types';
import { analyzeSquatFrame, analyzeDeadliftFrame } from './angles';

export function scanVideoReps(poseFrames: PoseFrame[], curExercise: 'squat' | 'deadlift'): RepRecord[] {
  const reps: RepRecord[] = [];
  const state = createInitialRepState();

  for (const frame of poseFrames) {
    const res =
      curExercise === 'squat'
        ? analyzeSquatFrame(frame.keypoints)
        : analyzeDeadliftFrame(frame.keypoints);

    const newRep = processRepFrame(res, frame.timestamp, state, reps.length);
    if (newRep) {
      reps.push(newRep);
    }
  }
  return reps;
}
