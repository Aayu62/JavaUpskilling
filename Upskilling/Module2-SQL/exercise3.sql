-- Exercise 3: Inactive Users
-- This query lists users who have not registered for any events in the last 90 days.
-- A NOT EXISTS subquery is a clean way to check for missing related rows.
SELECT
  u.user_id,
  u.full_name,
  u.email,
  u.city,
  u.registration_date
FROM Users u
WHERE NOT EXISTS (
  SELECT 1
  FROM Registrations r
  WHERE r.user_id = u.user_id
    AND r.registration_date >= CURDATE() - INTERVAL 90 DAY
);

