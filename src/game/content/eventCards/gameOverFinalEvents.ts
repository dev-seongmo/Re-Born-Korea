import type { EventCard, EventChoice, GameOverReason } from "../../core/gameTypes";

function makeFinalChoice(params: {
  id: string;
  label: string;
  resultText: string;
}): EventChoice {
  return {
    id: params.id,
    label: params.label,
    immediate: {},
    selfTrustDelta: 0,
    primaryStat: "mental",
    modifier: 0,
    results: {
      bad: { text: params.resultText },
      mixed: { text: params.resultText },
      good: { text: params.resultText },
    },
  };
}

export const gameOverFinalEventIds: Record<GameOverReason, string> = {
  money_zero: "game-over-final-money-zero",
  money_max: "game-over-final-money-max",
  spec_zero: "game-over-final-spec-zero",
  spec_max: "game-over-final-spec-max",
  reputation_zero: "game-over-final-reputation-zero",
  reputation_max: "game-over-final-reputation-max",
  mental_zero: "game-over-final-mental-zero",
  mental_max: "game-over-final-mental-max",
};

export const gameOverFinalEvents: EventCard[] = [
  {
    id: gameOverFinalEventIds.money_zero,
    characterName: "편의점 영수증",
    category: "money",
    phase: "early20s",
    text:
      "큰일이다.\n\n잔고가 비었다. 내일 교통비도, 점심값도, 이번 달 생활비도 계산이 맞지 않는다.\n\n대출 문자를 누르려다 손이 멈췄다. 다시 본가로 돌아가야 할지도 모른다.",
    choices: [
      makeFinalChoice({
        id: "call-home",
        label: "부모님께 연락한다",
        resultText: "어느 쪽이든, 내일 면접장까지 걸어갈 힘은 남지 않았다.",
      }),
      makeFinalChoice({
        id: "open-loan-message",
        label: "대출 문자를 연다",
        resultText: "어느 쪽이든, 내일 면접장까지 걸어갈 힘은 남지 않았다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.money_max,
    characterName: "통장 알림",
    category: "money",
    phase: "early20s",
    text:
      "돈은 충분했다.\n\n그런데 이상하게도 아무 선택도 쉽게 할 수 없었다. 잃을까 봐, 손해 볼까 봐, 다시 가난해질까 봐.\n\n모든 하루가 계산표가 되었다.",
    choices: [
      makeFinalChoice({
        id: "recalculate",
        label: "계산을 다시 한다",
        resultText: "통장은 가득 찼지만, 삶은 더 이상 움직이지 않았다.",
      }),
      makeFinalChoice({
        id: "spend-nothing",
        label: "아무것도 쓰지 않는다",
        resultText: "통장은 가득 찼지만, 삶은 더 이상 움직이지 않았다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.spec_zero,
    characterName: "빈 이력서",
    category: "spec",
    phase: "early20s",
    text:
      "지원서를 열었다.\n\n경력란은 비어 있었고, 자격란도 비어 있었다. 써넣을 말보다 지워야 할 말이 더 많았다.\n\n마감 시간은 조용히 지나가고 있었다.",
    choices: [
      makeFinalChoice({
        id: "stare-at-blanks",
        label: "빈칸을 바라본다",
        resultText: "증명할 것이 없다는 말은, 가능성이 없다는 말처럼 들렸다.",
      }),
      makeFinalChoice({
        id: "close-posting",
        label: "공고를 닫는다",
        resultText: "증명할 것이 없다는 말은, 가능성이 없다는 말처럼 들렸다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.spec_max,
    characterName: "자격증 파일",
    category: "spec",
    phase: "early20s",
    text:
      "파일은 빼곡했다.\n\n자격증, 수료증, 포트폴리오, 추천서. 모든 것이 준비되어 있는데도 다음 증명이 필요할 것 같았다.\n\n완벽하지 않으면 시작할 수 없었다.",
    choices: [
      makeFinalChoice({
        id: "prepare-one-more",
        label: "하나 더 준비한다",
        resultText: "이력서는 완성됐지만, 너는 그 안에서 사라졌다.",
      }),
      makeFinalChoice({
        id: "feel-insufficient",
        label: "아직 부족하다고 느낀다",
        resultText: "이력서는 완성됐지만, 너는 그 안에서 사라졌다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.reputation_zero,
    characterName: "읽지 않은 메시지",
    category: "comparison",
    phase: "early20s",
    text:
      "연락을 보냈다.\n\n답장은 오지 않았다. 추천을 부탁한 메시지도, 안부를 묻는 말도 조용히 묻혔다.\n\n문은 닫힌 게 아니라, 아무도 열어주지 않는 쪽에 가까웠다.",
    choices: [
      makeFinalChoice({
        id: "ask-again",
        label: "다시 부탁한다",
        resultText: "기회는 혼자 오는 법이 없었다. 이번에는 아무도 부르지 않았다.",
      }),
      makeFinalChoice({
        id: "delete-message",
        label: "보낸 메시지를 지운다",
        resultText: "기회는 혼자 오는 법이 없었다. 이번에는 아무도 부르지 않았다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.reputation_max,
    characterName: "단체 채팅방",
    category: "comparison",
    phase: "early20s",
    text:
      "모두가 너를 믿고 있었다.\n\n“네가 하면 되잖아.” “이번에도 부탁해.” “너라면 괜찮지?”\n\n기대는 응원이 아니라, 도망칠 수 없는 역할이 되었다.",
    choices: [
      makeFinalChoice({
        id: "say-okay",
        label: "괜찮다고 답한다",
        resultText: "실망시키지 않기 위해 웃는 동안, 너의 선택은 사라졌다.",
      }),
      makeFinalChoice({
        id: "accept-again",
        label: "또 맡겠다고 한다",
        resultText: "실망시키지 않기 위해 웃는 동안, 너의 선택은 사라졌다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.mental_zero,
    characterName: "꺼진 알람",
    category: "mental",
    phase: "early20s",
    text:
      "알람은 여러 번 울렸다.\n\n몸은 움직이지 않았다. 해야 할 일은 그대로였고, 메시지는 쌓였고, 창밖은 이미 밝았다.\n\n오늘을 시작할 마음이 남아 있지 않았다.",
    choices: [
      makeFinalChoice({
        id: "close-eyes",
        label: "눈을 감는다",
        resultText: "버티는 힘이 다한 하루는, 더 이상 선택지가 아니었다.",
      }),
      makeFinalChoice({
        id: "turn-off-alarm",
        label: "알람을 끈다",
        resultText: "버티는 힘이 다한 하루는, 더 이상 선택지가 아니었다.",
      }),
    ],
  },
  {
    id: gameOverFinalEventIds.mental_max,
    characterName: "괜찮다는 말",
    category: "mental",
    phase: "early20s",
    text:
      "괜찮다고 말했다.\n\n피곤해도 괜찮고, 아파도 괜찮고, 무너져도 괜찮다고 했다. 힘들다는 신호는 전부 이겨내야 할 문제로 바뀌었다.\n\n그러다 어느 순간, 정말 괜찮지 않다는 걸 알았다.",
    choices: [
      makeFinalChoice({
        id: "endure-once-more",
        label: "한 번 더 참는다",
        resultText: "무너지지 않는 척하던 마음은, 끝내 스스로를 놓쳐버렸다.",
      }),
      makeFinalChoice({
        id: "pretend-fine",
        label: "아무렇지 않은 척한다",
        resultText: "무너지지 않는 척하던 마음은, 끝내 스스로를 놓쳐버렸다.",
      }),
    ],
  },
];

export function getGameOverFinalEventId(reason: GameOverReason) {
  return gameOverFinalEventIds[reason];
}

export function isGameOverFinalEventId(eventId: string) {
  return gameOverFinalEvents.some((event) => event.id === eventId);
}
