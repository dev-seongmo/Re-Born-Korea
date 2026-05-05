export const identityLabels = [
  ({ name }: { name: string }) => name || "이름 없음",
  ({ name }: { name: string }) => `취준생 ${name || ""}`.trim(),
  () => "지원자",
  () => "지원자 #1042",
  () => "평가 대상",
  () => "평균 이하",
  () => "합격 가능성 37%",
  () => "데이터 없음",
];
