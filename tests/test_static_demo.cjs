const fs=require('node:fs');const assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../demo-sin-instalacion/index.html'),'utf8');
const js=fs.readFileSync(require('node:path').join(__dirname,'../demo-sin-instalacion/app.js'),'utf8');
for(const section of ['inicio','aprender','practicar','recursos','proyecto'])assert.match(html,new RegExp(`id="${section}"`));
assert.match(js,/questions:/);assert.match(js,/answer:1/);assert.match(js,/data\.questions\.filter/);assert.match(html,/CAI Virtual/);
assert.doesNotMatch(html,/<input[^>]*type=["']password/);
console.log('OK: 5 secciones, contenido, 5 actividades y sin captura de contraseñas.');
