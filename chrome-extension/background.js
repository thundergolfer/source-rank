/* Create an object to store the ratings for a tab ID */
const tabRatings = {};
let activeTab = null;

/* Listen for new tab loads */
chrome.tabs.onUpdated.addListener( async (tabId, changeInfo, tab) => {
  if (changeInfo.status == 'loading') {
    /* Get the URL of the tab */
    const { url } = tab;

    /* Send off the URL to the server and get back a result */
    const result = await getRating( url );

    /* Store the result against the tab ID */
    tabRatings[ tabId ] = result;

    /* If the tab that updated is the current tab then update the badge */
    if ( tabId === activeTab ) {
      updateBadge();
    }
  }
});

/* Listen for tab change */
chrome.tabs.onActivated.addListener( activeInfo => {
  activeTab = activeInfo.tabId;
  updateBadge();
});

async function getRating( url ) {
  let result = { valid: false };

  try {
    result = await fetch( 'http://www.sourcerank.org/api/article', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
    if ( result.ok ) {
      result = await result.json();
      result.valid = true;
    } else {
      result = { valid: false };
    }
  } catch ( e ) { /* Do nothing */ }

  return result;
}

function updateBadge() {
  /* Get the rating for the current tab */
  const rating = tabRatings[ activeTab ];

  if ( rating && rating.valid ) {
    /* Alter the badge on the extension */
    chrome.browserAction.setBadgeText( { text: rating.num_rating.toString() } );

    /* Set the colour of the badge based upon the the rating */
    if ( rating.num_rating >= 8 ) {
      chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
    }

    if ( rating.num_rating >= 5 && rating.num_rating < 8 ) {
      chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' });
    }

    if ( rating.num_rating < 5 ) {
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
    }

    return;
  }

  /* Clear the badge text */
  chrome.browserAction.setBadgeText( { text: '' } );
}

function getCurrentTabRating() {
  return tabRatings[activeTab];
}
