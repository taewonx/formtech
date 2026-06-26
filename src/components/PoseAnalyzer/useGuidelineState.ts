import { useState } from 'react';

export function useGuidelineState() {
  const [guideExpanded, setGuideExpanded] = useState(true);
  const [hasCompletedGuide, setHasCompletedGuide] = useState(false);
  const [guideAngle, setGuideAngle] = useState(false);
  const [guideFullBody, setGuideFullBody] = useState(false);
  const [guideClothing, setGuideClothing] = useState(false);
  const [guideConsent, setGuideConsent] = useState(false);

  const prepGuideReady = guideAngle && guideFullBody && guideClothing && guideConsent;

  return {
    guideExpanded,
    setGuideExpanded,
    hasCompletedGuide,
    setHasCompletedGuide,
    guideAngle,
    setGuideAngle,
    guideFullBody,
    setGuideFullBody,
    guideClothing,
    setGuideClothing,
    guideConsent,
    setGuideConsent,
    prepGuideReady,
  };
}
