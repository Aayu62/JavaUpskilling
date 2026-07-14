-- Exercise 11: Daily New User Count
-- This query counts users who registered each day in the last 7 days.
-- CURDATE() and INTERVAL make the date range dynamic, so the report stays current.
SELECT
  registration_date,
  COUNT(*) AS new_user_count
FROM Users
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date ASC;

