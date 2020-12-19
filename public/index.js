$(() => {
  $('input').change(function() {
    let text = $(this).val();
    if (text === null) {
      $('button').prop('disabled', true);
    } else {
      $('button').prop('disabled', false)
    };
  });

  const socket = io();
  $('form').submit(e => {
    e.preventDefault();
    socket.emit('msg', $('#m').val());
    $('#m').val('');
    $('button').prop('disabled', true)
    return false;
  });

  socket.on('msg', msg => {
    $('#messages').append($('<li>').text(msg));
  });
});
