import type { EventCard } from "../core/gameTypes";
import ceoPortraitImage from "../../assets/images/characters/npc/ceo.png";
import cardBackImage from "../../assets/images/characters/npc/card_back.png";
import dadPortraitImage from "../../assets/images/characters/npc/dad.png";
import friendPortraitImage from "../../assets/images/characters/npc/friend.png";
import girlfriendPortraitImage from "../../assets/images/characters/npc/girlfriend.png";
import momPortraitImage from "../../assets/images/characters/npc/mom.png";
import paperPortraitImage from "../../assets/images/characters/npc/paper.png";
import phonePortraitImage from "../../assets/images/characters/npc/phone.png";
import sajaPortraitImage from "../../assets/images/characters/npc/saja1.png";
import suitGuyPortraitImage from "../../assets/images/characters/npc/suitguy.png";
import unclePortraitImage from "../../assets/images/characters/npc/uncle.png";
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
  "final-interview": { src: suitGuyPortraitImage, alt: "Interview portrait" },
  "parents-question": { src: dadPortraitImage, alt: "Parent portrait" },
  "relative-comparison-dinner": {
    src: unclePortraitImage,
    alt: "Relative portrait",
  },
  "family-support-offer": { src: momPortraitImage, alt: "Family portrait" },
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
    src: friendPortraitImage,
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
    src: paperPortraitImage,
    alt: "Invitation portrait",
  },
  "extra-shift-offer": { src: paperPortraitImage, alt: "Work shift portrait" },
  "rent-day-panic": { src: paperPortraitImage, alt: "Rent notice portrait" },
  "cheap-lunch-week": { src: paperPortraitImage, alt: "Budget portrait" },
  "unexpected-refund": { src: phonePortraitImage, alt: "Refund portrait" },
  "night-course-ad": { src: phonePortraitImage, alt: "Course ad portrait" },
  "portfolio-weekend": {
    src: paperPortraitImage,
    alt: "Portfolio portrait",
  },
  "ai-cover-letter": { src: phonePortraitImage, alt: "Cover letter portrait" },
  "study-group-comparison": {
    src: ceoPortraitImage,
    alt: "Study group portrait",
  },
  "alarm-cannot-rise": { src: phonePortraitImage, alt: "Alarm portrait" },
  "sunday-emptiness": { src: phonePortraitImage, alt: "Empty screen portrait" },
  "burnout-sign": { src: phonePortraitImage, alt: "Burnout portrait" },
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
  "name-written-on-paper": {
    src: paperPortraitImage,
    alt: "Name note portrait",
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
