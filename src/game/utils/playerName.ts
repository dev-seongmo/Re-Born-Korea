export const PLAYER_NAME_MAX_LENGTH = 12;
export const DEFAULT_PLAYER_NAME = "이름없음";
export const COMPANY_NAME_MAX_LENGTH = 24;
export const DEFAULT_COMPANY_NAME = "Re:Born Korea";

export function sanitizePlayerName(value: string) {
  const normalized = value.normalize("NFC");
  const lettersOnly = normalized.match(/[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]/gu)?.join("") ?? "";

  return Array.from(lettersOnly).slice(0, PLAYER_NAME_MAX_LENGTH).join("");
}

export function formatPlayerName(value: string) {
  return sanitizePlayerName(value).trim() || DEFAULT_PLAYER_NAME;
}

export function sanitizeCompanyName(value: string) {
  const normalized = value.normalize("NFC");
  const allowed =
    normalized.match(/[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ&.,'’()\-_\s]/gu)?.join("") ?? "";
  const compacted = allowed.replace(/\s+/g, " ").trimStart();

  return Array.from(compacted).slice(0, COMPANY_NAME_MAX_LENGTH).join("");
}

export function formatCompanyName(value: string) {
  return sanitizeCompanyName(value).trim() || DEFAULT_COMPANY_NAME;
}
