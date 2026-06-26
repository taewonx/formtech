import { useState } from 'react';
import type { SavedSession } from '../types';

export function useSessionHistory() {
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>(() => {
    try {
      const raw = localStorage.getItem('formtech_session_history');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const saveSession = (session: SavedSession) => {
    const updated = [session, ...savedSessions].slice(0, 15); // 최대 15개 저장
    setSavedSessions(updated);
    localStorage.setItem('formtech_session_history', JSON.stringify(updated));
    setSaveSuccessMsg('기록이 저장됐어요! 📝');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const deleteSession = (id: string) => {
    const filtered = savedSessions.filter((s) => s.id !== id);
    setSavedSessions(filtered);
    localStorage.setItem('formtech_session_history', JSON.stringify(filtered));
  };

  return { savedSessions, saveSuccessMsg, saveSession, deleteSession };
}
