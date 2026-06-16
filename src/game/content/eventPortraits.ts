import type { EventCard } from "../core/gameTypes";
import burnoutDeskImage from "../../assets/images/characters/npc/burnout_desk.png";
import cardBackImage from "../../assets/images/characters/npc/card_back.png";
import cheapLunchBoxImage from "../../assets/images/characters/npc/cheap_lunch_box.png";
import dadPortraitImage from "../../assets/images/characters/npc/dad.png";
import extraShiftWorkImage from "../../assets/images/characters/npc/extra_shift_work.png";
import failedTextOnPhoneImage from "../../assets/images/characters/npc/failed_text_on_phone.png";
import friendPortraitImage from "../../assets/images/characters/npc/friend.png";
import friendSuccessPostImage from "../../assets/images/characters/npc/friend_success_post.png";
import girlfriendPortraitImage from "../../assets/images/characters/npc/girlfriend.png";
import kakaoTalkImage from "../../assets/images/characters/npc/kakao_talk.png";
import memoImage from "../../assets/images/characters/npc/memo.png";
import mirrorImage from "../../assets/images/characters/npc/mirror.png";
import momPortraitImage from "../../assets/images/characters/npc/mom.png";
import paperPortraitImage from "../../assets/images/characters/npc/paper.png";
import phonePortraitImage from "../../assets/images/characters/npc/phone.png";
import portfolioWeekendImage from "../../assets/images/characters/npc/portfolio_weekend.png";
import rentDayNoticeImage from "../../assets/images/characters/npc/rent_day_notice.png";
import sajaPortraitImage from "../../assets/images/characters/npc/saja1.png";
import smallRoomImage from "../../assets/images/characters/npc/small_room.png";
import studyGroupImage from "../../assets/images/characters/npc/study_group.png";
import suitGuyPortraitImage from "../../assets/images/characters/npc/suitguy.png";
import unclePortraitImage from "../../assets/images/characters/npc/uncle.png";
import weddingInvitationsImage from "../../assets/images/characters/npc/wedding_invitations.png";
import youngUnclePortraitImage from "../../assets/images/characters/npc/young uncle.png";

type PortraitAsset = {
  src: string;
  alt: string;
};

export const fallbackPortrait: PortraitAsset = {
  src: cardBackImage,
  alt: "Card back",
};

