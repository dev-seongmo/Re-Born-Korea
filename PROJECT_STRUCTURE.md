# Re:Born Korea - Current Structure Notes

이 문서는 "예쁘게 설명하는 문서"보다
"지금 코드가 실제로 어떻게 굴러가는지 빠르게 다시 파악하기 위한 메모"에 가깝다.

현재 게임은:
- React + TS
- `useReducer` 기반 단일 세션 상태
- Reigns 스타일 카드 루프
- 튜토리얼 -> 랜덤 이벤트 -> 최종 면접 -> 엔딩

---

## 1. 가장 먼저 볼 파일

### 앱 진입
- `src/main.tsx`
- `src/app/App.tsx`

### 실제 게임 화면
- `src/components/game/GameScreen.tsx`
- `src/components/game/SwipeChoiceCard.tsx`
- `src/components/game/ResultContinueCard.tsx`
- `src/styles/global.css`

### 게임 상태 / 흐름
- `src/game/core/gameTypes.ts`
- `src/game/core/gameState.ts`
- `src/game/core/gameReducer.ts`
- `src/game/viewModels/buildGameScreenViewModel.ts`
- `src/game/systems/turnSystem.ts`

### 이벤트 데이터
- `src/game/content/eventCards/index.ts`
- `src/game/content/eventCards/tutorial.ts`
- `src/game/content/eventCards/interview.ts`
- `src/game/content/eventCards/comparison.ts`
- `src/game/content/eventCards/family.ts`
- `src/game/content/eventCards/friendship.ts`
- `src/game/content/eventCards/money.ts`
- `src/game/content/eventCards/spec.ts`
- `src/game/content/eventCards/mental.ts`
- `src/game/content/eventCards/recovery.ts`

### 엔딩 / 합불
- `src/game/systems/interviewSystem.ts`
- `src/game/systems/endingSystem.ts`
- `src/game/selectors/getEndingResult.ts`
- `src/game/content/endings.ts`

---

## 2. 현재 실제 흐름

```text
App.tsx
  -> useReducer(gameReducer, createInitialGameSession)
  -> buildAppViewModel(session, dispatch)
  -> setup 화면 또는 game 화면 렌더

setup 화면 시작 버튼
  -> dispatch(game/started)
  -> currentEventId = 첫 튜토리얼 카드
  -> maxTurns = 30

GameScreen
  -> buildGameScreenViewModel()
  -> 현재 scene / latestResult / turn 수에 따라
     - 이벤트 카드
     - 결과 카드
     - 엔딩
     중 하나 표시

이벤트 카드에서 스와이프
  -> SwipeChoiceCard
  -> onResolveChoice(choice)
  -> resolveTurn()
  -> dispatch(turn/resolved)

turn/resolved 이후
  -> scene = result 또는 ending

결과 카드 continue
  -> event/queued
  -> 다음 이벤트 id 결정
  -> scene/set("event")

turn 막판
  -> 마지막 일반 이벤트 이후 강제로 finalInterviewEventId 로 이동
  -> 면접 카드 수행
  -> ending
```

---

## 3. 디렉터리별 실제 역할

### `src/app`
앱 껍데기.

현재는 거의:
- reducer 연결
- setup / game 화면 라우팅

정도만 한다.

### `src/components`
보이는 것.

#### `src/components/setup`
- 시작 화면 입력 폼

#### `src/components/game`
- `GameScreen.tsx`
  전체 게임 화면 조립
- `SwipeChoiceCard.tsx`
  Reigns 스타일 핵심 인터랙션
- `ResultContinueCard.tsx`
  선택지 없는 결과 카드
- `CardBody.tsx`
  카드 내부 구조
- `CardPortrait.tsx`
  카드 안 NPC 이미지 렌더
- `CardAnswerBadge.tsx`
  좌우 스와이프 답변 오버레이
- `CardImpactPreview.tsx`
  좌우 선택 시 예상 수치 변화 표시

### `src/game/core`
순수 상태 정의.

- `gameTypes.ts`
  전체 타입의 중심
- `gameState.ts`
  초기 세션값
- `gameReducer.ts`
  action별 상태 업데이트

### `src/game/content`
데이터.

- `eventCards/*`
  실제 카드 텍스트와 선택지
- `archetypes.ts`
  시작 스탯 세팅
- `identityLabels.ts`
  이름/정체성 라벨 단계
- `endings.ts`
  엔딩 텍스트

### `src/game/systems`
계산 로직.

- `turnSystem.ts`
  가장 중요. 한 턴 해결의 중심
- `rollSystem.ts`
  주사위/결과 밴드
- `metricSystem.ts`
  수치 clamp
- `selfTrustSystem.ts`
  selfTrust 적용
- `identitySystem.ts`
  identity stage 계산
- `balanceSystem.ts`
  수치 증폭 + 카드 미리보기용 계산
- `interviewSystem.ts`
  최종 면접 점수 / 합불 판단
- `endingSystem.ts`
  면접 결과 + 상태를 바탕으로 ending id 결정

### `src/game/selectors`
이미 계산된 상태를 "화면에 맞게 읽는" 레이어.

- `getCurrentLabel.ts`
- `getEndingResult.ts`

### `src/game/presenters`
이벤트 데이터를 카드 화면용 VM으로 바꾸는 얇은 변환 레이어.

- `mapEventToCardViewModel.ts`

### `src/game/viewModels`
화면 단위 조립 레이어.

