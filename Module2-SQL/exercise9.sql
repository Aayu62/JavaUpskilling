-- Exercise 9: Organizer Event Summary
-- This query shows, for each organizer, how many events they created and how many events are in each status.
-- SUM(CASE...) is a beginner-friendly way to create separate status counts inside one grouped result.
SELECT
  u.user_id AS organizer_id,
  u.full_name,
  COUNT(e.event_id) AS total_events,
  SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming_events,
  SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed_events,
  SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_events
FROM Users u
LEFT JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name
ORDER BY total_events DESC, u.full_name ASC;