const portraitByEventId: Record<string, PortraitAsset> = {
  "tutorial-afterlife-question": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-chasa-request": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-employment-grudge": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-choice-state": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-stat-threshold": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-thirty-days": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-chasa-name": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-first-soul-arrives": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "tutorial-fog-clears": {
    src: suitGuyPortraitImage,
    alt: "First soul portrait",
  },
  "true-ending-chasa-truth": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-prelude-prep": {
    src: suitGuyPortraitImage,
    alt: "First soul portrait",
  },
  "true-ending-comparison-scroll": {
    src: phonePortraitImage,
    alt: "Phone screen portrait",
  },
  "true-ending-self-trust-collapse": {
    src: suitGuyPortraitImage,
    alt: "First soul portrait",
  },
  "true-ending-edge-of-death": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-chasa-farewell": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-familiar-room": {
    src: smallRoomImage,
    alt: "Familiar room portrait",
  },
  "true-ending-dark-room": {
    src: smallRoomImage,
    alt: "Dark room portrait",
  },
  "true-ending-phone": {
    src: kakaoTalkImage,
    alt: "Phone notifications portrait",
  },
  "true-ending-document-results": {
    src: failedTextOnPhoneImage,
    alt: "Failed application result portrait",
  },
  "true-ending-unread-messages": {
    src: momPortraitImage,
    alt: "Mother message portrait",
  },
  "true-ending-friend-message": {
    src: friendPortraitImage,
    alt: "Friend message portrait",
  },
  "true-ending-reply-box": {
    src: kakaoTalkImage,
    alt: "Reply box portrait",
  },
  "true-ending-silent-room": {
    src: smallRoomImage,
    alt: "Silent room portrait",
  },
  "true-ending-mirror": {
    src: mirrorImage,
    alt: "Mirror portrait",
  },
  "true-ending-desk-note": {
    src: memoImage,
    alt: "Desk note portrait",
  },
  "true-ending-old-dream": {
    src: memoImage,
    alt: "Old dream note portrait",
  },
  "true-ending-last-thought": {
    src: smallRoomImage,
    alt: "Lonely room portrait",
  },
  "true-ending-true-heart": {
    src: smallRoomImage,
    alt: "True feeling portrait",
  },
  "true-ending-blue-fog": {
    src: sajaPortraitImage,
    alt: "Blue fog portrait",
  },
  "true-ending-cheongryeong-chasa": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-chasa-words": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-memory-shards": {
    src: failedTextOnPhoneImage,
    alt: "Recovered memory portrait",
  },
  "true-ending-chasa-gaze": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-chasa-answer": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-why-broke": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-phone-rings-again": {
    src: momPortraitImage,
    alt: "Mother message portrait",
  },
  "true-ending-friend-new-message": {
    src: friendPortraitImage,
    alt: "Friend message portrait",
  },
  "true-ending-hand": {
    src: kakaoTalkImage,
    alt: "Phone in hand portrait",
  },
  "true-ending-first-sentence": {
    src: kakaoTalkImage,
    alt: "First reply portrait",
  },
  "true-ending-sent": {
    src: kakaoTalkImage,
    alt: "Sent message portrait",
  },
  "true-ending-chasa-hand": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-chasa-smile": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-morning": {
    src: smallRoomImage,
    alt: "Morning room portrait",
  },
  "true-ending-last-memory": {
    src: smallRoomImage,
    alt: "Last memory portrait",
  },
  "true-ending-saved-myself": {
    src: smallRoomImage,
    alt: "Ending room portrait",
  },
  "true-ending-rejection-message": {
    src: failedTextOnPhoneImage,
    alt: "Rejected message portrait",
  },
  "true-ending-joseon-youth": {
    src: paperPortraitImage,
    alt: "Joseon youth portrait",
  },
  "true-ending-postwar-youth": {
    src: cheapLunchBoxImage,
    alt: "Postwar youth portrait",
  },
  "true-ending-industrial-youth": {
    src: extraShiftWorkImage,
    alt: "Industrial youth portrait",
  },
  "true-ending-imf-youth": {
    src: rentDayNoticeImage,
    alt: "IMF youth portrait",
  },
  "true-ending-present-youth": {
    src: smallRoomImage,
    alt: "Present youth portrait",
  },
  "true-ending-final-choice": {
    src: sajaPortraitImage,
    alt: "Cheongryeong chasa portrait",
  },
  "true-ending-rejection-room": {
    src: failedTextOnPhoneImage,
    alt: "Rejected message portrait",
  },
  "true-ending-rejection-meaning": {
    src: failedTextOnPhoneImage,
    alt: "Rejected message portrait",
  },
  "true-ending-joseon-exam": {
    src: paperPortraitImage,
    alt: "Joseon youth portrait",
  },
  "true-ending-joseon-question": {
    src: paperPortraitImage,
    alt: "Joseon youth portrait",
  },
  "true-ending-postwar-bag": {
    src: cheapLunchBoxImage,
    alt: "Postwar youth portrait",
  },
  "true-ending-postwar-survival": {
    src: cheapLunchBoxImage,
    alt: "Postwar youth portrait",
  },
  "true-ending-industrial-bus": {
    src: extraShiftWorkImage,
    alt: "Industrial youth portrait",
  },
  "true-ending-industrial-note": {
    src: memoImage,
    alt: "Industrial youth note portrait",
  },
  "true-ending-imf-door": {
    src: rentDayNoticeImage,
    alt: "IMF youth portrait",
  },
  "true-ending-imf-rest": {
    src: rentDayNoticeImage,
    alt: "IMF youth portrait",
  },
  "true-ending-present-room": {
    src: smallRoomImage,
    alt: "Present youth portrait",
  },
  "true-ending-present-answer": {
    src: smallRoomImage,
    alt: "Present youth portrait",
  },
  "final-interview": { src: suitGuyPortraitImage, alt: "Interview portrait" },
  "relative-comparison-dinner": {
    src: unclePortraitImage,
    alt: "Relative portrait",
  },
  "move-back-home": { src: youngUnclePortraitImage, alt: "Home portrait" },
  "old-friend-call": { src: friendPortraitImage, alt: "Friend portrait" },
  "friend-asks-for-help": { src: friendPortraitImage, alt: "Friend portrait" },
  "birthday-message-late": {
    src: friendPortraitImage,
    alt: "Friend portrait",
  },
  "trip-invitation": {
    src: girlfriendPortraitImage,
    alt: "Travel invitation portrait",
  },
  "girlfriend-first-meet": {
    src: girlfriendPortraitImage,
    alt: "Girlfriend event portrait",
  },
  "girlfriend-confession": {
    src: girlfriendPortraitImage,
    alt: "Girlfriend event portrait",
  },
  "girlfriend-first-date": {
    src: girlfriendPortraitImage,
    alt: "Girlfriend event portrait",
  },
  "girlfriend-conflict": {
    src: girlfriendPortraitImage,
    alt: "Girlfriend event portrait",
  },
  "girlfriend-support": {
    src: girlfriendPortraitImage,
    alt: "Girlfriend event portrait",
  },
  "friend-major-company": {
    src: friendSuccessPostImage,
    alt: "Comparison portrait",
  },
  "linkedin-scroll-midnight": {
    src: phonePortraitImage,
    alt: "Phone screen portrait",
  },
  "classmate-certification": {
    src: paperPortraitImage,
    alt: "Certification portrait",
  },
  "wedding-invitation-season": {
    src: weddingInvitationsImage,
    alt: "Invitation portrait",
  },
  "extra-shift-offer": { src: extraShiftWorkImage, alt: "Work shift portrait" },
  "rent-day-panic": { src: rentDayNoticeImage, alt: "Rent notice portrait" },
  "cheap-lunch-week": { src: cheapLunchBoxImage, alt: "Budget portrait" },
  "unexpected-refund": { src: phonePortraitImage, alt: "Refund portrait" },
  "night-course-ad": { src: phonePortraitImage, alt: "Course ad portrait" },
  "portfolio-weekend": {
    src: portfolioWeekendImage,
    alt: "Portfolio portrait",
  },
  "ai-cover-letter": { src: phonePortraitImage, alt: "Cover letter portrait" },
  "study-group-comparison": {
    src: studyGroupImage,
    alt: "Study group portrait",
  },
  "alarm-cannot-rise": { src: phonePortraitImage, alt: "Alarm portrait" },
  "sunday-emptiness": { src: phonePortraitImage, alt: "Empty screen portrait" },
  "burnout-sign": { src: burnoutDeskImage, alt: "Burnout portrait" },
  "therapy-tab-open": { src: phonePortraitImage, alt: "Therapy search portrait" },
  "favorite-food-alone": {
    src: paperPortraitImage,
    alt: "Comfort meal portrait",
  },
  "old-hobby-folder": { src: phonePortraitImage, alt: "Hobby folder portrait" },
  "walk-without-purpose": {
    src: friendPortraitImage,
    alt: "Walking portrait",
  },
};

const defaultPortraitByCategory: Record<EventCard["category"], PortraitAsset> = {
  tutorial: { src: sajaPortraitImage, alt: "Cheongryeong chasa portrait" },
  interview: { src: suitGuyPortraitImage, alt: "Interview portrait" },
  comparison: { src: phonePortraitImage, alt: "Comparison portrait" },
  family: { src: dadPortraitImage, alt: "Family portrait" },
  money: { src: paperPortraitImage, alt: "Money portrait" },
  spec: { src: phonePortraitImage, alt: "Study portrait" },
  mental: { src: phonePortraitImage, alt: "Mental state portrait" },
  friendship: { src: friendPortraitImage, alt: "Friend portrait" },
  recovery: { src: paperPortraitImage, alt: "Recovery portrait" },
  girlfriend: { src: girlfriendPortraitImage, alt: "Girlfriend portrait" },
};

export function getEventPortrait(event: EventCard): PortraitAsset {
  return (
    portraitByEventId[event.id] ??
    defaultPortraitByCategory[event.category] ??
    fallbackPortrait
  );
}
