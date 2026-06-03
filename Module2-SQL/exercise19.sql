-- Exercise 19: Completed Events with Feedback Summary
-- This query shows completed events along with total registrations and average feedback rating.
-- LEFT JOIN is used so events still appear even when feedback is missing.
SELECT
  e.event_id,
  e.title,
  COUNT(DISTINCT r.registration_id) AS total_registrations,
  AVG(f.rating) AS average_rating
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title
ORDER BY e.title ASC;

