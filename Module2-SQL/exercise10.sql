-- Exercise 10: Feedback Gap
-- This query finds events that have registrations but no feedback at all.
-- A NOT EXISTS subquery is a simple way to detect missing feedback records.
SELECT
  e.event_id,
  e.title
FROM Events e
WHERE EXISTS (
  SELECT 1
  FROM Registrations r
  WHERE r.event_id = e.event_id
)
AND NOT EXISTS (
  SELECT 1
  FROM Feedback f
  WHERE f.event_id = e.event_id
)
ORDER BY e.title ASC;

