import type { EventCard } from "../../core/gameTypes";

export const tutorialEvents: EventCard[] = [
  {
    id: "tutorial-dark-news",
    category: "tutorial",
    phase: "early20s",
    text:
      "새벽 뉴스 속보가 휴대폰 화면을 가득 메운다. 청년 실업, 고독사, 사라진 미래. 화면이 꺼지는 순간 방 안의 공기가 식고, 검은 갓을 눌러쓴 저승사자가 침대 곁에 걸터앉는다. 그는 네가 지금부터 한 청년의 마지막 하루들을 다시 건너며 선택을 바꿔볼 거라고 말한다.",
    choices: [
      {
        id: "hear-him-out",
        label: "숨을 고르고, 저승사자의 말을 끝까지 듣는다.",
        immediate: { mental: 1 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["tutorial_reaper"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "믿기 어렵지만, 적어도 도망치지 않기로 한 순간 공포가 조금 정리된다.",
          },
          mixed: {
            text: "상황은 여전히 기이하지만, 설명을 들을 준비는 되었다.",
            selfTrustDelta: 1,
          },
          good: {
            text: "두려움 속에서도 정신을 붙든 채, 누군가의 삶을 끝까지 보겠다고 마음먹는다.",
            delta: { mental: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "deny-and-freeze",
        label: "악몽이라 여기고 눈을 감은 채 버틴다.",
        immediate: { mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "mental",
        modifier: -1,
        tendencyTags: ["comparison"],
        results: {
          bad: {
            text: "현실을 부정할수록 숨이 더 가빠진다. 저승사자의 목소리만 또렷해진다.",
            delta: { mental: -1 },
            selfTrustDelta: -1,
          },
          mixed: {
            text: "눈을 감아도 사라지지 않는다. 결국 듣게 될 이야기라면 지금이 낫다.",
          },
          good: {
            text: "끝내 눈을 뜬다. 떨리는 손끝으로도 상황을 마주하려는 의지가 남아 있다.",
            selfTrustDelta: 1,
          },
        },
      },
    ],
  },
  {
    id: "tutorial-reaper-briefing",
    category: "tutorial",
    phase: "early20s",
    text:
      "저승사자는 손가락으로 허공에 네 개의 금을 그린다. 스펙, 돈, 평판, 멘탈. 그리고 아무에게도 보이지 않는 마지막 축, 자기신뢰. 카드를 넘길 때마다 청년은 한쪽으로 기울고, 네 선택은 그가 스스로를 버릴지 붙들지 정한다. 살아남는 것만이 목표는 아니라고, 그는 낮은 목소리로 덧붙인다.",
    choices: [
      {
        id: "accept-the-rules",
        label: "규칙을 받아들이고, 이 삶을 끝까지 조정해보기로 한다.",
        immediate: { spec: 1, mental: 1 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["tutorial_rules"],
        tendencyTags: ["selfTrust"],
        results: {
          bad: {
            text: "무게감은 크지만, 적어도 이제 무엇을 지켜야 하는지는 알게 된다.",
          },
          mixed: {
            text: "완전히 이해한 것은 아니어도, 선택의 책임을 피하지 않기로 한다.",
            delta: { mental: 1 },
          },
          good: {
            text: "그의 삶을 점수표가 아니라 사람으로 보겠다는 다짐이 생긴다.",
            delta: { mental: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "treat-it-like-a-game",
        label: "일단은 게임처럼 생각하고 결과만 챙기기로 한다.",
        immediate: { spec: 1, reputation: 1, mental: -1 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "reputation", "comparison"],
        results: {
          bad: {
            text: "수치는 보이지만 사람은 흐려진다. 저승사자의 표정이 한층 어두워진다.",
            delta: { mental: -1 },
          },
          mixed: {
            text: "당장 효율은 보이지만, 무엇을 잃는지는 아직 체감되지 않는다.",
          },
          good: {
            text: "짧게는 진전이 있어 보인다. 그러나 그 속도감이 늘 정답은 아니다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "tutorial-last-day-bed",
    category: "tutorial",
    phase: "early20s",
    text:
      "눈을 뜬 청년은 눅눅한 원룸 천장을 바라본다. 면접 일정, 밀린 월세, 읽지 않은 연락, 그리고 어젯밤 검색창에 남은 '편하게 사라지는 법'. 저승사자는 오늘이 마지막 하루가 될 수도 있다고 말하며, 이제부터는 네가 그의 하루를 한 장씩 넘기게 된다고 속삭인다.",
    choices: [
      {
        id: "get-him-up-gently",
        label: "급한 일보다 먼저 몸을 일으키고 물을 마시게 한다.",
        immediate: { mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["survival", "warm_meal"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "당장 해결된 것은 없지만, 오늘 하루를 버틸 최소한의 감각은 되찾는다.",
          },
          mixed: {
            text: "조금 늦어지더라도 무너지지 않는 쪽이 낫다는 판단이 선다.",
            delta: { mental: 1 },
          },
          good: {
            text: "살아 있는 몸을 먼저 돌본 선택이, 하루 전체의 무게를 아주 조금 바꿔 놓는다.",
            delta: { mental: 1, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "push-straight-to-work",
        label: "불안을 밀어붙여 바로 채용 공고와 일정부터 확인하게 한다.",
        immediate: { spec: 2, mental: -2 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "몸은 침대에서 일어났지만 마음은 더 깊이 가라앉는다. 오늘이 길게 느껴진다.",
            delta: { mental: -2 },
          },
          mixed: {
            text: "일정은 정리되지만, 그 모든 항목이 목을 조르는 목록처럼 보인다.",
            delta: { spec: 1 },
          },
          good: {
            text: "짧게는 추진력이 생긴다. 다만 너무 오래 이 방식에 기대면 부서지기 쉽다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
];
