-- Exercise 12: Event with Maximum Sessions
-- This query lists the event or events that have the highest number of sessions.
-- A subquery finds the maximum session count, and the outer query returns matching events.
SELECT
  t.event_id,
  t.title,
  t.session_count
FROM (
  SELECT
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
  FROM Events e
  LEFT JOIN Sessions s ON e.event_id = s.event_id
  GROUP BY e.event_id, e.title
) AS t
WHERE t.session_count = (
  SELECT MAX(x.session_count)
  FROM (
    SELECT COUNT(s2.session_id) AS session_count
    FROM Events e2
    LEFT JOIN Sessions s2 ON e2.event_id = s2.event_id
    GROUP BY e2.event_id
  ) AS x
);

