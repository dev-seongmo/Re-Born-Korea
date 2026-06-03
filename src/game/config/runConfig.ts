export const runConfig = {
  maxTurns: 10,
  deadlineUnit: "일",
};

export function getRunDeadlineText() {
  return `${runConfig.maxTurns}${runConfig.deadlineUnit}`;
}
