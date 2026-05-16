import type { EventCard } from "../../core/gameTypes";

export const tutorialEvents: EventCard[] = [
  {
    id: "afterlife-gate",
    category: "tutorial",
    phase: "early20s",
    text:
      "검은 문 앞에 안개가 낮게 깔린다. 갓을 눌러쓴 차사가 너를 바라본다. \"멈추지 마라. 이곳에서 멈춘 영혼은 길을 잃는다.\"",
    choices: [
      {
        id: "follow-quietly",
        label: "말없이 앞으로 간다",
        immediate: { reputation: 2, mental: 1 },
        selfTrustDelta: 1,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["first_step"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "\"겁먹는 건 이상한 일이 아니다. 다만 멈춰 서 있지는 마라.\" 차사의 목소리는 차갑지만, 조급하지는 않다.",
          },
          mixed: {
            text: "\"좋다. 네 발로 걷는 편이 낫다.\" 문턱을 넘자 발밑의 안개가 조금 옅어진다.",
            delta: { mental: 1 },
          },
          good: {
            text: "\"그래. 앞으로 와라.\" 차사는 한 걸음 비켜서며 길을 내준다.",
            delta: { reputation: 1, mental: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "hesitate-at-gate",
        label: "문 앞에서 머뭇거린다",
        immediate: { mental: -1, reputation: -1 },
        selfTrustDelta: -1,
        primaryStat: "mental",
        modifier: -1,
        memoryTags: ["hesitation"],
        tendencyTags: ["comparison"],
        results: {
          bad: {
            text: "\"망설이는군.\" 차사의 소매 끝이 흔들린다. \"도망쳐도 끝은 바뀌지 않는다.\"",
            delta: { mental: -1 },
            selfTrustDelta: -1,
          },
          mixed: {
            text: "\"두려우면 걷는 속도만 늦춰라. 발을 멈추지는 마라.\" 차사는 등을 돌리지 않은 채 기다린다.",
          },
          good: {
            text: "\"...그래도 오긴 오는군.\" 꾸짖는 말보다 낮은 한숨이 먼저 닿는다.",
            delta: { mental: 1 },
          },
        },
      },
    ],
  },
  {
    id: "rule-of-the-road",
    category: "tutorial",
    phase: "early20s",
    text:
      "차사는 허리춤의 두루마리를 한 번 눌러 쥔다. \"질문은 걸으면서 해라. 이 길에서는 멈춘 자보다, 뒤를 돌아본 자가 더 오래 운다.\"",
    choices: [
      {
        id: "ask-about-the-rule",
        label: "왜 뒤를 돌아보면 안 되는지 묻는다",
        immediate: { mental: 1 },
        selfTrustDelta: 1,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["asked_rule"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "\"남은 것을 찾기 시작하기 때문이다.\" 짧은 대답 뒤에 긴 침묵이 따라온다.",
          },
          mixed: {
            text: "\"잃은 얼굴을 세기 시작하면, 발이 앞으로 나가지 않는다.\" 그의 시선은 잠시 허공에 머문다.",
            delta: { mental: 1 },
          },
          good: {
            text: "\"아는 얼굴이 하나도 남지 않았을 때, 사람은 이상한 선택을 한다.\" 그 말은 설명이라기보다 흘러나온 기억에 가깝다.",
            delta: { mental: 1, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "just-obey",
        label: "묻지 않고 계속 걷는다",
        immediate: { reputation: 2 },
        selfTrustDelta: 0,
        primaryStat: "reputation",
        modifier: 1,
        memoryTags: ["silent_obedience"],
        tendencyTags: ["reputation"],
        results: {
          bad: {
            text: "\"순한 영혼이군. 그런 자들도 종종 길을 잃는다.\" 차사는 칭찬처럼 들리지 않는 말을 남긴다.",
          },
          mixed: {
            text: "\"지금은 그걸로 됐다.\" 그의 걸음이 조금 빨라진다.",
            delta: { reputation: 1 },
          },
          good: {
            text: "\"묻지 않는 것도 재능은 아니다.\" 그럼에도 차사는 너를 재촉하지 않는다.",
            delta: { reputation: 1, mental: 1 },
          },
        },
      },
    ],
  },
  {
    id: "lantern-crossroad",
    category: "tutorial",
    phase: "early20s",
    text:
      "갈림길 앞, 작은 등불 하나가 바닥 가까이 흔들린다. 차사가 먼저 손을 뻗었다가 멈춘다. \"나도 한때는 도망치려 했다.\"",
    choices: [
      {
        id: "step-toward-him",
        label: "차사 곁으로 다가간다",
        immediate: { mental: 2, reputation: 1 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["shared_grief"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "\"동정하지 마라.\" 말은 단단하지만, 끝이 조금 흐려진다.",
          },
          mixed: {
            text: "\"...그래도 잘 들었군.\" 등불의 불씨가 잠깐 흔들리다 다시 선다.",
            delta: { mental: 1 },
          },
          good: {
            text: "\"좋다. 이제 네가 어디로 가야 하는지는 내가 안다.\" 처음으로 그의 목소리에 미세한 온기가 돈다.",
            delta: { mental: 1, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "look-away",
        label: "아무 말 없이 시선을 피한다",
        immediate: { mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "reputation",
        modifier: -1,
        memoryTags: ["looked_away"],
        tendencyTags: ["comparison"],
        results: {
          bad: {
            text: "\"그래. 그런 눈도 익숙하다.\" 차사는 더 말하지 않고 앞장선다.",
            delta: { mental: -1, reputation: -1 },
          },
          mixed: {
            text: "\"듣지 못한 것으로 하겠다. 대신 발은 떼어라.\" 등불이 갈림길을 비춘다.",
          },
          good: {
            text: "\"무서운 건 숨겨도 된다. 멈추지만 마라.\" 차사의 말은 명령 같지만 위로에 더 가깝다.",
            delta: { mental: 1 },
          },
        },
      },
    ],
  },
];
