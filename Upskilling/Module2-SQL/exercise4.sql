-- Exercise 4: Peak Session Hours
-- This query counts sessions that start between 10 AM and 12 PM for each event.
-- HOUR() helps extract the hour from a DATETIME column, and GROUP BY summarizes the count per event.
SELECT
  e.event_id,
  e.title,
  COUNT(s.session_id) AS peak_session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE HOUR(s.start_time) BETWEEN 10 AND 11
GROUP BY e.event_id, e.title
ORDER BY peak_session_count DESC, e.title ASC;

