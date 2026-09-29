# ReplyFlow build plan

## Outcome
Create the first usable ReplyFlow experience from the uploaded brief: a calm, Android-first local control center for notification auto-replies.

## User-visible work
- Replace the blank home screen with a mobile-first ReplyFlow shell.
- Show notification access, automation status, supported app count, active rules, and replies today.
- Add working Custom Replies, AI Replies, Apps, Activity, and Settings views using local demo data.
- Include controls for rule enablement, per-app enablement, auto-reply mode, AI daily limit, and a clear history action.
- Surface the important limitation that only notifications with an actual reply action can be processed.

## Technical details
- Keep all state local to the browser preview behind small typed models and a local storage abstraction.
- Keep custom matching local and deterministic; no backend, accounts, or remote service calls.
- Use the existing TanStack Start route and global semantic tokens, with Lucide icons for controls.
- Add route-specific metadata for ReplyFlow and preserve the existing root shell.
- Leave native NotificationListenerService and Capacitor packaging as a follow-up implementation boundary; the browser preview will clearly present native access as a simulated local state.

## Verification
- Check the build diagnostics after edits.
- Drive the preview at the provided mobile viewport and confirm the main state, navigation, toggles, rule creation, and history clearing behavior.
