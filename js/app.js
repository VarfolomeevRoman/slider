//3D Scrool

//Он отвечает за расстояние по оси Z
let zSpacing = -1000,
  //Теперь нас нужна страртовая позиция
  lastPos = zSpacing / 5;
//Здесь важно использовать getElementsByClassName или getElementsById а не Document.querySelectorA чтобы можно было работать с ним как с массивом и применять другие различные свойтсва
($frames = document.getElementsByClassName("frame")),
  //Мы ищем все элементы на странице и преобразуем их в массив
  (frames = Array.from($frames)),
  //Создаем массив который мы далее будем наполнять значениями по оси Z
  (zVals = []);

window.onscroll = function () {
  //При скроле нам нужны определенные переменные например такие как расстояние сверху до текущей позиции

  let top = document.documentElement.scrollTop,
    // Теперь нам нужен еще один параметр который будет вычислять последнюю позицию которую мы определили в lastPos минус нащ скролл
    delta = lastPos - top;

  lastPos = top;

  frames.forEach(function (n, i) {
    zVals.push(i * zSpacing + zSpacing);
    zVals[i] += delta * -5.5; //С помощью индекса -5 мы можем управлять скоростью пролистывания
    let frame = frames[i],
      transform = `translateZ(${zVals[i]}px)`;
    opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;
    frame.setAttribute(
      `style`,
      `transform:${transform};opacity:${opacity}`
    ); /* opacity Чтобы слайд пропадал раньше чем коснется экрана*/
  });
};

window.scrollTo(0, 1);

//Audio

let soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");
//Теперь определяем событие
soundButton.addEventListener("click", (e) => {
  soundButton.classList.toggle("paused");
  /*Когда нажимаешь класс включается и выключается*/

  // Теперь нам нужно запустить audio но с условием если он на паузе то мы его включаем в противном случае мы его ставим на паузу
  audio.paused ? audio.play() : audio.pause();
});

//Чтобы музыка выключалась если мы уходим со страницы

window.onfocus = function () {
  //Нам нужно привязаться к классу который имеет soundbutton мы проверяем содержит ли он 'paused' то мы ставим audio на паузу в противном случае мы начинаем проигрывание audio
  //onfocus это когда мы делаем вкладку активной
  soundButton.classList.contains("paused") ? audio.pause() : audio.play();
};

window.onblur = function () {
  //onblur Это когда мы покидаем страницу
  audio.pause();
};
