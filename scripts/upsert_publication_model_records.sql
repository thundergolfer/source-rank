INSERT INTO publication (domain, name, subscription_revenue)
VALUES (
  'The New York Times',
  'https://www.nytimes.com',
  true
)
ON CONFLICT (domain)
DO
  UPDATE
    SET subscription_revenue = true;
