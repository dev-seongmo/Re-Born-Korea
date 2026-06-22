import { useEffect, useMemo, useState } from "react";
import { audioManager } from "../../audio/audioManager";
import type { EndingPanelViewModel } from "../../game/viewModels/gameScreenViewModel";

type Props = {
  panel: EndingPanelViewModel;
};

type MessageView = "list" | "detail";

function getCompanyName(title: string) {
  const match = title.match(/^\[([^\]]+)\]/);
  return match?.[1] ?? "채용팀";
}

export function PhoneMessageResult({ panel }: Props) {
  const [view, setView] = useState<MessageView>("list");
  const companyName = useMemo(() => getCompanyName(panel.title), [panel.title]);
  const senderName = `${companyName} 채용팀`;

  useEffect(() => {
    setView("list");
    audioManager.play("message.notification", 0.72, { restart: true });
  }, [panel.title, panel.sender]);

  return (
    <div className="ending-card phone-result">
      <div className="phone-result__device">
        <PhoneStatusBar />

        {view === "list" ? (
          <section className="phone-result__screen phone-result__screen--list">
            <header className="phone-result__app-header">
              <div>
                <p>오늘</p>
                <h3>메시지</h3>
              </div>
              <span className="phone-result__unread-count">1</span>
            </header>

            <button
              className="phone-result__thread"
              onClick={() => setView("detail")}
              type="button"
            >
              <span className="phone-result__unread-dot" />
              <span className="phone-result__thread-avatar">채</span>
              <span className="phone-result__thread-copy">
                <span className="phone-result__thread-topline">
                  <strong>{senderName}</strong>
                  <span>{panel.receivedAt}</span>
                </span>
                <span className="phone-result__thread-title">
                  [{companyName}] 최종 면접 결과 안내
                </span>
                <span className="phone-result__thread-preview">
                  지원자님, 최종 면접 결과를 안내드립니다.
                </span>
              </span>
            </button>
          </section>
        ) : (
          <section className="phone-result__screen phone-result__screen--detail">
            <header className="phone-result__chat-header">
              <button
                aria-label="메시지 목록으로 돌아가기"
                className="phone-result__back"
                onClick={() => setView("list")}
                type="button"
              >
                ‹
              </button>
              <div>
                <h3>{senderName}</h3>
                <p>{panel.sender}</p>
              </div>
            </header>

            <div className="phone-result__chat-body">
              <p className="phone-result__date-divider">오늘 {panel.receivedAt}</p>
              <div className="phone-result__bubble">
                <p>[{companyName}] 채용팀입니다.</p>
                <p>
                  지원자님, 2026년 신입 채용 최종 면접 결과
                  <strong> 합격하셨음을 안내드립니다.</strong>
                </p>
                <p>
                  긴 시간 동안 보여주신 태도와 가능성을 긍정적으로
                  검토하였습니다.
                </p>
                <p>
                  입사 관련 상세 안내는 등록하신 이메일로 순차 발송될
                  예정입니다.
                </p>
                <p>축하드립니다.</p>
              </div>

              <div className="phone-result__receipt">
                {panel.metricLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>

            <button
              className="primary-button phone-result__continue"
              onClick={panel.onContinue}
              type="button"
            >
              {panel.nextLabel}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div className="phone-result__statusbar">
      <span>18:07</span>
      <span className="phone-result__status-icons">
        <span>LTE</span>
        <span className="phone-result__battery" />
      </span>
    </div>
  );
}
