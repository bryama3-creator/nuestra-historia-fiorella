/* ===================================================================
   CONFIGURACIÓN — casi todo lo que vas a cambiar está en este bloque
   =================================================================== */
const FECHA_CLAVE = '17012025'; // ✏️ Contraseña: día+mes+año, solo números (17/01/2025)

/* Atajo para una foto: item('historia', 1, ...) usa  imagenes/historia/foto1.jpg
   ✏️ FOTOS: pon tus archivos en la carpeta de cada sección con esos nombres
      (foto1.jpg, foto2.jpg…) o cambia el nombre aquí. Si falta una foto, se
      ve un marco con el nombre del archivo que debes colocar. */
const item = (carpeta, n, fecha, texto, titulo) =>
  ({ src: `imagenes/${carpeta}/foto${n}.jpg`, fecha, texto, titulo });

/* ✏️ CANCIONES: cada sección tiene la suya. Copia tu MP3 a la carpeta musica/
   con el nombre indicado en "musica" (o cambia el nombre aquí). */
const SECCIONES = {
  historia: {
    nombre: 'Nuestra historia', icono: '❦', tipo: 'galeria', musica: 'musica/historia.mp3',
    intro: 'Cada foto es un capítulo. Desde el 17 de septiembre de 2024 hasta hoy.',
    items: [ // ✏️ Fotos en orden cronológico: cambia fechas y textos
      item('historia', 1, '17 sep 2024', 'Donde todo empezó'),
      item('historia', 2, 'Fecha', 'Escribe aquí el recuerdo'),
      item('historia', 3, 'Fecha', 'Escribe aquí el recuerdo'),
      item('historia', 4, 'Fecha', 'Escribe aquí el recuerdo'),
      item('historia', 5, '17 ene 2025', 'El día que nos elegimos'),
      item('historia', 6, 'Hoy', 'Y seguimos escribiendo'),
    ]},
  historieta: {
    nombre: 'Nuestra historieta', icono: '❖', tipo: 'comic', musica: 'musica/historieta.mp3',
    intro: 'Nosotros, protagonistas de nuestra propia historia.',
    items: [ // ✏️ "fecha" es la etiqueta dorada; "texto" es el globo de diálogo
      item('historieta', 1, '17 sep 2024', 'Hola... ¿quién diría que serías mi persona favorita?'),
      item('historieta', 2, 'Capítulo 2', 'Cada día contigo se sentía más como hogar.'),
      item('historieta', 3, 'Capítulo 3', 'Y entonces supe que quería más de ti.'),
      item('historieta', 4, '17 ene 2025', 'Dijimos que sí. Y fue el mejor sí de mi vida.'),
      item('historieta', 5, 'Capítulo 5', 'Aventuras, risas y mil fotos de nosotros.'),
      item('historieta', 6, 'Continuará...', 'Lo mejor de esta historia aún no está escrito.'),
    ]},
  recuerdos: {
    nombre: 'Nuestros recuerdos', icono: '✿', tipo: 'galeria', musica: 'musica/recuerdos.mp3',
    intro: 'Pequeños momentos que valen oro.',
    items: [
      item('recuerdos', 1, '', 'Escribe aquí el recuerdo'),
      item('recuerdos', 2, '', 'Escribe aquí el recuerdo'),
      item('recuerdos', 3, '', 'Escribe aquí el recuerdo'),
      item('recuerdos', 4, '', 'Escribe aquí el recuerdo'),
      item('recuerdos', 5, '', 'Escribe aquí el recuerdo'),
      item('recuerdos', 6, '', 'Escribe aquí el recuerdo'),
    ]},
  razones: {
    nombre: 'Razones por las que te amo', icono: '♥', tipo: 'tarjetas', musica: 'musica/razones.mp3',
    intro: 'Son muchas más, pero empecemos por estas.',
    items: [ // ✏️ Cambia títulos y textos por tus razones reales
      item('razones', 1, '', 'Escribe aquí tu razón.', 'Tu sonrisa'),
      item('razones', 2, '', 'Escribe aquí tu razón.', 'Tu forma de ser'),
      item('razones', 3, '', 'Escribe aquí tu razón.', 'Cómo me haces sentir'),
      item('razones', 4, '', 'Escribe aquí tu razón.', 'Nuestros momentos'),
    ]},
  musica: {
    nombre: 'Nuestra música', icono: '♪', tipo: 'galeria', musica: 'musica/cancion.mp3',
    intro: 'La canción que suena cuando pienso en ti.',
    items: [ // ✏️ Fotos o recuerdos ligados a "su" canción
      item('recuerdos', 7, '', 'Escribe aquí por qué esta canción es nuestra'),
      item('recuerdos', 8, '', 'Escribe aquí otro recuerdo musical'),
    ]},
  futuro: {
    nombre: 'Nuestro futuro', icono: '✦', tipo: 'tarjetas', musica: 'musica/futuro.mp3',
    intro: 'Todo lo que todavía nos queda por vivir.',
    items: [ // ✏️ Escribe aquí tus planes y sueños juntos
      item('futuro', 1, '', 'Escribe aquí un lugar que quieras conocer con ella.', 'Lugares por conocer'),
      item('futuro', 2, '', 'Escribe aquí un sueño que quieran cumplir.', 'Sueños por cumplir'),
      item('futuro', 3, '', 'Escribe aquí una aventura pendiente.', 'Aventuras por vivir'),
      item('futuro', 4, '', 'Escribe aquí lo que quieres seguir construyendo.', 'Recuerdos por crear'),
    ]},
};

