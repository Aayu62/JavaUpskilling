-- Exercise 14: Most Registered Events
-- This query returns the top 3 events by registration count.
-- COUNT() summarizes registrations per event, and LIMIT keeps only the highest-ranked rows.
SELECT
  e.event_id,
  e.title,
  COUNT(r.registration_id) AS total_registrations
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC, e.title ASC
LIMIT 3;

