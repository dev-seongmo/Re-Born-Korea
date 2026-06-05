export type MemoryShardDefinition = {
  id: string;
  title: string;
  description: string;
  hint: string;
};

export const memoryShards: MemoryShardDefinition[] = [
  {
    id: "first_step",
    title: "첫걸음",
    description: "불확실해도 앞으로 나아간 기억.",
    hint: "처음 시작하는 선택을 받아들인다.",
  },
  {
    id: "hesitation",
    title: "망설임",
    description: "의심이 결심이 되기 직전의 기억.",
    hint: "망설이게 되는 순간을 그냥 지나치지 않는다.",
  },
  {
    id: "asked_rule",
    title: "질문한 규칙",
    description: "당연한 것을 묻던 기억.",
    hint: "규칙이 무엇인지 직접 묻는다.",
  },
  {
    id: "silent_obedience",
    title: "조용한 순응",
    description: "하고 싶은 말을 삼키던 기억.",
    hint: "하고 싶은 말을 삼키는 선택을 한다.",
  },
  {
    id: "shared_grief",
    title: "나눈 슬픔",
    description: "혼자 아프지 않았던 짧은 순간.",
    hint: "혼자 버티지 않고 감정을 나눈다.",
  },
  {
    id: "looked_away",
    title: "외면",
    description: "불편한 것을 외면하던 기억.",
    hint: "불편한 진실에서 시선을 돌린다.",
  },
  {
    id: "self_pace",
    title: "나의 속도",
    description: "비교를 멈췄을 때의 기억.",
    hint: "남과 비교하지 않고 자기 속도를 지킨다.",
  },
  {
    id: "honesty",
    title: "솔직함",
    description: "있는 그대로 말하던 기억.",
    hint: "꾸미지 않고 솔직하게 말한다.",
  },
  {
    id: "warm_meal",
    title: "따뜻한 한 끼",
    description: "하루를 버티게 한 작은 위안.",
    hint: "지친 날에도 스스로를 챙긴다.",
  },
  {
    id: "small_comfort",
    title: "작은 위로",
    description: "사소해서 더 소중한 위안.",
    hint: "사소한 위로를 흘려보내지 않는다.",
  },
  {
    id: "old_love",
    title: "오래된 마음",
    description: "한때 중요했던 감정의 기억.",
    hint: "새로운 인연을 만나거나 오래된 마음을 마주한다.",
  },
  {
    id: "rest",
    title: "휴식",
    description: "무너지기 전에 멈춘 기억.",
    hint: "무너지기 전에 쉬는 선택을 한다.",
  },
  {
    id: "name_return",
    title: "이름의 귀환",
    description: "다시 내가 되는 감각의 기억.",
    hint: "스스로의 이름과 방향을 되찾는다.",
  },
  {
    id: "friendship",
    title: "우정",
    description: "함께 기억되어 남은 조각.",
    hint: "친구와의 연결을 놓지 않는다.",
  },
  {
    id: "survival",
    title: "생존",
    description: "끝끝내 버텨낸 기억.",
    hint: "끝까지 버텨 살아남는다.",
  },
  {
    id: "interview_day",
    title: "면접의 날",
    description: "마지막 문턱 앞의 기억.",
    hint: "면접의 마지막 날까지 도달한다.",
  },
  {
    id: "steady_answer",
    title: "흔들리지 않는 대답",
    description: "주눅 들지 않고 답한 기억.",
    hint: "면접에서 흔들리지 않고 답한다.",
  },
];