/* ===================================================================
   LÓGICA (no necesitas tocar nada de aquí hacia abajo)
   =================================================================== */
const $ = s => document.querySelector(s);
const audio = new Audio(); audio.loop = true;

const foto = (i, sinPie) => `<figure class="ph"><img src="${i.src}" alt="${i.texto || ''}">
  <span class="vacio">Aquí va tu foto<small>${i.src}</small></span>
  ${!sinPie && (i.fecha || i.texto) ? `<figcaption>${i.fecha ? `<b>${i.fecha}</b>` : ''}${i.texto || ''}</figcaption>` : ''}</figure>`;

function vista(k, s) {
  const cuerpo = s.tipo === 'comic'
    ? `<div class="comic">${s.items.map(i => `<div class="panel">${foto(i, 1)}<span class="fecha">${i.fecha}</span><p class="bubble">${i.texto}</p></div>`).join('')}</div>`
    : s.tipo === 'tarjetas'
    ? `<div class="grid">${s.items.map(i => `<article class="card">${foto(i, 1)}<h3>${i.titulo}</h3><p>${i.texto}</p></article>`).join('')}</div>`
    : `<div class="grid">${s.items.map(i => foto(i)).join('')}</div>`;
  return `<section class="screen view" id="v-${k}">
    <header class="bar"><button class="link" data-back>← Volver al menú</button><button class="link" data-music>⏸ Pausar música</button></header>
    <h2 class="title sm">${s.nombre}</h2><p class="sub sm">${s.intro}</p>${cuerpo}<p class="aviso" hidden></p></section>`;
}

$('#menuGrid').innerHTML = Object.entries(SECCIONES).map(([k, s]) => `<button data-go="${k}"><b>${s.icono}</b>${s.nombre}</button>`).join('');
$('#views').innerHTML = Object.entries(SECCIONES).map(([k, s]) => vista(k, s)).join('');
document.querySelectorAll('.ph img').forEach(im => {
  const sin = () => im.parentNode.classList.add('sin');
  im.onerror = sin; if (im.complete && !im.naturalWidth) sin();
});

function ir(id) {
  document.querySelectorAll('.screen').forEach(e => e.classList.remove('active'));
  $('#' + id).classList.add('active'); scrollTo(0, 0);
  // el control de la canción de la carta se ve en la carta y en el menú
  $('#musicCtl').hidden = !(id === 'letter' || id === 'menu');
}
function estado() {
  document.querySelectorAll('[data-music]').forEach(b => b.textContent = audio.paused ? '▶ Reproducir música' : '⏸ Pausar música');
}
audio.onplay = audio.onpause = estado;

/* ---------- Canción de la carta ----------
   ✏️ El MP3 debe estar en la MISMA carpeta que index.html. Para cambiar de
   canción o de volumen (0 a 1) edita estas dos líneas. */
const CANCION_CARTA = 'musica.mp3';
const VOLUMEN_CARTA = 0.35; // suave (en iPhone el volumen lo controla el celular)

