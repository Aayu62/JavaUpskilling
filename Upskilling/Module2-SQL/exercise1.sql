-- Exercise 1: User Upcoming Events
-- This query shows upcoming events that a user has registered for and that are in the same city as the user.
-- JOINs connect Users, Registrations, and Events so we can combine profile and event data for the portal.
-- ORDER BY sorts by event date so the nearest event appears first.
SELECT
  u.full_name,
  u.city AS user_city,
  e.title AS event_title,
  e.start_date,
  e.city AS event_city
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
  AND e.city = u.city
ORDER BY e.start_date ASC;

