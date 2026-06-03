-- Exercise 7: Low Feedback Alerts
-- This query lists users who gave low feedback ratings, along with the event they reviewed and their comments.
-- Joining Users, Feedback, and Events makes the report readable for administrators.
SELECT
  u.full_name,
  e.title AS event_title,
  f.rating,
  f.comments,
  f.feedback_date
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3
ORDER BY f.feedback_date DESC;

