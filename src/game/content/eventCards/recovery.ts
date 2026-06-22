import type { EventCard } from "../../core/gameTypes";

export const recoveryEvents: EventCard[] = [
  {
    id: "favorite-food-alone",
    category: "recovery",
    phase: "early20s",
    text: "유난히 지친 날, 네가 좋아하던 음식을 먹으러 갈까 말까 망설인다.",
    choices: [
      {
        id: "eat-favorite-food",
        label: "좋아하는 걸 먹는다",
        immediate: { money: -1, mental: 3 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["warm_meal", "small_comfort"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "근본 해결은 아니어도 네 하루는 분명 조금 덜 메말랐다." },
          mixed: { text: "좋아하는 맛은 아직 너를 기억하고 있었다." },
          good: {
            text: "따뜻한 한 끼가 네 이름을 잠깐 다시 불러줬다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "skip-comfort-meal",
        label: "그냥 참는다",
        immediate: { money: 1, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money"],
        results: {
          bad: { text: "절약은 했지만 오늘의 위로도 함께 사라졌다.", delta: { mental: -2 } },
          mixed: { text: "합리적이었지만 네 하루는 조금 더 딱딱해졌다." },
          good: { text: "이번 한 번은 넘어갔지만 아쉬움은 분명 남았다." },
        },
      },
    ],
  },
  {
    id: "old-hobby-folder",
    category: "recovery",
    phase: "mid20s",
    text: "방 한쪽에 오래 세워둔 기타가 눈에 들어온다. 줄은 조금 녹슬었지만, 한때는 이 소리가 그렇게 좋았다.",
    choices: [
      {
        id: "return-to-hobby",
        label: "기타를 다시 쳐본다",
        immediate: { mental: 3, spec: -1 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["old_love"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "손끝은 어색했고 코드는 자꾸 끊겼지만, 네 안에 아직 남아 있는 소리를 확인했다.",
          },
          mixed: { text: "완벽하진 않아도 방 안에 짧은 멜로디가 돌아왔다." },
          good: {
            text: "오래 잊고 있던 리듬이 손끝에 닿자 너도 조금 돌아왔다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "close-folder",
        label: "그냥 지나친다",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "쓸모없는 것은 나중에 한다는 규칙이 너를 조금 더 좁게 만들었다.",
            delta: { mental: -2 },
          },
          mixed: { text: "현실적이었지만 방 한쪽이 조금 더 조용해졌다." },
          good: { text: "오늘은 넘겼지만 기타를 지나친 손이 조금 오래 남았다." },
        },
      },
    ],
  },
  {
    id: "walk-without-purpose",
    category: "recovery",
    phase: "mid20s",
    text: "해야 할 일 사이에 잠깐 산책을 나가고 싶다. 목적 없는 시간이 너무 낯설다.",
    choices: [
      {
        id: "take-a-walk",
        label: "10분 걷는다",
        immediate: { mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["rest"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "완전히 개운하진 않아도 숨이 한 번은 바뀌었다." },
          mixed: { text: "쓸모 없는 10분이 오히려 하루를 조금 덜 소모시켰다." },
          good: {
            text: "잠깐의 바람이 머릿속 소음을 생각보다 많이 걷어냈다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "stay-at-desk",
        label: "자리에 남는다",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: { text: "자리는 지켰지만 마음은 점점 더 탁해졌다.", delta: { mental: -2 } },
          mixed: { text: "흐름은 이어졌지만 네 컨디션은 떨어졌다." },
          good: { text: "조금 더 한 건 맞지만, 네가 정말 원한 건 그게 아니었다." },
        },
      },
    ],
  },
];