- `buildAppViewModel.ts`
  setup / game 전환
- `buildSetupScreenViewModel.ts`
  시작 화면
- `buildGameScreenViewModel.ts`
  실제 게임 화면 상태 판단의 중심

이 파일이 꽤 중요하다.
현재 "어떤 순간에 무엇을 보여줄지" 분기 대부분이 여기 있다.

---

## 4. 지금 기준 핵심 파일별 메모

### `buildGameScreenViewModel.ts`
현재 게임 흐름 이해의 중심.

여기서 한다:
- 상단 HUD 수치 만들기
- `면접 D-Day` 라벨 계산
- 현재 화면이 이벤트 / 결과 / 엔딩 중 무엇인지 판단
- 마지막 일반 턴 다음엔 강제로 `finalInterviewEventId` 넣기
- 튜토리얼 종료 직후 버튼 문구 바꾸기

즉,
`"지금 화면에서 뭘 보여주는지"`가 헷갈리면 제일 먼저 여기 본다.

### `eventCards/index.ts`
이벤트 풀 라우터.

여기서 한다:
- 전체 이벤트 registry 만들기
- 튜토리얼 카드 id 목록 관리
- 최종 면접 이벤트 id 관리
- 다음 랜덤 이벤트 뽑기

주의:
- 튜토리얼은 먼저 소진
- 면접 이벤트는 랜덤 풀에서 제외
- 마지막엔 별도로 강제 주입

### `turnSystem.ts`
턴 처리 핵심.

순서:
1. immediate delta 적용
2. roll 결과 계산
3. outcome delta 적용
4. selfTrust 갱신
5. tendency 갱신
6. memoryTags 갱신
7. identityStage 계산
8. nextScene 계산

게임 수치가 이상하게 움직이면 여기 본다.

### `interviewSystem.ts`
최종 면접 계산.

현재는:
- spec 비중이 제일 큼
- mental / reputation / money 가중치 반영
- 일정 기준 넘으면 합격

합불 밸런싱은 여기서 한다.

---

## 5. 상태 머신 느낌으로 보기

실제 scene 값:
- `setup`
- `event`
- `result`
- `ending`

타입에는 더 많은 scene 이 남아 있지만,
현재 실제 플레이 루프에서 주로 도는 건 위 4개다.

즉 현재 프로젝트는 생각보다 단순하다:

```text
setup -> event -> result -> event -> result -> ... -> ending
```

`roll`, `collapse`, `archetypeIntro` 같은 타입은
현재 구조상 거의 장래 확장 흔적에 가깝다.

---

## 6. 지금 남아 있는 구조적 찌꺼기 / 주의점

### 1. 문서와 실제 코드가 자주 어긋남
- `TECH_ARCHITECTURE.md`는 이상적 구조 설명이 많음
- 실제 구현 기준 파악은 이 문서를 우선

### 2. 한글 문자열 깨짐이 일부 남아 있음
특히 예전 파일이나 터미널 재저장 과정에서 깨진 문자열 흔적이 남아 있다.

의심 파일:
- 일부 viewModel 텍스트
- 일부 GameScreen 문구
- 예전 문서류

### 3. `gameTypes.ts` 타입이 실제 구현보다 넓음
현재 안 쓰는 scene / archetype 확장 흔적이 남아 있다.
지금은 크게 문제는 없지만, 더 정리할 수 있다.

### 4. CSS에 과거 시도 흔적이 남아 있음
예:
- `chasa-stage` 계열
- 현재 실제로 안 쓰는 시각 스타일 조각들

UI 정리할 때 다시 걷어낼 수 있다.

---

## 7. 수정하려는 목표별 빠른 진입점

### 카드 텍스트 바꾸기
- `src/game/content/eventCards/*.ts`

### 다음 이벤트 선택 규칙 바꾸기
- `src/game/content/eventCards/index.ts`
- `src/game/viewModels/buildGameScreenViewModel.ts`

### 최종 면접 합불 밸런스 바꾸기
- `src/game/systems/interviewSystem.ts`
- `src/game/systems/endingSystem.ts`

### 결과 카드 동작 바꾸기
- `src/components/game/ResultContinueCard.tsx`
- `src/components/game/GameScreen.tsx`

### 스와이프 감도 / 카드 모션 바꾸기
- `src/components/game/SwipeChoiceCard.tsx`

### 상단 HUD 바꾸기
- `src/components/game/GameScreen.tsx`
- `src/game/viewModels/buildGameScreenViewModel.ts`
- `src/styles/global.css`

### 카드 안 캐릭터 이미지 바꾸기
- `src/components/game/CardPortrait.tsx`
- `src/assets/images/characters/npc/*`

### 튜토리얼에서 메인 루프로 이어지는 부분 바꾸기
- `src/game/content/eventCards/tutorial.ts`
- `src/game/content/eventCards/index.ts`
- `src/game/viewModels/buildGameScreenViewModel.ts`

---

## 8. 초간단 정신모델

이 프로젝트를 다시 볼 때는 이렇게 생각하면 됨:

```text
content = 카드 데이터
systems = 계산기
viewModels = 지금 화면에 뭘 보여줄지 결정
components = 실제 렌더
styles = 외형
```

더 줄이면:

```text
이벤트를 뽑는다
-> 카드를 보여준다
-> 선택을 계산한다
-> 결과 카드를 보여준다
-> 면접날까지 반복한다
-> 마지막 면접으로 끝낸다
```
