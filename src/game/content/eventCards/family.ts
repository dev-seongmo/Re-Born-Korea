import type { EventCard } from "../../core/gameTypes";

export const familyEvents: EventCard[] = [
  {
    id: "relative-comparison-dinner",
    category: "family",
    phase: "early20s",
    text: "가족 모임에서 친척이 사촌의 취업 소식을 꺼내며 네 근황도 묻는다.",
    choices: [
      {
        id: "set-boundary-softly",
        label: "불편하다고 말한다",
        immediate: { reputation: -1, mental: 1 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["honesty"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "공기가 잠깐 어색해졌지만, 네 자리는 조금 더 또렷해졌다." },
          mixed: {
            text: "모든 사람이 이해하진 않아도 너 자신은 덜 흐려졌다.",
          },
          good: {
            text: "작은 경계선 하나가 너를 꽤 많이 지켜줬다.",
            delta: { reputation: 1 },
          },
        },
      },
      {
        id: "laugh-it-off",
        label: "웃고 넘긴다",
        immediate: { reputation: 2, mental: -1 },
        selfTrustDelta: -3,
        primaryStat: "reputation",
        modifier: 1,
        tendencyTags: ["reputation", "comparison"],
        results: {
          bad: {
            text: "집에 돌아와서야 그 웃음이 다 네 몫이었음을 알았다.",
          },
          mixed: { text: "분위기는 지켰지만 네 안쪽은 조금 작아졌다." },
          good: {
            text: "당장은 무난했지만, 답은 오래 마음에 남았다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
  {
    id: "move-back-home",
    category: "family",
    phase: "late20s",
    text: "월세를 감당하기 어려워 잠시 본가로 들어갈지 고민한다.",
    choices: [
      {
        id: "go-home-strategically",
        label: "잠깐 돌아간다",
        immediate: { money: 4, reputation: -1 },
        selfTrustDelta: 3,
        primaryStat: "money",
        modifier: 0,
        memoryTags: ["survival"],
        tendencyTags: ["money", "selfTrust"],
        results: {
          bad: {
            text: "마음은 복잡했지만, 버티기 위해 공간을 조정한 건 패배가 아니었다.",
          },
          mixed: {
            text: "자존심은 조금 다쳤지만 숨통은 조금 트였다.",
          },
          good: {
            text: "네가 살기 위한 결정이 네 기준을 더 분명하게 만들었다.",
            delta: { money: 2 },
          },
        },
      },
      {
        id: "hold-rented-room",
        label: "독립을 고집한다",
        immediate: { money: -4, reputation: 1 },
        selfTrustDelta: 0,
        primaryStat: "money",
        modifier: -1,
        tendencyTags: ["money", "reputation"],
        results: {
          bad: {
            text: "독립은 지켰지만 생활은 더 가팔라졌다.",
            delta: { money: -2 },
          },
          mixed: { text: "버티고는 있지만, 계산기는 더 자주 켜진다." },
          good: {
            text: "간신히 버텨냈고, 그만큼 네 하루도 팽팽해졌다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
];
