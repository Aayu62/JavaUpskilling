-- Exercise 23: Registration Trends
-- This query shows a month-wise registration trend for the past 12 months.
-- DATE_FORMAT turns dates into a month label that is easy to read in reports.
SELECT
  DATE_FORMAT(registration_date, '%Y-%m') AS registration_month,
  COUNT(*) AS total_registrations
FROM Registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY registration_month ASC;

