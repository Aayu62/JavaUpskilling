-- Exercise 8: Sessions per Upcoming Event
-- This query shows all upcoming events and how many sessions each event has scheduled.
-- LEFT JOIN keeps events even when they have zero sessions.
SELECT
  e.event_id,
  e.title,
  COUNT(s.session_id) AS session_count
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title
ORDER BY e.start_date ASC;

