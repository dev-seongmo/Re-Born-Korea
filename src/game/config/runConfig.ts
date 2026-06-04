export const runConfig = {
  maxTurns: 5,
  deadlineUnit: "일",
};

export function getRunDeadlineText() {
  return `${runConfig.maxTurns}${runConfig.deadlineUnit}`;
}
