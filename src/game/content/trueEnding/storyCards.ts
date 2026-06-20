import cheapLunchBoxImage from "../../../assets/images/characters/npc/cheap_lunch_box.png";
import blueFireImage from "../../../assets/images/characters/npc/blue_fire.png";
import extraShiftWorkImage from "../../../assets/images/characters/npc/extra_shift_work.png";
import failedTextOnPhoneImage from "../../../assets/images/characters/npc/failed_text_on_phone.png";
import memoImage from "../../../assets/images/characters/npc/memo.png";
import paperImage from "../../../assets/images/characters/npc/paper.png";
import rentDayNoticeImage from "../../../assets/images/characters/npc/rent_day_notice.png";
import sajaImage from "../../../assets/images/characters/npc/saja1.png";
import smallRoomImage from "../../../assets/images/characters/npc/small_room.png";

export type TrueEndingStoryChoice = {
  id: string;
  label: string;
  resultText: string;
};

export type TrueEndingStoryCard = {
  id: string;
  characterName: string;
  imageSrc: string;
  text: string;
  choices: {
    left: TrueEndingStoryChoice;
    right: TrueEndingStoryChoice;
  };
};

export const trueEndingStoryCards: TrueEndingStoryCard[] = [
  {
    id: "true-ending-rejection-room",
    characterName: "청령차사",
    imageSrc: failedTextOnPhoneImage,
    text:
      "새벽의 자취방.\n\n꺼지지 않은 노트북 옆에 구겨진 이력서가 놓여 있다.\n핸드폰에는 불합격 문자가 떠 있다.",
    choices: {
      left: {
        id: "hide-phone",
        label: "핸드폰을 엎는다",
        resultText: "안 봐도 문장은 남아 있었다.\n\n외면해도 실패가 사라지진 않았다.",
      },
      right: {
        id: "read-again",
        label: "다시 읽는다",
        resultText: "같은 문장인데 매번 다르게 아프다.\n\n그래도 아직 읽고 있다.",
      },
    },
  },
  {
    id: "true-ending-rejection-meaning",
    characterName: "청령차사",
    imageSrc: failedTextOnPhoneImage,
    text:
      "이번에도 안 되면 내가 아무것도 아닌 사람 같았다.\n\n문 하나가 닫혔다고 너까지 닫힌 건 아니라고.",
    choices: {
      left: {
        id: "ask-failure",
        label: "그럼 실패는 뭔데?",
        resultText: "실패는 끝이 아니라 선택지 앞에 섰다는 신호였다.\n\n그리고 청춘의 선택과 고민은 옛날부터 반복되어 왔다. \n\n오래되어 보이는 영혼 앞에 섰다.",
      },
      right: {
        id: "ask-alone",
        label: "나만 이런 게 아니야?",
        resultText: "아니었다.\n\n시대마다 고민의 이름만 달랐을 뿐이었다.\n\n오래되어 보이는 영혼 앞에 섰다.",
      },
    },
  },
  {
    id: "true-ending-blue-soul-joseon",
    characterName: "푸른 영혼",
    imageSrc: blueFireImage,
    text:
      "오래되어 보이는 파란 불꽃 앞에 섰다.\n\n불꽃은 말없이 흔들렸다.\n그리고 아주 먼 시대의 청춘이 천천히 모습을 드러냈다.",
    choices: {
      left: {
        id: "approach-joseon-soul",
        label: "불꽃에 다가간다",
        resultText:
          "푸른 빛이 손끝에 닿았다.\n\n낡은 종이 냄새와 촛불 그림자가 눈앞에 번졌다.",
      },
      right: {
        id: "watch-joseon-soul",
        label: "잠시 바라본다",
        resultText:
          "불꽃 속에서 오래된 방 하나가 떠올랐다.\n\n누군가 밤새 자신이 누구인지 묻고 있었다.",
      },
    },
  },
  {
    id: "true-ending-joseon-exam",
    characterName: "조선의 청년",
    imageSrc: paperImage,
    text:
      "촛불이 흔들리는 좁은 방.\n\n낡은 책과 붓이 함께 놓여 있다.\n과거에 붙으면 집안을 일으킬 수 있다.\n\n하지만 붓을 잡을 때만 살아있는 것 같았다.",
    choices: {
      left: {
        id: "choose-exam",
        label: "시험을 준비한다",
        resultText: "책을 다시 펼쳤다.\n\n마음은 조용해진 척했다.\n누군가를 지키려는 선택도 삶이었다.",
      },
      right: {
        id: "choose-painting",
        label: "몰래 그림을 그린다",
        resultText: "들키면 혼나겠지만, 선 안에 내가 있었다.\n\n자신을 잃지 않으려는 선택도 삶이었다.",
      },
    },
  },
  {
    id: "true-ending-joseon-question",
    characterName: "청령차사",
    imageSrc: paperImage,
    text:
      "저 사람도 자기가 뭘 해야 하는지 몰랐다.\n\n청춘은 처음부터 자신을 아는 시간이 아니었다.\n자신을 찾아가는 시간이었다.",
    choices: {
      left: {
        id: "envy-certainty",
        label: "아직 모르겠어",
        resultText: "모르는 채로 고르는 날들이 나를 만든다.",
      },
      right: {
        id: "accept-search",
        label: "찾아가는 중이구나",
        resultText: "정답보다 방향을 배워가는 중이었다.",
      },
    },
  },
  {
    id: "true-ending-blue-soul-postwar",
    characterName: "푸른 영혼",
    imageSrc: blueFireImage,
    text:
      "오래되어 보이는 파란 불꽃 앞에 섰다.\n\n이번 불꽃은 먼지 낀 바람처럼 흔들렸다.\n무너진 시대의 청춘이 그 안에서 기다리고 있었다.",
    choices: {
      left: {
        id: "approach-postwar-soul",
        label: "불꽃에 다가간다",
        resultText:
          "발밑에서 마른 흙먼지가 일었다.\n\n살아남는 일이 먼저였던 시간이 열렸다.",
      },
      right: {
        id: "listen-postwar-soul",
        label: "소리를 듣는다",
        resultText:
          "불꽃 너머로 배고픈 하루와 접어둔 꿈의 소리가 들렸다.\n\n그래도 꺼지지 않은 마음이 있었다.",
      },
    },
  },
  {
    id: "true-ending-postwar-bag",
    characterName: "전후 시대의 청년",
    imageSrc: cheapLunchBoxImage,
    text:
      "무너진 담장 앞.\n먼지 묻은 가방을 멘 청년이 서 있다.\n\n학교에 가고 싶었다.\n하지만 집에는 오늘 먹을 것이 부족했다.",
    choices: {
      left: {
        id: "work-for-family",
        label: "일을 구하러 간다",
        resultText: "꿈을 버린 건 아니었다.\n잠시 접어둔 것뿐이었다.\n\n살아남는 것도 어려운 선택이었다.",
      },
      right: {
        id: "study-at-night",
        label: "공부를 놓지 않는다",
        resultText: "밤마다 글자를 붙잡았다.\n내가 사라지는 것보다는 나았다.\n\n꿈을 붙잡는 것도 생존이었다.",
      },
    },
  },
  {
    id: "true-ending-postwar-survival",
    characterName: "청령차사",
    imageSrc: cheapLunchBoxImage,
    text:
      "선택이 꼭 멋있을 필요는 없었다.\n\n가끔은 버티는 게 전부인 날도 있었다.",
    choices: {
      left: {
        id: "small-choice",
        label: "그것도 선택이야?",
        resultText: "살아남겠다는 선택만큼 큰 것도 드물었다.",
      },
      right: {
        id: "remember-survival",
        label: "버틴 것도 남네",
        resultText: "남는다.\n\n아주 오래, 사람의 뼈대가 된다.",
      },
    },
  },
  {
    id: "true-ending-blue-soul-industrial",
    characterName: "푸른 영혼",
    imageSrc: blueFireImage,
    text:
      "오래되어 보이는 파란 불꽃 앞에 섰다.\n\n불꽃은 새벽 공장의 불빛처럼 작게 떨렸다.\n누군가의 긴 노동과 작은 꿈이 그 안에 남아 있었다.",
    choices: {
      left: {
        id: "approach-industrial-soul",
        label: "불꽃에 다가간다",
        resultText:
          "차가운 새벽 공기가 폐 안으로 들어왔다.\n\n도시락 가방을 든 청춘의 등이 보였다.",
      },
      right: {
        id: "hold-industrial-soul",
        label: "빛을 붙잡는다",
        resultText:
          "푸른 빛이 손안에서 작게 흔들렸다.\n\n잊지 않으려 적어둔 문장 하나가 떠올랐다.",
      },
    },
  },
  {
    id: "true-ending-industrial-bus",
    characterName: "산업화 시대의 청년",
    imageSrc: extraShiftWorkImage,
    text:
      "새벽 공장 앞 버스 정류장.\n작업복 차림의 청년이 도시락 가방을 들고 있다.\n\n돈을 벌면 동생을 학교에 보낼 수 있다.\n하지만 내가 뭘 좋아했는지 점점 잊어간다.",
    choices: {
      left: {
        id: "more-overtime",
        label: "야근을 더 한다",
        resultText: "손은 아팠지만 봉투가 조금 두꺼워졌다.\n\n누군가를 위한 선택도 청춘이었다.",
      },
      right: {
        id: "write-dream",
        label: "작은 꿈을 적는다",
        resultText: "낡은 수첩에 적었다.\n\n언젠가 내 가게를 갖고 싶다.\n\n작은 문장 하나가 사람을 살릴 때도 있었다.",
      },
    },
  },
  {
    id: "true-ending-industrial-note",
    characterName: "청령차사",
    imageSrc: memoImage,
    text:
      "그 사람이 꿈을 이루었는지는 모른다.\n\n하지만 잊지 않으려고 했다.\n그게 중요했다.",
    choices: {
      left: {
        id: "ask-enough",
        label: "그걸로 충분해?",
        resultText: "어떤 날엔 충분하다.\n\n자기 이름을 잃지 않았으니까.",
      },
      right: {
        id: "hold-name",
        label: "잊고 싶지 않아",
        resultText: "그 마음이 있으면 아직 끝난 게 아니었다.",
      },
    },
  },
  {
    id: "true-ending-blue-soul-imf",
    characterName: "푸른 영혼",
    imageSrc: blueFireImage,
    text:
      "오래되어 보이는 파란 불꽃 앞에 섰다.\n\n이번 불꽃은 닫힌 문 앞에서 멈춘 숨처럼 흔들렸다.\n무너진 뒤에도 끝나지 않은 청춘이 그 안에 있었다.",
    choices: {
      left: {
        id: "approach-imf-soul",
        label: "불꽃에 다가간다",
        resultText:
          "정장 소매 끝이 구겨진 손 하나가 보였다.\n\n닫힌 문 앞에서도 삶은 계속되고 있었다.",
      },
      right: {
        id: "wait-imf-soul",
        label: "곁에 머문다",
        resultText:
          "푸른 불꽃은 서두르지 않았다.\n\n무너진 사람에게도 다시 숨을 고를 시간이 필요했다.",
      },
    },
  },
  {
    id: "true-ending-imf-door",
    characterName: "IMF 시대의 청년",
    imageSrc: rentDayNoticeImage,
    text:
      "닫힌 회사 문 앞.\n정장 차림의 청년이 구겨진 이력서를 쥐고 있다.\n\n어제까지 다니던 회사가 오늘 문을 닫았다.\n내가 흔들리면 집도 같이 흔들릴 것 같았다.",
    choices: {
      left: {
        id: "any-work",
        label: "일을 시작한다",
        resultText: "하고 싶은 일은 아니었다.\n그래도 집으로 돌아갈 수는 없었다.\n\n책임도 선택이었다.",
      },
      right: {
        id: "fall-one-day",
        label: "하루만 무너진다",
        resultText: "그날은 아무것도 하지 못했다.\n처음으로 몰래 울었다.\n\n무너짐을 아는 것도 다시 세우는 시작이었다.",
      },
    },
  },
  {
    id: "true-ending-imf-rest",
    characterName: "청령차사",
    imageSrc: rentDayNoticeImage,
    text:
      "무너지지 않는 사람은 없었다.\n\n중요한 건 거기서 자기 자신을 미워하지 않는 일이었다.",
    choices: {
      left: {
        id: "fear-collapse",
        label: "무너지면 끝날까 봐",
        resultText: "끝이 아니라 신호일 때도 있다.\n\n쉬어야 한다는 신호.",
      },
      right: {
        id: "stop-hating",
        label: "미워하지 않는다",
        resultText: "그건 아주 오래 걸리는 선택이다.\n\n그래도 해볼 만하다.",
      },
    },
  },
  {
    id: "true-ending-present-room",
    characterName: "청령차사",
    imageSrc: smallRoomImage,
    text:
      "다시 자취방.\n창밖이 조금 밝아지고 있다.\n\n나는 취업에 실패했다.\n그래서 내가 실패한 사람인 줄 알았다.\n\n하지만 나는 실패한 사람이 아니라 선택지 앞에 선 사람이었다.",
    choices: {
      left: {
        id: "write-again",
        label: "다시 지원서를 쓴다",
        resultText: "아직 무섭다.\n그래도 나를 미워하면서 쓰진 않을래.\n\n이번 선택은 전보다 조금 더 나답다.",
      },
      right: {
        id: "text-friend",
        label: "친구에게 답장한다",
        resultText: "나 떨어졌어.\n근데 밥은 먹고 싶어.\n\n그 정도면 충분했다.\n살아가는 쪽을 고른 거니까.",
      },
    },
  },
  {
    id: "true-ending-present-answer",
    characterName: "청령차사",
    imageSrc: smallRoomImage,
    text:
      "청춘은 정답을 맞히는 시간이 아니었다.\n계속 자신을 찾아가는 시간이었다.\n\n취업은 길 중 하나일 뿐.\n나 자체가 답안지는 아니었다.",
    choices: {
      left: {
        id: "not-answer",
        label: "답은 아니구나",
        resultText: "삶은 합격 통지보다 넓었다.",
      },
      right: {
        id: "still-afraid",
        label: "그래도 무서워",
        resultText: "무서워도 괜찮다.\n\n무서운 채로 고르는 게 청춘이었다.",
      },
    },
  },
  {
    id: "true-ending-final-choice",
    characterName: "청령차사",
    imageSrc: sajaImage,
    text:
      "아침빛이 방 안으로 들어온다.\n끝났다고 생각했던 물건들이 다시 보인다.\n\n아직 모르겠어도 괜찮다.\n아직 모르는 채로 고르는 게 청춘이니까.",
    choices: {
      left: {
        id: "rest-today",
        label: "조금 쉬어간다",
        resultText: "오늘은 쉬어간다.\n도망이 아니라 숨 고르기라고 믿어본다.\n\n쉬는 것도 삶의 선택지다.",
      },
      right: {
        id: "walk-again",
        label: "다시 걸어간다",
        resultText: "아직 모르겠지만 다시 걸어가본다.\n\n모르는 채로 걷는 것.\n그게 청춘이다.",
      },
    },
  },
];
