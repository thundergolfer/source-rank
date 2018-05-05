function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

while (true) {
  sleep(3000, function() {
     console.log('hello from node.js')
  });
}
