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
        label: "오늘은 내가 좋아하는 걸 먹는다.",
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
        label: "아깝다 생각하고 그냥 참는다.",
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
    text: "예전에 좋아했던 취미 폴더를 우연히 열었다. 한때는 이게 그렇게 좋았다.",
    choices: [
      {
        id: "return-to-hobby",
        label: "짧게라도 다시 해본다.",
        immediate: { mental: 3, spec: -1 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["old_love"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "오래 하진 못했어도 네 안에 아직 남아 있는 무언가를 확인했다.",
          },
          mixed: { text: "쓸모와 상관없이 좋은 것이 있다는 사실이 조금 돌아왔다." },
          good: {
            text: "좋아했던 감각이 다시 손끝에 닿자 너도 조금 돌아왔다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "close-folder",
        label: "지금은 사치라고 생각하고 닫는다.",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "쓸모없는 것은 먼저 버린다, 라는 규칙이 너를 더 좁게 만들었다.",
            delta: { mental: -2 },
          },
          mixed: { text: "현실적이었지만 조금 서늘했다." },
          good: { text: "오늘은 넘겼지만 폴더를 닫는 손이 조금 오래 남았다." },
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
        label: "10분만이라도 걷는다.",
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
        label: "괜히 흐름 끊길까 봐 자리에 남는다.",
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
  {
    id: "name-written-on-paper",
    category: "recovery",
    phase: "late20s",
    text: "메모장 한쪽에 네 이름을 적었다가 한참 바라보게 된다.",
    choices: [
      {
        id: "write-to-myself",
        label: "내 이름으로 짧은 문장을 남겨본다.",
        immediate: { mental: 2 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["name_return"],
        tendencyTags: ["selfTrust"],
        results: {
          bad: { text: "어색했지만 그 이름은 아직 너의 것이었다." },
          mixed: { text: "점수표보다 이름이 먼저 오는 순간이 잠깐 생겼다." },
          good: {
            text: "세상이 뭐라 부르든 너를 부를 말은 결국 네 이름이었다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "crumple-note",
        label: "감상에 젖는 것 같아 메모를 구겨버린다.",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["comparison"],
        results: {
          bad: { text: "민망함 뒤에 남은 건 더 익숙한 무표정뿐이었다.", delta: { mental: -2 } },
          mixed: { text: "다시 현실로 돌아왔지만, 무엇을 놓고 왔는지는 남았다." },
          good: { text: "구겨도 사라지진 않았다. 네 이름은 여전히 너를 기다리고 있었다." },
        },
      },
    ],
  },
];
