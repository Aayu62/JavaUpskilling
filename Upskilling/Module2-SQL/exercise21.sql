-- Exercise 21: Top Feedback Providers
-- This query lists the top 5 users who have submitted the most feedback entries.
-- ORDER BY and LIMIT are used to rank the most active reviewers.
SELECT
  u.user_id,
  u.full_name,
  COUNT(f.feedback_id) AS feedback_count
FROM Users u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY feedback_count DESC, u.full_name ASC
LIMIT 5;

