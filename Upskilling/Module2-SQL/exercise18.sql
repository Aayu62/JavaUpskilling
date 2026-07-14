-- Exercise 18: Resource Availability Check
-- This query lists events that do not have any resources uploaded.
-- LEFT JOIN keeps all events, and WHERE resource_id IS NULL filters to the ones with no match.
SELECT
  e.event_id,
  e.title,
  e.status
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL
ORDER BY e.title ASC;

