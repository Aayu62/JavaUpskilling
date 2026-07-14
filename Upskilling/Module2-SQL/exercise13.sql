-- Exercise 13: Average Rating per City
-- This query calculates the average feedback rating for events conducted in each city.
-- Joining Feedback to Events lets us group feedback by the event location.
SELECT
  e.city,
  AVG(f.rating) AS average_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.city
ORDER BY average_rating DESC, e.city ASC;

