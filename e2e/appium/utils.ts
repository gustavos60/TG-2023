const byAccessibilityLabel = (label: string): string => `~${label}`;

const byText = (text: string): string => `//*[@text="${text}"]`;

export {byAccessibilityLabel, byText};
