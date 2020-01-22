let ctx, controller, loop;
let i; // pohyb pro objekt po ose X
let z; // pohyb pro objekt po ose Y
let intervalY = 18; // tolerance Y
let intervalX = 26; // tolerance X

ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 600; // výška canvasu
ctx.canvas.width = 1080; // šířka canvasu

let audio = new Audio('zvuk.mp3');
let audio2 = new Audio('jump.wav');
let audio3 = new Audio('smrt.mp3');
let startTime = new Date();
        audio.play();

function Konec (){
}

let rectangle = {
  height: 32,
  jumping: true,
  width: 32, // šířka objektu
  x: 500, // střed canvasu
  x_velocity: 0, // objekt spadne do středu canvasu
  y: 0, // výška z které bude objekt padat
  y_velocity: 1, //rychlost pádu
};

let rychlost = 5; //rychlost pohybu objektu směrem vlevo

//objekt červený čtverec
function Objekt(x, y, width, height){
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, width, height);
  ctx.fill();
}

let j = new Objekt(1080, 100, 100, 100);
i = j.x;
z = 400;
let body = 0;

// ovládání pomocí kláves
controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    let key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37: // při zmáčknutí levé šipky či držení se objekt bude posouvat vlevo
        controller.left = key_state;
        return;
      case 38: // při zmáčknutí horní šipky či držení se objekt bude posouvat nahoru
        controller.up = key_state;
        audio2.play();
        return;
      case 39: // při zmáčknutí pravé šipky či držení se objekt bude posouvat vpravo
        controller.right = key_state;
        return;

    }

  }

};

loop = function () {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 40; // výška do jaké objekt skočí v tomhle případě 40%
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5; // velikost posunutí objektu do leva 

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5; // velikost posunutí objektu do prava

  }

  rectangle.y_velocity += 1.5; // velikost gravitace
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity; // zajišťuje že objekt se může zaroveň při skoku hýbat v levo či pravo a naopak
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction

  // pokud objekt spadne pod spodní čáru
  if (rectangle.y > 600 - 150 - 32) {
// 600 výška canvasu - 150 vzdálenost spodní čáry - 32 velikost objektu
    rectangle.jumping = false;
    rectangle.y = 600 - 150 - 32;
    rectangle.y_velocity = 0;

  }

  // pokud objekt přejde z levé části obrazovky
  if (rectangle.x < -32) {
// pokud se celý objekt zmizí z obrazovky tedy o svou velikost přesáhne canvas či bude mimo z druhé strany
    rectangle.x = 1080;

  } else if (rectangle.x > 1080) { // Pokud objekt překročí pravou stranu

    rectangle.x = -32;

  }

// Obrázky které slouží jako podstava a pozadí a konec
let img = document.getElementById("zem");
let zem = ctx.createPattern(img, "repeat");
let img2 = document.getElementById("nebe");
let nebe = ctx.createPattern(img2, "no-repeat");
let img4 = document.getElementById("konecO");
let konecO = ctx.createPattern(img4, "no-repeat");


  ctx.fillStyle = nebe; // vypln pozadí
  ctx.fillRect(0, 0, 1080, 450); // x, y, šířka, výška
  ctx.fillStyle = "black";// vyplň čtverce
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill(); //
  ctx.fillStyle = zem; // vyplění čtverce 
  ctx.lineWidth = 2;  //
  ctx.beginPath();  //
  ctx.moveTo(0, 450); //
  ctx.lineTo(1080, 450);  //
  ctx.rect(-5, 450, 1200, 160); //
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#7cfc00";  //
  j = new Objekt(i, z, 50, 50);
  i=i-rychlost;
  //i=j;
  if (i < -32) {
    // pokud se celý objekt zmizí z obrazovky tedy o svou velikost přesáhne canvas či bude mimo z druhé strany
        i = 1080;
        z -= Math.floor(Math.random() * 121); //vygeneruje náhodné číslo od 0 do 120
        console.log(body)
        body=(body + rychlost); // přičtení bodů
        console.log(body)
		if (z < 280){
			z = 400;
		};
		if (z > 400){
			z = 400;
		};		
        rychlost++;
        if (rychlost > 30){
          rychlost = 30;          
        };
  };
  if(i>rectangle.x && (rectangle.y.toFixed(0)-(z+intervalY)<=intervalY)){ /* || (z+interval == rectangle.y.toFixed(0))*/
    if ((i - rectangle.x.toFixed(0))<=intervalX && (rectangle.y.toFixed(0)-(z+intervalY))<=intervalY){// || (rectangle.y.toFixed(0)-(z+18))<interval){
     //i je x pro objekt rec.x pro kostku z je pro y..
    if((rectangle.x.toFixed(0)-i)<=intervalX){
      //<=interval){//|| (rectangle.y.toFixed(0)-(z+18))<interval){
        if (rectangle.y+18 >= z){// && //z >= rectangle.y){
    ctx.beginPath();
    ctx.fillStyle = konecO;
    ctx.moveTo(0, 450);
    ctx.lineTo(1080, 600); 
    ctx.rect(-5, -5, 1100, 650); 
    ctx.fill();
    audio.pause();
    audio3.play();
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(`Body: ${body}`, 230, 500);
    let actualTime = new Date();
    let time = actualTime.getTime() - startTime.getTime();
    ctx.fillText(`Čas přežití: ${(time/1000).toFixed(0)} sekund`, 470, 500);
    ctx.fillText(`Celkové skóre: ${(body*(time/1000)).toFixed(0)}`, 330, 550);
    return Konec;
        };
     };
  };
};
  // aktualizace při dalším možném vykreslení ve smyčce
  window.requestAnimationFrame(loop);


};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
