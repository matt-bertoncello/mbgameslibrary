var anagramController = require('../controllers/anagrams/AnagramController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the string HTML of a random 9way board to be displayed on the homescreen.
  socket.on('getAnagrams', function(string) {
    socket.emit('returnWords', anagramController.getWords(string));
  });

  // get the dictionary response from AnagramController and send back. If error, advise there was no definition.
  socket.on('getDefinition', function(word) {
    anagramController.getDefinition(word, function(err, results) {
      // if error, tell client to display dictionary error.
      if (err) {
        socket.emit('definitionError', word);
      } else if (results) {
        // if results were found, send results.
        socket.emit('returnDefinition', results);
      } else {
        // if no error or no results (would be strange), redirect to dashboard.
      socket.emit('redirect','/uni/anagrams');
      }
    });
  });
}

module.exports = socket_router;
