import { ingresarConCorreoYContrasenaClick, ingresarConGoogleClick, ingresarConFacebookClick, cambiarHash } from '../view-controller.js'

export const iniciarSesion = () => {
  const formIniciar = document.createElement('section');
  const formLogin = `
    <div class='iniciar-sesion'>
     <div class='cabecera-login'>
       <img class='logo-inicio' src='img/logo.png' alt='logo'>
       <h2 class='titulo-inicio'>Infocourse</h2>
       <span class='slogan'>Comparte tus conocimientos y aprende de otros</span>
     </div>
     <form id='form-autenticacion' class='form-autenticacion' action='index.html' method='post'>
       <h4 id='error-login' class='error'></h4>
       <input class='form ' type='text' id='email' name='email' placeholder='Correo electrónico'>
       <input class='form' type='password' id='password' name='password' placeholder='Contraseña'>
       <button class='btn-login' id='btn-login' type='submit'>INICIAR SESIÓN</button>
     </form>
     <div class='iconos'>
       <button id='btn-google' class='formGoogle' ><img class = 'iconGoogle' src='img/icono-google.png' alt='google'>Iniciar sesión con Google</button>
       <button id='btn-facebook' class='formFacebook'><img class = 'iconFacebook' src='img/icono-face.png' alt='facebook'>Iniciar sesión con Facebook</button>
       <a id='btn-registrate'>¿No tienes cuenta? Regístrate AQUI</a>
     </div>
    </div>
  `;
  formIniciar.innerHTML = formLogin;
    
  // Inicia sesión con Correo y contraseña
  const formAutenticacion = formIniciar.querySelector('#btn-login');
  formAutenticacion.addEventListener('click', ingresarConCorreoYContrasenaClick);

  // Inicia sesion con cuenta Google
  const btnGoogle = formIniciar.querySelector('#btn-google');
  btnGoogle.addEventListener('click', ingresarConGoogleClick);

  // Inicia sesion con cuenta Facebook
  const btnFacebook = formIniciar.querySelector('#btn-facebook');
  btnFacebook.addEventListener('click', ingresarConFacebookClick);

  const btnRegister = formIniciar.querySelector('#btn-registrate');
  btnRegister.addEventListener('click', () => {
  cambiarHash('#/signup')
  });
  
  return formIniciar;
};
