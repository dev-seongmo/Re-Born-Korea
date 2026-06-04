import type { EventCard } from "../../core/gameTypes";

export const moneyEvents: EventCard[] = [
  {
    id: "extra-shift-offer",
    category: "money",
    phase: "early20s",
    text: "주말 알바 사장이 한 타임 더 나와줄 수 있냐고 묻는다.",
    choices: [
      {
        id: "protect-weekend",
        label: "시간을 지킨다",
        immediate: { money: -2, mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["self_pace"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "통장은 아쉬웠지만 너는 스스로를 소모품처럼 다루지 않았다.",
          },
          mixed: { text: "잔고는 줄었어도 네 하루는 조금 더 사람답게 흘렀다." },
          good: { text: "짧은 회복이 다음 주를 버티게 했다.", delta: { mental: 2 } },
        },
      },
      {
        id: "take-extra-shift",
        label: "더 일한다",
        immediate: { money: 4, mental: -2 },
        selfTrustDelta: -1,
        primaryStat: "money",
        modifier: 1,
        tendencyTags: ["money"],
        results: {
          bad: { text: "돈은 벌었지만 몸이 먼저 지쳤다.", delta: { mental: -2 } },
          mixed: { text: "잔고는 늘었고 네 시간은 조금 줄었다." },
          good: {
            text: "이번 주는 버틸 수 있게 됐지만, 이런 식의 버팀은 오래 못 간다.",
            delta: { money: 2 },
          },
        },
      },
    ],
  },
  {
    id: "rent-day-panic",
    category: "money",
    phase: "mid20s",
    text: "월세 빠지는 날이 다가오는데 잔고가 생각보다 적다.",
    choices: [
      {
        id: "sell-something",
        label: "물건을 판다",
        immediate: { money: 3, mental: -1 },
        selfTrustDelta: 1,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money"],
        results: {
          bad: { text: "필요했던 물건 하나를 내보내며 현실의 무게를 실감했다." },
          mixed: {
            text: "근본 해결은 아니지만 이번 달은 넘길 수 있게 됐다.",
            delta: { money: 1 },
          },
          good: {
            text: "생각보다 빨리 정리됐고 숨통도 조금 트였다.",
            delta: { money: 2 },
          },
        },
      },
      {
        id: "borrow-quietly",
        label: "급히 빌린다",
        immediate: { money: 4, reputation: -1, mental: -2 },
        selfTrustDelta: -1,
        primaryStat: "reputation",
        modifier: 0,
        tendencyTags: ["money", "reputation"],
        results: {
          bad: {
            text: "위기는 넘겼지만 마음의 빚도 같이 생겼다.",
            delta: { mental: -2 },
          },
          mixed: { text: "현실은 급히 봉합됐지만 표정은 오래 편하지 않았다." },
          good: {
            text: "도움 덕에 버텼지만 다음 달 걱정은 이미 시작됐다.",
            delta: { money: 1 },
          },
        },
      },
    ],
  },
  {
    id: "cheap-lunch-week",
    category: "money",
    phase: "mid20s",
    text: "이번 주는 식비를 아끼려고 편의점 도시락만 먹을지 고민한다.",
    choices: [
      {
        id: "keep-one-good-meal",
        label: "한 끼는 챙긴다",
        immediate: { money: -1, mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["warm_meal"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "여유롭진 않았지만 너는 최소한의 따뜻함을 포기하지 않았다." },
          mixed: { text: "작은 식사가 생각보다 큰 회복이 되었다." },
          good: {
            text: "한 끼의 정성이 네 하루 전체를 조금 덜 삭막하게 했다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "save-on-food",
        label: "최대한 아낀다",
        immediate: { money: 2, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "money",
        modifier: 1,
        tendencyTags: ["money"],
        results: {
          bad: {
            text: "돈은 남았지만 너를 대하는 방식이 조금 더 거칠어졌다.",
            delta: { mental: -2 },
          },
          mixed: { text: "현실적인 선택이었지만 삶의 맛도 조금 옅어졌다." },
          good: {
            text: "이번 주는 버텼다. 다만 오래 계속할 방식은 아니었다.",
            delta: { money: 1 },
          },
        },
      },
    ],
  },
  {
    id: "unexpected-refund",
    category: "money",
    phase: "late20s",
    text: "생각 못 한 환급금이 들어왔다. 크진 않지만 숨을 돌릴 만큼은 된다.",
    choices: [
      {
        id: "save-it",
        label: "비상금으로 둔다",
        immediate: { money: 3 },
        selfTrustDelta: 1,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money"],
        results: {
          bad: { text: "큰돈은 아니지만 예상치 못한 완충재가 생겼다." },
          mixed: {
            text: "작은 여유가 다음 공포를 조금 늦춰 주었다.",
            delta: { money: 1 },
          },
          good: {
            text: "비상금이라는 이름은 생각보다 큰 안정을 준다.",
            delta: { mental: 1 },
          },
        },
      },
      {
        id: "buy-comfort",
        label: "작은 위로를 산다",
        immediate: { money: -2, mental: 2 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["small_comfort"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "완벽히 합리적이진 않았지만, 네 삶은 합리성만으로 버티지 않는다.",
          },
          mixed: { text: "작은 소비가 네 마음을 조금 더 현재로 데려왔다." },
          good: { text: "죄책감보다 위로가 더 크게 남았다.", delta: { mental: 2 } },
        },
      },
    ],
  },
];
