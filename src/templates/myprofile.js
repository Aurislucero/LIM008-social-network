export const cargarMiPerfil = () => {
    const miPerfil = document.createElement('div');
    const datosUsuario = `
       <div>
       
         <h4>Aqui van los datos del usuario</h4>
         <p>Hola Hola</p>
         <h4>Aqui van los datos del usuario</h4>
         <p>Hola Hola</p>
         <h4>Aqui van los datos del usuario</h4>
         <p>Hola Hola</p>
         <h4>Aqui van los datos del usuario</h4>
       </div>
    `;
    miPerfil.innerHTML = datosUsuario;
    return miPerfil;
};