import type { EventCard, EventChoice } from "../../core/gameTypes";

function interviewChoice(params: {
  id: string;
  label: string;
  resultText: string;
  memoryTags?: string[];
  tendencyTags?: EventChoice["tendencyTags"];
}): EventChoice {
  return {
    id: params.id,
    label: params.label,
    immediate: {},
    selfTrustDelta: 0,
    primaryStat: "mental",
    modifier: 0,
    memoryTags: params.memoryTags,
    tendencyTags: params.tendencyTags,
    results: {
      bad: { text: params.resultText },
      mixed: { text: params.resultText },
      good: { text: params.resultText },
    },
  };
}

export const interviewEvents: EventCard[] = [
  {
    id: "final-interview-eve",
    characterName: "나",
    category: "interview",
    phase: "late20s",
    text:
      "드디어 내일 면접이다.\n\n달력에 표시해 둔 날짜가 오늘 밤 바로 앞까지 다가왔다.",
    choices: [
      interviewChoice({
        id: "review-key-points",
        label: "핵심만 훑는다",
        resultText:
          "답을 전부 외우려 하지는 않았다.\n\n대신 꼭 말하고 싶은 경험과 이유만 다시 확인했다.",
        memoryTags: ["interview_day"],
        tendencyTags: ["spec"],
      }),
      interviewChoice({
        id: "sleep-before-interview",
        label: "그냥 잔다",
        resultText:
          "불안은 남아 있었지만, 더 붙잡고 있어도 답이 선명해질 것 같지는 않았다.\n\n불을 끄자 심장이 천천히 밤에 적응했다.",
        memoryTags: ["interview_day"],
        tendencyTags: ["mental"],
      }),
    ],
  },
  {
    id: "final-interview-arrival",
    characterName: "나",
    category: "interview",
    phase: "late20s",
    text:
      "면접 시간보다 30분 일찍 도착했다.\n\n너무 떨린다. 손바닥에 땀이 찬다.",
    choices: [
      interviewChoice({
        id: "breathe-in-lobby",
        label: "숨을 고른다",
        resultText:
          "목이 조금 풀렸다.\n\n떨림이 사라지지는 않았지만, 적어도 내가 여기까지 왔다는 사실은 분명했다.",
        tendencyTags: ["mental"],
      }),
      interviewChoice({
        id: "check-documents",
        label: "서류를 확인한다",
        resultText:
          "파일명, 출력물, 신분증.\n\n몇 번이고 확인한 것들이지만 다시 보니 마음 한구석이 조금 안정됐다.",
        tendencyTags: ["spec"],
      }),
    ],
  },
  {
    id: "final-interview-enter-room",
    characterName: "면접관",
    category: "interview",
    phase: "late20s",
    text:
      "면접장에 들어서자 공기가 달라졌다.\n\n세 명의 면접관이 서류에서 눈을 들었다.",
    choices: [
      interviewChoice({
        id: "calm-greeting",
        label: "침착하게 인사한다",
        resultText:
          "목소리가 아주 조금 떨렸지만 인사는 끝까지 이어졌다.\n\n의자에 앉는 순간, 준비해 온 시간들이 등 뒤에 조용히 섰다.",
        tendencyTags: ["reputation"],
      }),
      interviewChoice({
        id: "honest-nervousness",
        label: "또렷하게 말한다",
        resultText:
          "긴장을 숨기지는 못했다.\n\n그래도 시선을 피하지 않고 첫 문장을 꺼냈다.",
        tendencyTags: ["mental"],
      }),
    ],
  },
  {
    id: "final-interview-contribution",
    characterName: "면접관",
    category: "interview",
    phase: "late20s",
    text:
      "\"회사에서 어떻게 기여할 수 있을지 알려주세요.\"\n\n머릿속이 잠깐 하얘졌다.",
    choices: [
      interviewChoice({
        id: "answer-with-experience",
        label: "경험으로 답한다",
        resultText:
          "프로젝트에서 맡았던 역할과 배운 점을 하나씩 꺼냈다.\n\n거창한 약속보다, 실제로 해 본 일에서 시작했다.",
        memoryTags: ["steady_answer"],
        tendencyTags: ["spec"],
      }),
      interviewChoice({
        id: "answer-with-growth",
        label: "성장으로 답한다",
        resultText:
          "모든 걸 이미 잘한다고 말하지 않았다.\n\n대신 모르는 것을 어떻게 따라잡아 왔는지, 앞으로도 어떻게 해낼지 설명했다.",
        memoryTags: ["steady_answer"],
        tendencyTags: ["selfTrust"],
      }),
    ],
  },
  {
    id: "final-interview-weakness",
    characterName: "면접관",
    category: "interview",
    phase: "late20s",
    text:
      "\"본인의 단점에 대해 알려주세요.\"\n\n잘못 말하면 변명처럼 들릴 것 같고, 너무 솔직하면 부족해 보일 것 같다.",
    choices: [
      interviewChoice({
        id: "weakness-with-fix",
        label: "솔직히 말한다",
        resultText:
          "부족한 점을 숨기지 않았다.\n\n다만 그 부족함을 어떻게 기록하고, 어떻게 줄여 왔는지도 함께 말했다.",
        tendencyTags: ["mental", "spec"],
      }),
      interviewChoice({
        id: "weakness-with-example",
        label: "거짓말한다",
        resultText:
          "한 번의 실수를 이야기했다.\n\n그때의 부끄러움보다, 이후에 바꾼 행동을 더 길게 설명했다.",
        tendencyTags: ["reputation", "selfTrust"],
      }),
    ],
  },
  {
    id: "final-interview-finished",
    characterName: "나",
    category: "interview",
    phase: "late20s",
    text:
      "정신없이 면접이 끝났다.\n\n무슨 말을 했는지 조차 않는다.",
    choices: [
      interviewChoice({
        id: "accept-the-day",
        label: "휴...",
        resultText:
          "완벽하지는 않았다.\n\n그래도 이 하루를 통과한 사람은 다른 누구도 아닌 나였다.",
        memoryTags: ["interview_day", "steady_answer"],
        tendencyTags: ["selfTrust"],
      }),
      interviewChoice({
        id: "wait-for-result",
        label: "휴...",
        resultText:
          "핸드폰을 손에 쥐고 건물을 나섰다.\n\n이제 남은 것은 기다리는 일뿐이다.",
        memoryTags: ["interview_day"],
        tendencyTags: ["mental"],
      }),
    ],
  },
];

export const finalInterviewEventId = interviewEvents[0].id;
export const lastInterviewEventId = interviewEvents[interviewEvents.length - 1].id;

export function isInterviewEventId(eventId: string) {
  return interviewEvents.some((event) => event.id === eventId);
}

export function getNextInterviewEventId(eventId: string) {
  const currentIndex = interviewEvents.findIndex((event) => event.id === eventId);
  return currentIndex >= 0 ? interviewEvents[currentIndex + 1]?.id ?? null : null;
}
