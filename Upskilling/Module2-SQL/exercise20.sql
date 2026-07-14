-- Exercise 20: User Engagement Index
-- This query calculates how many events each user attended and how many feedback records they submitted.
-- The two LEFT JOINs give a dashboard-style summary for each user.
SELECT
  u.user_id,
  u.full_name,
  COUNT(DISTINCT r.event_id) AS attended_events,
  COUNT(DISTINCT f.feedback_id) AS feedback_submissions
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY attended_events DESC, feedback_submissions DESC, u.full_name ASC;

