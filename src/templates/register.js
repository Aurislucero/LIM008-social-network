import { registroConCorreoClick, cambiarHash } from '../view-controller.js';

export const registrarCuenta = () => {
  const formularioRegistro = document.createElement('div');
  const formulario = `
  <div class='registrarse'>
    <img class='logo-registro' src='img/icono-registrar.png' alt=''>
   <form id='form-registrar' class='form-registrar' action='index.html' method='post'>
     <fieldset>
       <span class='titulo-registrarse'>Regístrate con tu direccion de correo electronico</span>
       <h4 id='error-registrarse' class='error'></h4>
       <input class='form' type='text' name='nombres' placeholder='Nombres'>
       <input class='form' type='text' name='correo' placeholder='Correo electrónico'>
       <input class='form' type='password' name='contrasena' placeholder='Contraseña'>
       <button class='btn-login' id='btn-register' type='submit'><span>REGISTRATE</span></button>
     </fieldset>
   </form>
   <button class='btn-login' id='btn-iniciar' type='submit'><span>INICIA SESIÓN</span></button>
  </div>
  `;

formularioRegistro.innerHTML = formulario;

const subRegistrar = formularioRegistro.querySelector('#form-registrar');
subRegistrar.addEventListener('submit', registroConCorreoClick);

const btnIniciar = formularioRegistro.querySelector('#btn-iniciar');
  btnIniciar.addEventListener('click', () => {
  cambiarHash('/login')
  });

return formularioRegistro;
}

