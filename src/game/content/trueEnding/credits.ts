import burnoutDeskImage from "../../../assets/images/characters/npc/burnout_desk.png";
import cheapLunchBoxImage from "../../../assets/images/characters/npc/cheap_lunch_box.png";
import failedTextOnPhoneImage from "../../../assets/images/characters/npc/failed_text_on_phone.png";
import friendImage from "../../../assets/images/characters/npc/friend.png";
import girlfriendImage from "../../../assets/images/characters/npc/girlfriend.png";
import momImage from "../../../assets/images/characters/npc/mom.png";
import smallRoomImage from "../../../assets/images/characters/npc/small_room.png";
import suitGuyImage from "../../../assets/images/characters/npc/suitguy.png";
import cherryBlossomGasanImage from "../../../assets/images/illustrations/endings/cherry_blossom_gasan.png";
import lastPersonInClassImage from "../../../assets/images/illustrations/endings/last_person_in_class.png";
import newsDecreaseImage from "../../../assets/images/illustrations/endings/news_73_decrease.png";
import newsCompetanceImage from "../../../assets/images/illustrations/endings/news_competance.png";
import surveyPlanHiringImage from "../../../assets/images/illustrations/endings/survey_plan_hiring.png";
import surveyLastWeekImage from "../../../assets/images/illustrations/endings/survey_what_did_you_do_last_week.webp";
import viewFromClassImage from "../../../assets/images/illustrations/endings/view_from_class.png";

export type TrueEndingCreditArticle = {
  type: "article";
  id: string;
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

export type TrueEndingCreditEvent = {
  type: "event";
  id: string;
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

export type TrueEndingCreditMessage = {
  type: "message";
  id: string;
  lines: string[];
};

export type TrueEndingCreditItem =
  | TrueEndingCreditArticle
  | TrueEndingCreditEvent
  | TrueEndingCreditMessage;

export type TrueEndingCreditsDefinition = {
  title: string;
  speedHint: string;
  completeLabel: string;
  items: TrueEndingCreditItem[];
};

export const trueEndingCredits: TrueEndingCreditsDefinition = {
  title: "thanks for playing",
  speedHint: "길게 누르기",
  completeLabel: "엔딩 닫기",
  items: [
    {
      type: "article",
      id: "news-73-decrease",
      title: "취업의 문턱",
      caption: "숫자로 남은 채용 축소의 감각.",
      imageSrc: newsDecreaseImage,
      imageAlt: "청년 채용 관련 기사 이미지",
    },
    {
      type: "article",
      id: "news-competance",
      title: "경쟁의 감각",
      caption: "끝없이 증명해야 한다는 압박.",
      imageSrc: newsCompetanceImage,
      imageAlt: "취업 경쟁 관련 기사 이미지",
    },
    {
      type: "article",
      id: "survey-plan-hiring",
      title: "채용 계획",
      caption: "기다리는 사람들에게 계획이라는 말은 때로 너무 멀다.",
      imageSrc: surveyPlanHiringImage,
      imageAlt: "기업 채용 계획 조사 이미지",
    },
    {
      type: "article",
      id: "survey-last-week",
      title: "지난 일주일",
      caption: "무엇을 했는지 묻는 질문 앞에서, 버틴 시간도 대답이 된다.",
      imageSrc: surveyLastWeekImage,
      imageAlt: "지난 일주일 활동 조사 이미지",
    },
    {
      type: "event",
      id: "credits-girlfriend",
      title: "지윤",
      caption: "혼자 버티던 삶에 처음으로 함께 걷는 사람이 생겼다.",
      imageSrc: girlfriendImage,
      imageAlt: "여자친구 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-interview",
      title: "최종 면접",
      caption: "결과보다 먼저, 도망치지 않고 문을 열었던 하루.",
      imageSrc: suitGuyImage,
      imageAlt: "최종 면접 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-mother-message",
      title: "엄마의 문자",
      caption: "답장하지 않아도 된다는 말. 살아만 있어 달라는 말.",
      imageSrc: momImage,
      imageAlt: "엄마 문자 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-friend-message",
      title: "친구의 문자",
      caption: "싫어도 문을 열라는 서툰 다정함.",
      imageSrc: friendImage,
      imageAlt: "친구 문자 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-failed-result",
      title: "아쉽지만",
      caption: "몇 번이고 같은 문장으로 돌아오던 밤.",
      imageSrc: failedTextOnPhoneImage,
      imageAlt: "탈락 결과 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-money",
      title: "싼 점심",
      caption: "버티기 위해 줄였던 것들. 그래도 사라지지 않았던 하루.",
      imageSrc: cheapLunchBoxImage,
      imageAlt: "싼 점심 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-burnout",
      title: "번아웃",
      caption: "약해서가 아니라 너무 오래 강한 척해서 무너진 시간.",
      imageSrc: burnoutDeskImage,
      imageAlt: "번아웃 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-room",
      title: "낯익은 방",
      caption: "모든 기억이 돌아온 곳. 다시 시작하기로 한 곳.",
      imageSrc: smallRoomImage,
      imageAlt: "낯익은 방 이벤트 카드 이미지",
    },
    {
      type: "event",
      id: "credits-view-from-class",
      title: "교실의 창",
      caption: "모두가 떠난 뒤에도, 아직 남아 있던 빛.",
      imageSrc: viewFromClassImage,
      imageAlt: "교실 창밖을 바라보는 엔딩 이미지",
    },
    {
      type: "event",
      id: "credits-last-person-in-class",
      title: "마지막 사람",
      caption: "끝까지 남았던 시간도 결국 나를 여기까지 데려왔다.",
      imageSrc: lastPersonInClassImage,
      imageAlt: "교실에 마지막으로 남은 사람의 엔딩 이미지",
    },
    {
      type: "event",
      id: "credits-cherry-blossom-gasan",
      title: "다시 피는 계절",
      caption: "가산의 봄처럼, 늦게 도착한 마음도 다시 피어난다.",
      imageSrc: cherryBlossomGasanImage,
      imageAlt: "가산의 벚꽃 풍경 엔딩 이미지",
    },
    {
      type: "message",
      id: "dedication",
      lines: [
        "이 게임을 한국의 모든 청년들에게 바칩니다.",
        "함께했던 LIG 부트캠프 친구들에게 감사를 전하며",
        "결과와 상관없이 행복했으면 좋겠습니다...",
      ],
    },
  ],
};
