
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

function convertTimestampToDatetime(timestamp) {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "qiita_save"), orderBy('time', 'asc'))
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