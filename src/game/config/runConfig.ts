export const runConfig = {
  maxTurns: 30,
  deadlineUnit: "일",
};

export function getRunDeadlineText() {
  return `${runConfig.maxTurns}${runConfig.deadlineUnit}`;
}
