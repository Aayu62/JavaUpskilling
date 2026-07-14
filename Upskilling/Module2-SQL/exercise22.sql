-- Exercise 22: Duplicate Registrations Check
-- This query detects duplicate registrations where the same user appears more than once for the same event.
-- HAVING COUNT(*) > 1 flags repeated registrations after grouping by user and event.
SELECT
  user_id,
  event_id,
  COUNT(*) AS registration_count
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1
ORDER BY registration_count DESC, user_id, event_id;

