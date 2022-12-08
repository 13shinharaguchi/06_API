
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "qiita_save"))
onSnapshot(q, (querySnapshot) => {
    console.log('単純に取得した状態のコンソール', querySnapshot.docs)

    //入れる配列準備
    const documents = []

    //回して配列にいれる、使える状態にする
    querySnapshot.docs.forEach(function (doc) {
        const document = {
            id: doc.id,
            data: doc.data(),
        };
        documents.push(document);
    })

    console.log('使える状態の配列になるか確かめのコンソール', documents);

    const htmlElements = [];
    documents.forEach(function (document) {
        htmlElements.push(`
    <li id="${document.id}">
        <p><a href="${document.data.url}" target="_blank" rel="noopener noreferrer">${document.data.title}</a></p>
    </li>
        `);
    });

    $("#output").html(htmlElements);

});

$('#move').on("click", function () {
    location.href = '/html/qiita.html'
})