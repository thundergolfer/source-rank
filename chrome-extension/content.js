const sourceRankLinkRatings = {};
const foundLinks = {};

function checkFacebook() {
  /* Search the page for external links every 5 seconds */
  setInterval(() => {
    const links = document.querySelectorAll( '._6ks a' );

    /* Loop over the links and fetch any we don't have yet */
    for ( let i = 0; i < links.length; i++ ) {
      const link = links[i].href;

      const card = links[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

      /* Parse the url to remove any Facebook redirect stuff */
      let realLink = link.includes( 'https://l.facebook.com/l.php?u=' ) ? link.split( 'https://l.facebook.com/l.php?u=' )[1].split( '&' )[0] : link;

      /* Decode the url encoded link */
      realLink = decodeURIComponent( realLink );

      /* If we haven't found this link yet get the rating */
      if ( !foundLinks[ realLink ] && realLink.includes( 'http' )) {
        console.log( realLink );
        foundLinks[ realLink ] = true;

        getURLRanking( realLink, rating => {
          sourceRankLinkRatings[ realLink ] = rating;

          /* Calculate a colour for the rating */
          const ratingValue = rating.num_rating;
          let color = "#2ecc71"; /* Green */

          if ( ratingValue < 8 ) {
            color = "#f39c12"; /* Orange */
          }

          if ( ratingValue < 5 ) {
            color = "#e74c3c"; /* Red */
          }

          /* Create a new div */
          const div = document.createElement('div');
          div.innerHTML = `<img src="https://imgur.com/OSOrDMa.png" height="15px" /> ${ratingValue}`;
          div.className = 'sourcerank-item';
          div.style.color = color;

          card.appendChild( div );
        });
      }
    }
  }, 500);
}

function checkReddit() {
  setInterval(() => {
    const links = document.querySelectorAll( 'div.s1g3raxf-2.eGpfTa a' );

    for ( let i = 0; i < links.length; i++ ) {
      const link = links[i].href;
      const card = links[i].parentElement.parentElement;

      if ( !foundLinks[ link ] && link.includes( 'http' )) {
        foundLinks[ link ] = true;

        getURLRanking( link, rating => {
          sourceRankLinkRatings[ link ] = rating;

          /* Calculate a colour for the rating */
          const ratingValue = rating.num_rating;
          let color = "#2ecc71"; /* Green */

          if ( ratingValue < 8 ) {
            color = "#f39c12"; /* Orange */
          }

          if ( ratingValue < 5 ) {
            color = "#e74c3c"; /* Red */
          }

          /* Create a new div */
          const div = document.createElement('div');
          div.innerHTML = `<img src="https://imgur.com/OSOrDMa.png" height="15px" /> ${ratingValue}`;
          div.className = 'sourcerank-item reddit';
          div.style.color = color;

          card.appendChild( div );
        });
      }
    }
  }, 500);
}

function checkGoogle() {
  setInterval(() => {
    console.log( 'Checking Google' );
    const links = document.querySelectorAll( '.rc .r a' );

    for ( let i = 0; i < links.length; i++ ) {
      const link = links[i].href;
      const card = links[i].parentElement;

      if ( !foundLinks[ link ] && link.includes( 'http' )) {
        foundLinks[ link ] = true;

        getURLRanking( link, rating => {
          sourceRankLinkRatings[ link ] = rating;

          /* Calculate a colour for the rating */
          const ratingValue = rating.num_rating;
          let color = "#2ecc71"; /* Green */

          if ( ratingValue < 8 ) {
            color = "#f39c12"; /* Orange */
          }

          if ( ratingValue < 5 ) {
            color = "#e74c3c"; /* Red */
          }

          /* Create a new div */
          const div = document.createElement('div');
          div.innerHTML = `<img src="https://imgur.com/OSOrDMa.png" height="15px" /> ${ratingValue}`;
          div.className = 'sourcerank-item google';
          div.style.color = color;

          card.appendChild( div );
        });
      }
    }
  }, 500);
}

function getURLRanking( url, callback ) {
  callback({ num_rating: Math.round( Math.random() * 10 ), str_rating: "'A' grade" });
}

if ( window.location.hostname.includes( 'facebook' )) {
  checkFacebook();
}

if ( window.location.hostname.includes( 'reddit' )) {
  checkReddit();
}

console.log( window.location.hostname );

if ( window.location.hostname.includes( 'google.com' )) {
  console.log( 'Google' );
  checkGoogle();
}
