-- Exercise 16: Unregistered Active Users
-- This query finds users who registered in the last 30 days but have not signed up for any event.
-- NOT EXISTS is useful here because we want users with no matching registrations.
SELECT
  u.user_id,
  u.full_name,
  u.email,
  u.registration_date
FROM Users u
WHERE u.registration_date >= CURDATE() - INTERVAL 30 DAY
  AND NOT EXISTS (
    SELECT 1
    FROM Registrations r
    WHERE r.user_id = u.user_id
  )
ORDER BY u.registration_date DESC;

