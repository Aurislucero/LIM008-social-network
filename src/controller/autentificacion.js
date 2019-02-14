// Aqui todas las funciones que involucran FIREBASE AUTH

// Iniciar sesión con cuenta registrada
export const ingresarConCorreoYContrasena = (usuario, contrasena) => 
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)

// Iniciar sesion con cuenta de Google
export const ingresarConGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
}
// Iniciar sesion con cuenta de Facebook
export const ingresarConFacebook = () =>{
  const  provider = new firebase.auth.FacebookAuthProvider();
  return  firebase.auth().signInWithPopup(provider) 
}
// Registrarse con correo y contraseña
export const registroConCorreo = (user, password,name) => {
  return firebase.auth().createUserWithEmailAndPassword(user, password)
}
// Cerrar Sesión
export const cerrarSesion =() => 
  firebase.auth().signOut()

