-- Exercise 25: Events Without Sessions
-- This query lists events that currently have no sessions scheduled under them.
-- LEFT JOIN plus IS NULL is the classic pattern for finding missing related rows.
SELECT
  e.event_id,
  e.title,
  e.status
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL
ORDER BY e.title ASC;

