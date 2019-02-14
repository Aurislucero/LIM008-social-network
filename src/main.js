import { initRouter } from './router.js';

const init = () => {
    const config = {
        apiKey: "AIzaSyAs6PO8-5P1Y3i_qX_jaXnUeF44OYmpgZc",
        authDomain: "lim008-social-network.firebaseapp.com",
        databaseURL: "https://lim008-social-network.firebaseio.com",
        projectId: "lim008-social-network",
        storageBucket: "lim008-social-network.appspot.com",
        messagingSenderId: "3950063519"
      };
      firebase.initializeApp(config);
    initRouter();
}
window.addEventListener('load', init)
