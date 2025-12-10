import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setId } from "@/store/GameStore";
import RunnerDiamond from "./RunnerDiamond";
import "@/styles/simulation.css";

const PlayEventOverlay = ({ contextEvents, currentPId, currentEId, hoveredPId, hoveredEId }) => {
  const listRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const dispatch = useDispatch();

  // 滑らかなスクロールアニメーション
  const smoothScrollTo = (element, targetScrollTop, duration = 400) => {
    if (!element) return;

    const startScrollTop = element.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    const startTime = performance.now();

    // 既存のアニメーションをキャンセル
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      element.scrollTop = startScrollTop + distance * easedProgress;

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animation);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animation);
  };

  // contextEventsまたは現在位置が変わったらスクロール
  useEffect(() => {
    // ホバー中はホバー位置、そうでなければ現在位置にスクロール
    const targetPId = hoveredPId !== null ? hoveredPId : currentPId;
    const targetEId = hoveredEId !== null ? hoveredEId : currentEId;
    const isHovering = hoveredPId !== null && hoveredEId !== null;

    if (listRef.current && contextEvents.length > 0 && targetPId !== null && targetEId !== null) {
      // 対象のイベントの位置を見つける
      const targetIndex = contextEvents.findIndex(
        (e) => Number(e.p_id) === Number(targetPId) && Number(e.e_id) === Number(targetEId),
      );

      if (targetIndex !== -1) {
        const container = listRef.current;

        // p_idとe_idでクラスを持つ要素を直接探す
        let targetElement = null;
        const items = container.querySelectorAll(".event-context-item");

        // 対象のイベントに対応するDOM要素を見つける
        items.forEach((item, idx) => {
          const event = contextEvents[idx];
          if (
            event &&
            Number(event.p_id) === Number(targetPId) &&
            Number(event.e_id) === Number(targetEId)
          ) {
            targetElement = item;
          }
        });

        if (container && targetElement) {
          // 要素の位置を計算
          const containerHeight = container.clientHeight;
          const elementTop = targetElement.offsetTop;
          const elementHeight = targetElement.clientHeight;

          // 中央に配置するためのスクロール位置を計算
          const targetScrollTop = elementTop - containerHeight / 2 + elementHeight / 2;

          // ホバー時は超高速（30ms）、通常時は通常速度（150ms）
          const duration = isHovering ? 30 : 150;
          smoothScrollTo(container, targetScrollTop, duration);
        }
      }
    }

    // クリーンアップ
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [currentPId, currentEId, hoveredPId, hoveredEId, contextEvents]);

  // イベントの説明文を生成
  const getEventDescription = (evt) => {
    const batter = evt.batter?.full_name || "打者";
    const result =
      evt.event_type === "pitch" ? evt.detail?.event || "N/A" : evt.event_type || "N/A";

    // 得点があった場合
    if (evt.score_from_event && evt.score_from_event > 0) {
      return `${batter}が${result}をして${evt.score_from_event}点入った`;
    }

    // 通常のプレイ
    return `${batter} - ${result}`;
  };

  // イベントが現在のコマかどうかをチェック
  const isCurrentFrame = (event) => {
    // p_idとe_idが完全一致する場合は現在のコマ
    return Number(event.p_id) === Number(currentPId) && Number(event.e_id) === Number(currentEId);
  };

  // イベントがホバー中かどうかをチェック
  const isHovered = (event) => {
    if (hoveredPId === null || hoveredEId === null) return false;
    return Number(event.p_id) === Number(hoveredPId) && Number(event.e_id) === Number(hoveredEId);
  };

  // イベントアイテムがクリックされた時の処理
  const handleEventClick = (event) => {
    dispatch(
      setId({
        p_id: event.p_id,
        e_id: event.e_id,
      }),
    );
  };

  // 現在のイベントを取得
  const currentEvent = contextEvents.find(
    (e) => Number(e.p_id) === Number(currentPId) && Number(e.e_id) === Number(currentEId),
  );

  return (
    <div className="event-context-overlay">
      <div className="event-context-panel">
        {contextEvents.length > 0 ? (
          <>
            <div className="event-context-header">
              <h3>イベント詳細</h3>
              {currentEvent && (
                <div className="current-inning-display">
                  {currentEvent.inning}回{currentEvent.detail?.inning_top ? "表" : "裏"}
                </div>
              )}
            </div>
            <div className="event-context-list" ref={listRef}>
              {contextEvents.map((event, idx) => {
                const isCurrentFrameEvent = isCurrentFrame(event);
                const isHoveredEvent = isHovered(event);

                // 前のイベントとイニングが変わったかチェック
                const prevEvent = idx > 0 ? contextEvents[idx - 1] : null;
                const isInningChanged =
                  !prevEvent ||
                  prevEvent.inning !== event.inning ||
                  prevEvent.detail?.inning_top !== event.detail?.inning_top;

                return (
                  <React.Fragment key={idx}>
                    {/* イニング変更時に区切り線を表示 */}
                    {isInningChanged && idx > 0 && (
                      <div className="inning-divider">
                        <span className="inning-divider-text">
                          {event.inning}回{event.detail?.inning_top ? "表" : "裏"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`event-context-item ${isCurrentFrameEvent ? "current-frame" : ""} ${isHoveredEvent ? "hovered" : ""}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="event-item-content">
                        <div className="event-item-main">
                          <span className="event-index">
                            #{event.index}
                            {idx === 0 && (
                              <>
                                {" "}
                                | {event.inning}回{event.detail?.inning_top ? "表" : "裏"}
                              </>
                            )}
                            {isCurrentFrameEvent && " ⭐"}
                          </span>
                          <div className="event-description">{getEventDescription(event)}</div>
                        </div>
                        <RunnerDiamond runnerState={event.runner_state?.pos_runner_state} />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "14px" }}>データを読み込み中...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayEventOverlay;
