module.exports = global.setImmediate || (function() {
  var head = { }, tail = head;

  var ID = Math.random();

  function onmessage(e) {
    if(e.data != ID) return;
    head = head.next;
    var func = head.func;
    delete head.func;
    func();
  }

  if(window.addEventListener) {
    window.addEventListener('message', onmessage);
  } else {
    window.attachEvent( 'onmessage', onmessage );
  }

  return function(func) {
    tail = tail.next = { func: func };
    window.postMessage(ID, "*");
  };
}());