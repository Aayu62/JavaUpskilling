-- Exercise 24: Average Session Duration per Event
-- This query computes the average session duration in minutes for each event.
-- TIMESTAMPDIFF() is useful for calculating time differences in MySQL.
SELECT
  e.event_id,
  e.title,
  AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS average_session_minutes
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
ORDER BY average_session_minutes DESC, e.title ASC;

