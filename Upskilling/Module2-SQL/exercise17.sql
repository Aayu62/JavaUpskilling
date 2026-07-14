-- Exercise 17: Multi-Session Speakers
-- This query finds speakers who are handling more than one session across all events.
-- GROUP BY speaker_name and HAVING COUNT(*) > 1 isolates repeated speakers.
SELECT
  speaker_name,
  COUNT(*) AS session_count
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1
ORDER BY session_count DESC, speaker_name ASC;

