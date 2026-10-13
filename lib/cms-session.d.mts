export const CMS_COOKIE: string;
export const SESSION_SECONDS: number;
export function cmsConfigured(): boolean;
export function createSession(): string;
export function verifyPassword(password: string): boolean;
export function validSession(token?: string): boolean;
