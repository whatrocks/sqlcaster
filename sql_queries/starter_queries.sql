-- suggested starter queries for users of SQLcaster


-- List the top-10 most recent users (avatar_url & display_name) that have replied to a user account
-- sample account: 'a16zcrypto'
SELECT 
   avatar_url
  , display_name
  , reply_parent_username
  , published_at
FROM casts
WHERE reply_parent_username = 'a16zcrypto'
ORDER BY published_at DESC
LIMIT 10


-- Count number of users (display_name) on Farcaster who have replied to an account
-- sample account: 'a16zcrypto'
SELECT 
   COUNT(display_name)
  , reply_parent_username
FROM casts
WHERE reply_parent_username = 'a16zcrypto'
GROUP BY reply_parent_username
LIMIT 10

-- Query 10 most recently published casts by a user account
-- sample account: 'Dan Romero'
SELECT 
   avatar_url
  , display_name
  , text 
  , published_at
FROM casts
WHERE display_name = 'Dan Romero'
ORDER BY published_at DESC
LIMIT 10

-- Count unique addresses on Farcaster
SELECT 
   COUNT(DISTINCT(ADDRESS))
FROM casts
LIMIT 10

-- List the top-10 user accounts (avatar_url & display_name) by number of recasters, in descending order
SELECT 
   avatar_url
  , display_name
  , COUNT(recasters) AS num_recasters
FROM casts
GROUP BY avatar_url, display_name
ORDER BY num_recasters DESC
LIMIT 10


-- List the top-10 user accounts (avatar_url & display_name) by number of mentions, in descending order
SELECT 
   avatar_url
  , display_name
  , COUNT(mentions) AS num_mentions
FROM casts
GROUP BY avatar_url, display_name
ORDER BY num_mentions DESC
LIMIT 10

-- List the top-10 user accounts (avatar_url & display_name) by nunber of deleted casts, in descending order
SELECT 
   avatar_url
  , display_name
  , COUNT(DELETED) AS num_deleted
FROM casts
GROUP BY avatar_url, display_name
ORDER BY num_deleted DESC
LIMIT 10



