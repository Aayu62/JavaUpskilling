-- Exercise 5: Most Active Cities
-- This query finds the top 5 cities with the highest number of distinct registered users.
-- COUNT(DISTINCT ...) avoids double-counting the same user if they register for multiple events.
SELECT
  u.city,
  COUNT(DISTINCT r.user_id) AS distinct_user_registrations
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY distinct_user_registrations DESC, u.city ASC
LIMIT 5;

