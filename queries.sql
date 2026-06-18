

-- 1. User Upcoming Events
-- Show upcoming events a user is registered for in their city
SELECT 
    u.full_name,
    e.title,
    e.start_date,
    e.city,
    e.status
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
  AND e.city = u.city
ORDER BY e.start_date ASC;

-- 2. Top Rated Events
-- Events with highest average rating (minimum 10 feedbacks)
SELECT 
    e.title,
    ROUND(AVG(f.rating), 2) AS average_rating,
    COUNT(f.feedback_id) AS feedback_count
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) >= 10
ORDER BY average_rating DESC
LIMIT 5;

-- 3. Inactive Users
-- Users who have not registered for any event in last 90 days
SELECT 
    u.full_name,
    u.email,
    u.city,
    MAX(r.registration_date) AS last_registration
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_date IS NULL 
   OR r.registration_date < DATE_SUB(CURDATE(), INTERVAL 90 DAY)
GROUP BY u.user_id, u.full_name, u.email, u.city;

-- 4. Peak Session Hours
-- Count sessions between 10 AM to 12 PM for each event
SELECT 
    e.title,
    COUNT(s.session_id) AS peak_sessions
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY e.event_id, e.title
ORDER BY peak_sessions DESC;

-- 5. Most Active Cities
-- Top 5 cities with highest registrations
SELECT 
    u.city,
    COUNT(DISTINCT r.user_id) AS unique_users,
    COUNT(r.registration_id) AS total_registrations
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY unique_users DESC
LIMIT 5;

-- 6. Event Resource Summary
SELECT 
    e.title,
    COUNT(CASE WHEN res.resource_type = 'pdf' THEN 1 END) AS pdf_count,
    COUNT(CASE WHEN res.resource_type = 'image' THEN 1 END) AS image_count,
    COUNT(CASE WHEN res.resource_type = 'link' THEN 1 END) AS link_count,
    COUNT(res.resource_id) AS total_resources
FROM Events e
LEFT JOIN Resources res ON e.event_id = res.event_id
GROUP BY e.event_id, e.title
ORDER BY total_resources DESC;

-- 7. Low Feedback Alerts
SELECT 
    u.full_name,
    e.title,
    f.rating,
    f.comments,
    f.feedback_date
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3
ORDER BY f.feedback_date DESC;

-- 8. Sessions per Upcoming Event
SELECT 
    e.title,
    e.start_date,
    COUNT(s.session_id) AS total_sessions
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title, e.start_date
ORDER BY total_sessions DESC;

-- 9. Organizer Event Summary
SELECT 
    u.full_name AS organizer_name,
    COUNT(e.event_id) AS total_events,
    SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming,
    SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM Users u
JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name
ORDER BY total_events DESC;