# Facebook Hackathon 2018 - News/Blog Quality Ranking

### Possible Domains
* newsrank.org
* mediarank.*
* inforank.*
* sourcerank.*

## Basic Idea
1.  Populate a database with data that measures the ‘information quality’ of a publication
2. Rank publications according to the data
3. Expose these rankings via a web interface and via a public API

### Different ‘Information Quality’ Metrics
1. “I trust the experts” - ie. How many academics contribute to the publication?
2. “I value sources” - ie. How many links out of an average article on the publication
3. “I don’t want click-funded content” - ie. Do they have a subscription revenue model?
4. “I want to avoid dishonest publications” - ie. How many time have their articles been review as “false” on Snopes.com, TrueFact, etc. etc.

### Getting the data - “I trust the experts”
1. Scrape articles from a list of publications
2. Get the authors from the articles
3. Check if authors have:
	1. Published papers (check Google Scholar)
	2. Published Books
	3. (Stretch goal) Check if their published stuff matches the article's topic (use an ML API if one exists)
4. Rank publications according to who most often publishes academics

### Getting the data - “I don’t want click-funded content”
1. Manually check the list of publications

### Getting the data - “I value sources”
1. Scrape articles from a list of publications
2. Check how many *external* hyperlinks exist on average
	1. **Note:** hyperlinks != sources, but it’ll do for an MVP

### Getting the data - “I want to avoid dishonest publications”
1. Fact check organisations will more often (I think) fact check *people* rather than individual articles
2. So if you search for people in the `author` table and see whether their name shows up on the fact check websites, we can trace this back to the publications they've published on.
