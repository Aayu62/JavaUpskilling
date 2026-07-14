-- Exercise 15: Event Session Time Conflict
-- This query identifies overlapping sessions within the same event.
-- The self-join compares one session to another session in the same event.
SELECT DISTINCT
  s1.event_id,
  s1.session_id AS session_1,
  s1.title AS session_1_title,
  s2.session_id AS session_2,
  s2.title AS session_2_title
FROM Sessions s1
JOIN Sessions s2
  ON s1.event_id = s2.event_id
 AND s1.session_id < s2.session_id
 AND s1.start_time < s2.end_time
 AND s2.start_time < s1.end_time
ORDER BY s1.event_id, s1.session_id, s2.session_id;

