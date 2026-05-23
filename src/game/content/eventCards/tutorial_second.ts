import type { EventCard } from "../../core/gameTypes";

export const secondLifeTutorialEvents: EventCard[] = [
  {
    id: "second-life-wakeup",
    category: "tutorial",
    phase: "early20s",
    text:
      "The same road returns, but this time it feels familiar. The chasa watches to see whether you notice first.",
    choices: [
      {
        id: "admit-recognition",
        label: "Say that you remember this road.",
        immediate: { mental: 1, reputation: 1 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["second_life_awareness"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "\"Then prove it with your steps.\" Recognition alone does not make the road lighter.",
          },
          mixed: {
            text: "\"Good. At least you stopped pretending this is your first fall.\"",
            delta: { mental: 1 },
          },
          good: {
            text: "\"Memory is not a prize. It is responsibility.\" The chasa slows down just enough for you to keep pace.",
            delta: { mental: 1, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "hide-recognition",
        label: "Pretend this is all still new.",
        immediate: { reputation: 1, mental: -1 },
        selfTrustDelta: -2,
        primaryStat: "reputation",
        modifier: -1,
        memoryTags: ["second_life_denial"],
        tendencyTags: ["comparison"],
        results: {
          bad: {
            text: "\"You are late even to your own memory.\" The silence grows heavier around your feet.",
            delta: { mental: -1 },
            selfTrustDelta: -1,
          },
          mixed: {
            text: "\"Then I will speak as if you know nothing.\" It keeps the shame hidden, not gone.",
          },
          good: {
            text: "The lie buys a little composure, but not much peace.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
  {
    id: "second-life-warning",
    category: "tutorial",
    phase: "early20s",
    text:
      "At the fork in the road, the lantern burns a little brighter. \"A repeated life is not a safer one,\" the chasa says.",
    choices: [
      {
        id: "ask-what-changed",
        label: "Ask what changed this time.",
        immediate: { mental: 1 },
        selfTrustDelta: 1,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["second_life_question"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "\"Enough to hurt again.\" The answer is colder than you hoped.",
          },
          mixed: {
            text: "\"Only what you choose differently.\" The meaning settles in after the words do.",
            delta: { mental: 1 },
          },
          good: {
            text: "\"This time, your hesitation will also remember you.\" The warning lands like advice.",
            delta: { mental: 1, reputation: 1 },
          },
        },
      },
      {
        id: "say-nothing-again",
        label: "Keep quiet and move first.",
        immediate: { reputation: 2 },
        selfTrustDelta: 0,
        primaryStat: "reputation",
        modifier: 1,
        memoryTags: ["second_life_silence"],
        tendencyTags: ["reputation"],
        results: {
          bad: {
            text: "You move quickly, but your chest lags behind.",
            delta: { mental: -1 },
          },
          mixed: {
            text: "\"At least you learned motion.\" The chasa does not sound impressed, only certain.",
            delta: { reputation: 1 },
          },
          good: {
            text: "Silence becomes focus for one brief stretch of road.",
            delta: { reputation: 1, mental: 1 },
          },
        },
      },
    ],
  },
  {
    id: "second-life-oath",
    category: "tutorial",
    phase: "early20s",
    text:
      "Before the city lights open ahead, the chasa stops. \"If you are going to repeat a life, decide what you refuse to abandon.\"",
    choices: [
      {
        id: "protect-my-name",
        label: "Say you will not abandon yourself again.",
        immediate: { mental: 2, reputation: 1 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["second_life_oath"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "The promise trembles, but it is spoken out loud.",
          },
          mixed: {
            text: "\"Then keep choosing like you mean it.\" The lantern light steadies.",
            delta: { mental: 1 },
          },
          good: {
            text: "\"Good. A life cannot be saved by accident forever.\" For the first time, the road feels chosen.",
            delta: { mental: 1, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "protect-only-result",
        label: "Say only the final result matters now.",
        immediate: { spec: 2, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 1,
        memoryTags: ["second_life_pressure"],
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "\"Then you may arrive with nothing left of yourself.\" The city suddenly feels farther away.",
            delta: { mental: -1 },
          },
          mixed: {
            text: "It sounds practical. It also sounds lonely.",
            delta: { spec: 1 },
          },
          good: {
            text: "Resolve sharpens, but so does the edge pressing back on you.",
            delta: { spec: 1, reputation: 1 },
          },
        },
      },
    ],
  },
];
