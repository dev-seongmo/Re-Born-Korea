export type MemoryShardDefinition = {
  id: string;
  title: string;
  description: string;
  hint: string;
};

export const finalMemoryShardId = "final_truth";
export const firstClearMemoryShardId = "interview_day";

export const memoryShards: MemoryShardDefinition[] = [
  {
    id: firstClearMemoryShardId,
    title: "합격의 기억",
    description: "마침내 면접의 문턱을 넘어선 순간.",
    hint: "면접에 합격한다.",
  },
  {
    id: "self_pace",
    title: "내 속도의 기억",
    description: "남의 속도에 끌려가지 않고, 내 걸음을 다시 확인한 순간.",
    hint: "비교보다 자신의 페이스를 선택한다.",
  },
  {
    id: "warm_meal",
    title: "따뜻한 한 끼의 기억",
    description: "쫓기던 하루 사이에도 사람과 밥 한 끼가 남아 있던 순간.",
    hint: "친구나 작은 위로가 있는 선택을 한다.",
  },
  {
    id: "survival",
    title: "버티는 법의 기억",
    description: "초라해 보이는 선택도 살아남기 위한 전략이 될 수 있음을 배운 순간.",
    hint: "무너지지 않기 위한 현실적인 선택을 한다.",
  },
  {
    id: "girlfriend_first_meet",
    title: "첫 만남의 기억",
    description: "예상치 못한 인연이 시작된 순간.",
    hint: "그녀를 만난다.",
  },
  {
    id: "girlfriend_confession",
    title: "고백의 기억",
    description: "서툰 마음을 숨기지 않고 관계의 문턱을 넘은 순간.",
    hint: "그녀에게 마음을 표현한다.",
  },
  {
    id: finalMemoryShardId,
    title: "마지막 기억",
    description: "모든 조각이 이어지고, 마지막 문 앞에 선 순간.",
    hint: "나머지 모든 기억조각을 모은 뒤 면접에 합격한다.",
  },
];

const memoryShardIdSet = new Set(memoryShards.map((shard) => shard.id));
const nonFinalMemoryShardIds = memoryShards
  .map((shard) => shard.id)
  .filter((id) => id !== finalMemoryShardId);

export function getMemoryShardById(id: string) {
  return memoryShards.find((shard) => shard.id === id) ?? null;
}

export function getUnlockedDefinedMemoryShardIds(unlockedIds: string[]) {
  return unlockedIds.filter((id) => memoryShardIdSet.has(id));
}

export function countUnlockedDefinedMemoryShards(unlockedIds: string[]) {
  return getUnlockedDefinedMemoryShardIds(unlockedIds).length;
}

export function hasUnlockedAllNonFinalMemoryShards(unlockedIds: string[]) {
  return nonFinalMemoryShardIds.every((id) => unlockedIds.includes(id));
}
