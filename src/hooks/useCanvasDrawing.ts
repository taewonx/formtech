import { useCallback, useState } from 'react';
import type { DrawMode, Point, Stroke } from '../types';

function generateId() {
  return crypto.randomUUID();
}

export function useCanvasDrawing() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [drawMode, setDrawMode] = useState<DrawMode>('point');

  const startStroke = useCallback(
    (point: Point) => {
      const strokeColor = drawMode === 'point' ? '#ff4757' : '#00ff88';
      const stroke: Stroke = {
        id: generateId(),
        type: drawMode,
        points: [point],
        color: strokeColor,
      };
      setCurrentStroke(stroke);
      if (drawMode === 'point') {
        setStrokes((prev) => [...prev, stroke]);
        setCurrentStroke(null);
      }
    },
    [drawMode],
  );

  const continueStroke = useCallback((point: Point) => {
    setCurrentStroke((prev) => {
      if (!prev) return prev;
      return { ...prev, points: [...prev.points, point] };
    });
  }, []);

  const endStroke = useCallback(() => {
    setCurrentStroke((prev) => {
      if (prev && prev.points.length > 0) {
        setStrokes((s) => [...s, prev]);
      }
      return null;
    });
  }, []);

  const undo = useCallback(() => {
    setStrokes((prev) => prev.slice(0, -1));
  }, []);

  const clear = useCallback(() => {
    setStrokes([]);
    setCurrentStroke(null);
  }, []);

  const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

  return {
    strokes: allStrokes,
    drawMode,
    setDrawMode,
    startStroke,
    continueStroke,
    endStroke,
    undo,
    clear,
  };
}

/** 캔버스 좌표를 비디오 요소 기준으로 정규화 */
export function toCanvasPoint(
  e: React.MouseEvent | React.TouchEvent,
  canvas: HTMLCanvasElement,
): Point {
  const rect = canvas.getBoundingClientRect();
  const clientX =
    'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
  const clientY =
    'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}
