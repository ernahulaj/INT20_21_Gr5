var i = 0;

function kohaNumeruar() {
  i = i + 1;
   postMessage(i);
   setTimeout("kohaNumeruar()", 500);
}
kohaNumeruar();
