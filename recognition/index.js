var AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-southeast-2'
});

var rekognition = new AWS.Rekognition();

var params = {
    Image: { /* required */
        S3Object: {
            Bucket: 'sourcerank', //in my case this was 'com.teamavengers.images'
            Name: 'input2.jpg' //in my case this was 'morning/00RsUHNhVXg7ic6enZsahrnXbi2QIDyU.jpg'
        }
    }
};
rekognition.detectText(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else{ // successful response

        let words = data.TextDetections.filter((word) => {
            return word.Type === 'LINE'; //we could filter by 'LINE' or 'WORD'
        });

        let biggestSize = 0;
        let biggest = null;

        /* Find the biggest line */
        words.forEach( word => {
          if ( word.Geometry.BoundingBox.Width * word.Geometry.BoundingBox.Height > biggestSize ) {
            biggestSize = word.Geometry.BoundingBox.Width * word.Geometry.BoundingBox.Height > biggestSize;
            biggest = word;
          }
        });

        console.log( biggest );
    };
});