const carta = $('#cartaAudio'); carta.src = CANCION_CARTA; carta.loop = false;
const ctl = $('#musicCtl');
let fade;
const etiqueta = t => ctl.querySelector('span').textContent = t;
function pintar() {
  ctl.classList.remove('invita');
  ctl.classList.toggle('suena', !carta.paused);
  etiqueta(carta.ended ? 'Escuchar de nuevo' : carta.paused ? 'Reanudar música' : 'Pausar música');
}
function entradaSuave() { // sube el volumen poco a poco al empezar o reanudar
  clearInterval(fade); carta.volume = 0;
  fade = setInterval(() => {
    carta.volume = Math.min(VOLUMEN_CARTA, carta.volume + 0.02);
    if (carta.volume >= VOLUMEN_CARTA) clearInterval(fade);
  }, 120);
}
carta.onplay = () => { pintar(); entradaSuave(); };
carta.onpause = carta.onended = pintar;
carta.onerror = () => { // el archivo no cargó: lo avisamos en el botón para poder corregirlo
  ctl.classList.remove('invita', 'suena'); ctl.classList.add('error'); etiqueta('Canción no encontrada');
  console.warn('No se pudo cargar ' + CANCION_CARTA + '. Debe estar junto a index.html y con el nombre exacto.');
};
ctl.onclick = () => { if (carta.error) return; carta.paused ? carta.play().catch(() => {}) : carta.pause(); };
function iniciarCarta() { // se llama dentro del clic de "Entrar" (así el navegador lo permite)
  carta.play().catch(err => {
    if (carta.error) return; // el archivo no cargó (ya se avisó en el botón)
    // el navegador la bloqueó (NotAllowedError u otro): botón bonito para iniciarla con un toque
    ctl.classList.add('invita'); etiqueta('Toca para iniciar nuestra canción'); ctl.hidden = false;
  });
}

/* Música: un solo reproductor para toda la página, así nunca suenan dos canciones.
   Arranca con el clic del usuario (permitido por el navegador). */
function abrir(k) {
  const s = SECCIONES[k], aviso = $(`#v-${k} .aviso`);
  carta.pause(); audio.pause(); audio.src = s.musica; aviso.hidden = true; ir('v-' + k);
  audio.play().catch(() => { aviso.textContent = 'Para escuchar música aquí, coloca tu canción en: ' + s.musica; aviso.hidden = false; });
}
function volver() { audio.pause(); audio.removeAttribute('src'); audio.load(); ir('menu'); }

/* Acceso */
const gate = $('#gate');
$('#enterBtn').onclick = () => { gate.hidden = false; $('#fecha').value = ''; $('#gateMsg').textContent = ''; $('#fecha').focus(); };
$('#gateClose').onclick = () => gate.hidden = true;
function validar() {
  if ($('#fecha').value.replace(/\D/g, '') === FECHA_CLAVE) {
    gate.hidden = true;
    const ps = document.querySelectorAll('#letter .p');
    ps.forEach((p, i) => p.style.animationDelay = (0.4 + i * 1.4) + 's'); // ritmo de la carta
    ir('letter'); iniciarCarta();
  } else {
    $('#gateMsg').textContent = 'Mmm... esa no es nuestra fecha, mi amor. Piensa en el día que lo cambió todo y vuelve a intentarlo ♥';
    const b = $('#gateBox'); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
  }
}
$('#gateBtn').onclick = validar;
$('#fecha').onkeydown = e => { if (e.key === 'Enter') validar(); };
$('#startBtn').onclick = () => ir('menu');

/* Clics generales: menú, volver, música, foto ampliada */
document.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('[data-go]')) abrir(t.closest('[data-go]').dataset.go);
  else if (t.closest('[data-back]')) volver();
  else if (t.closest('[data-music]')) { if (audio.getAttribute('src')) audio.paused ? audio.play().catch(() => {}) : audio.pause(); }
  else {
    const f = t.closest('.ph');
    if (f && !f.classList.contains('sin')) {
      $('#lb img').src = f.querySelector('img').src;
      $('#lb p').textContent = (f.querySelector('figcaption') || {}).textContent || '';
      $('#lb').hidden = false;
    }
  }
});
$('#lb').onclick = () => $('#lb').hidden = true;
document.onkeydown = e => { if (e.key === 'Escape') { $('#lb').hidden = true; gate.hidden = true; } };

/* Corazones flotantes (suaves, pocos) */
setInterval(() => {
  const h = document.createElement('span');
  h.textContent = '♥'; h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = 10 + Math.random() * 18 + 'px';
  h.style.animationDuration = 9 + Math.random() * 8 + 's';
  $('#hearts').appendChild(h); setTimeout(() => h.remove(), 18000);
}, 1400);
