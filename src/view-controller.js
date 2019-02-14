import { ingresarConCorreoYContrasena, ingresarConGoogle, ingresarConFacebook, registroConCorreo, cerrarSesion } from './controller/autentificacion.js';
import { agregarPost, eliminarPost, editarPost,postLike} from './controller/publicacion.js';

// Funcion para cambiar la ruta
export const cambiarHash = (hash) =>  {
    location.hash = hash;
  }

export const ingresarConCorreoYContrasenaClick = (event) => {
    event.preventDefault();
    let usuario = document.querySelector('#email').value;
    let contrasena = document.querySelector('#password').value;
    let errorLogin = document.querySelector('#error-login');
    ingresarConCorreoYContrasena(usuario, contrasena)
        .then(() => cambiarHash('/home'))
        .catch(() => errorLogin.innerHTML= 'Datos incorrectos, vuelve a intentarlo')
    }

export const ingresarConGoogleClick = (event) => {
    event.preventDefault();
    ingresarConGoogle()
        .then(() => {
            let user = firebase.auth().currentUser;
            if (user != null) {
            user.providerData.forEach(function (profile) {
                firebase.firestore().collection('users').doc(user.uid).set({
                    id: profile.uid,
                    name: profile.displayName,
                    email: profile.email,
                    photo: profile.photoURL,
                    });
            }
            )}
            cambiarHash('/home');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
        })
    }

export const ingresarConFacebookClick = (event) => {
    event.preventDefault();
    ingresarConFacebook()
        .then(() => {
            let user = firebase.auth().currentUser;
            if (user != null) {
            user.providerData.forEach(function (profile) {
                firebase.firestore().collection('users').doc(user.uid).set({
                    id: profile.uid,
                    name: profile.displayName,
                    email: profile.email,
                    photo: profile.photoURL,
                    });
            }
            )}
            cambiarHash('/home');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        })
    }

 export const registroConCorreoClick = (event) => {
    event.preventDefault();
    let user = event.target.correo.value;
    let password = event.target.contrasena.value;
    let name = event.target.nombres.value;
    let errorRegis = document.getElementById('error-registrarse');
    registroConCorreo(user, password)
        .then(() => {
            let user = firebase.auth().currentUser;
            firebase.firestore().collection('users').doc(user.uid).set({
                id: user.uid,
                name: name,
                email: user.email,
                photo: user.photoURL,
                });
            user.sendEmailVerification()
            .catch((error) => {
                if(user === '' & password === '' & user === ''){
                    errorRegis.innerHTML = 'Debe completar todos los campos'
                }
                console.log('No se pudo enviar email')
                });
                alert('Email enviado, revise su bandeja e inicie sesión');
                cambiarHash('/login');
        })
        .catch(function(error) {
            errorRegis.innerHTML = error.message;
            if(user === '' & password === '' & user === ''){
                errorRegis.innerHTML = 'Debe completar todos los campos'
            }
            console.log(error.message);
        })
} 

export const cerrarSesionClick = () => {
    cerrarSesion()
    .then(() => cambiarHash('/login'))
    .catch(err => console.log('Error logout', err))
 }
 
 export const inicializarFire = () => {
    firebase.auth().onAuthStateChanged(()=>{
        const user = firebase.auth().currentUser;
        let photo, name;
        if (user !== null) {
             name = user.displayName;
             photo = user.photoURL;
            console.log(name,photo); 
            const nameInfo=`
            <p>${name}</p>
            <img src="${photo}">`;
            const datosUsuario = document.getElementById('datos-usuario'); 
            datosUsuario.innerHTML= nameInfo;
            //menuNavegacionHome(displayName, photoURL);
        } else {
            console.log('hola')
        }     
    } ) 
}

export const guardarConClick = (event) => {
    event.preventDefault();
    const inputMensaje = document.getElementById("id-publicacion").value;
    if (inputMensaje === ""){
        document.getElementById('id-MensajeError').innerHTML = "Para publicar es necesario que ingreses un texto";
    }else{
        document.getElementById('id-MensajeError').innerHTML = "";
        const user = firebase.auth().currentUser;
        const photoUser = user.photoURL;
        const nameUser = user.displayName;
        const valorMensaje = document.getElementById("id-publicacion").value;
        let likes =  0;
        const privacidad = document.getElementById("id-privacidad").value;
        return agregarPost(photoUser, nameUser, valorMensaje,likes,privacidad);
    }
}

export const eliminarMensajeConClick = (event) =>{
    if (confirm("Estas seguro de eliminar este mensaje") == true){
        event.preventDefault();
        eliminarPost(event.target.id);
    }    
}
export const editarMensajeConClick = (event) =>{
    event.preventDefault();
    const idEditar = event.target.id;
    const idTextArea = "btn-"+(idEditar.slice(10, 30))
    document.getElementById(idTextArea).readOnly= false;
    console.log(idEditar)
    document.getElementById("btnEditar-"+idEditar.slice(10, 30)).style.display = 'none';
    document.getElementById("btnEliminar-"+idEditar.slice(10, 30)).style.display = 'inline';
}

export const likesConClick = (objPost, like) => {
    
   return postLike(objPost, like);
    
   // return postLike(objPost.id, like);
  };
export const editarGuardarMensajeConClick = (event) =>{
    const idEditarGuardar = event.target.id;
    const idTextArea = "btn-"+(idEditarGuardar.slice(12, 32))
    document.getElementById(idTextArea).readOnly= true;
    const idMensaje = idEditarGuardar.slice(12, 32)
    const post = document.getElementById(idTextArea).value;
    editarPost(idMensaje,post)
    document.getElementById("btnEditar-"+idEditarGuardar.slice(12, 32)).style.display = 'inline';
    document.getElementById("btnEliminar-"+idEditarGuardar.slice(12, 32)).style.display = 'none';
}
