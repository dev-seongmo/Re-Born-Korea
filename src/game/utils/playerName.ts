export const PLAYER_NAME_MAX_LENGTH = 12;
export const DEFAULT_PLAYER_NAME = "이름없음";

export function sanitizePlayerName(value: string) {
  const normalized = value.normalize("NFC");
  const lettersOnly = normalized.match(/[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]/gu)?.join("") ?? "";

  return Array.from(lettersOnly).slice(0, PLAYER_NAME_MAX_LENGTH).join("");
}

export function formatPlayerName(value: string) {
  return sanitizePlayerName(value).trim() || DEFAULT_PLAYER_NAME;
}
