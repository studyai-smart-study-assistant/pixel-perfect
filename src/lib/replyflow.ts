export type ViewKey = "overview" | "rules" | "apps" | "activity" | "settings";

export type MatchingMode = "Exact match" | "Contains" | "Starts with" | "Ends with";

export interface MessagingApp {
  id: string;
  name: string;
  shortName: string;
  colorToken: string;
  enabled: boolean;
  replyCapability: "Reply supported" | "No reply action detected";
  customReply: boolean;
  aiReply: boolean;
  lastSeen: string;
}

export interface ReplyRule {
  id: string;
  name: string;
  trigger: string;
  mode: MatchingMode;
  reply: string;
  enabled: boolean;
  apps: string[];
}

export interface ReplyHistoryEntry {
  id: string;
  app: string;
  sender: string;
  incoming: string;
  response: string;
  mode: "CUSTOM" | "AI";
  time: string;
  status: "Sent" | "Failed";
}

export const defaultApps: MessagingApp[] = [
  { id: "whatsapp", name: "WhatsApp", shortName: "W", colorToken: "app-green", enabled: true, replyCapability: "Reply supported", customReply: true, aiReply: false, lastSeen: "Just now" },
  { id: "messenger", name: "Messenger", shortName: "M", colorToken: "app-blue", enabled: true, replyCapability: "Reply supported", customReply: true, aiReply: true, lastSeen: "2 min ago" },
  { id: "instagram", name: "Instagram", shortName: "I", colorToken: "app-pink", enabled: false, replyCapability: "No reply action detected", customReply: false, aiReply: false, lastSeen: "18 min ago" },
  { id: "telegram", name: "Telegram", shortName: "T", colorToken: "app-sky", enabled: false, replyCapability: "Reply supported", customReply: true, aiReply: false, lastSeen: "1 hour ago" },
];

export const defaultRules: ReplyRule[] = [
  { id: "hi-reply", name: "Hi Reply", trigger: "hi", mode: "Contains", reply: "Hello! 👋", enabled: true, apps: ["whatsapp", "messenger"] },
  { id: "availability", name: "Availability", trigger: "where are you", mode: "Exact match", reply: "I’m currently at college.", enabled: true, apps: ["whatsapp"] },
  { id: "hello-reply", name: "Hello Reply", trigger: "hello", mode: "Starts with", reply: "Hey! How are you?", enabled: false, apps: [] },
];

export const defaultHistory: ReplyHistoryEntry[] = [
  { id: "1", app: "WhatsApp", sender: "Riya", incoming: "hi, are you free?", response: "Hello! 👋", mode: "CUSTOM", time: "10:42 AM", status: "Sent" },
  { id: "2", app: "Messenger", sender: "Arjun", incoming: "Hey, can you call me later?", response: "I’ll get back to you soon.", mode: "AI", time: "9:18 AM", status: "Sent" },
];

export function ruleMatches(rule: ReplyRule, message: string, appId: string): boolean {
  if (!rule.enabled || (rule.apps.length > 0 && !rule.apps.includes(appId))) return false;
  const incoming = message.trim().toLocaleLowerCase();
  const trigger = rule.trigger.trim().toLocaleLowerCase();
  if (!trigger) return false;
  if (rule.mode === "Exact match") return incoming === trigger;
  if (rule.mode === "Contains") return incoming.includes(trigger);
  if (rule.mode === "Starts with") return incoming.startsWith(trigger);
  return incoming.endsWith(trigger);
}

export function saveLocal<T>(key: string, value: T): void {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}