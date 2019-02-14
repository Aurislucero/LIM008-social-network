import { eliminarMensajeConClick,editarMensajeConClick, editarGuardarMensajeConClick,likesConClick  } from '../view-controller.js';
import { obtenerPost} from '../controller/publicacion.js';

export const cargarMiPerfil = () => {
  const miPerfil = document.createElement('div');
  const usuario = firebase.auth().currentUser;
  const datosUsuario = `
     <div class="miPerfil">
       <h4>MI PERFIL</h4>
       <h3 id="id-nombre">${usuario.displayName}</h3>
       <img class="foto-perfil" src="${usuario.photoURL}" alt="perfil">
     </div>
     <div id = "contenedor-perfil">
     </div>
  `;
  miPerfil.innerHTML = datosUsuario;
  obtenerPost(templateContenedorPerfil);
  return miPerfil;
};

export const templateContenedorPerfil = (data)=>{
  const usuario = firebase.auth().currentUser;
  let listPublicaciones = '';
  data.forEach((doc)=>{
      if (doc.autor==usuario.displayName){
          const contenedorPost = `
          <div class="info-post">
              <p id ="id-contenedorPost" class ="contenedor-post">${doc.autor}</p>
              <textarea id ="btn-${doc.id}" class ="contenedor-mensaje" readonly>${doc.mensaje}</textarea>
              <p id="id-privacidad">${doc.privacidad}</p>
              <p id ="id-fecha" class ="contenedor-post" >${doc.fecha}</p>
              <div>
              <button type="button" id ="btnEditar-${doc.id}" class="btn-editar">Editar</button>
              <button type="button" id ="btnEliminar-${doc.id}" class="btn-GuardarCambios">Guardar</button>
              <img src="img/garbage.png" id ="${doc.id}" class="btn-eliminar" alt = "eliminar">
              <img src="img/like.png" id ="${doc.id}" class="btn-like" data-like=${doc.like} alt = "like">
              <label id="contenedor-like">${doc.like}</label>
              </div>
          </div>
          `;
          listPublicaciones +=contenedorPost;
      };
  });
  const contenedorPerfil = document.getElementById('contenedor-perfil');
  contenedorPerfil.innerHTML = listPublicaciones;
  [...document.getElementsByClassName('btn-eliminar')].forEach(function(btnEliminar){
      btnEliminar.addEventListener("click", eliminarMensajeConClick);
  });
  [...document.getElementsByClassName('btn-editar')].forEach(function(btnEditar){
      btnEditar.addEventListener('click', editarMensajeConClick);
  });

  [... document.getElementsByClassName('btn-like')].forEach((btnLike)=>{
      btnLike.addEventListener('click',(e)=>{ 
              let likes = parseInt(e.target.dataset.like);
              likes++;  
              likesConClick(e.target.id , likes);         
      });
  });
  [...document.getElementsByClassName('btn-GuardarCambios')].forEach(function(btnEditarGuardar){
      btnEditarGuardar.addEventListener('click', editarGuardarMensajeConClick);
  });
};



