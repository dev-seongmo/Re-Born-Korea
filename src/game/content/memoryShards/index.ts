export type MemoryShardDefinition = {
  id: string;
  title: string;
  description: string;
  hint: string;
};

export const memoryShards: MemoryShardDefinition[] = [
  {
    id: "interview_day",
    title: "합격의 기억",
    description: "마침내 면접의 문턱을 넘어선 순간.",
    hint: "면접을 합격한다.",
  },
  {
    id: "girlfriend_first_meet",
    title: "첫 만남의 기억",
    description: "예상치 못한 인연이 시작된 순간.",
    hint: "그녀를 만난다.",
  },
];

const memoryShardIdSet = new Set(memoryShards.map((shard) => shard.id));

export function getMemoryShardById(id: string) {
  return memoryShards.find((shard) => shard.id === id) ?? null;
}

export function getUnlockedDefinedMemoryShardIds(unlockedIds: string[]) {
  return unlockedIds.filter((id) => memoryShardIdSet.has(id));
}

export function countUnlockedDefinedMemoryShards(unlockedIds: string[]) {
  return getUnlockedDefinedMemoryShardIds(unlockedIds).length;
}
