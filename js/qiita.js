
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
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

$('.qiita_api').on("click", function () {
    const search = $('#search').val()
    const start_date = $('#start_date').val()
    const end_date = $('#end_date').val()
    const quantity = $('#quantity').val()
    const stocks = $('#stocks').val()
    const time = convertTimestampToDatetime()
    api_get(search, start_date, end_date, quantity, stocks, time)
})



function api_get(search, start_date, end_date, quantity, stocks, time) {
    $(function () {
        //ページ数と何個引っ張って来るかを設定する変数
        const page = 1
        $.ajaxSetup({
            Headers: { Authorization: "Bearer " }
        });
        $.getJSON(`https://qiita.com/api/v2/items?page=${page}&per_page=${quantity}&query=title:${search}+created%3A%3E%3D${start_date}+created%3A%3C%3D${end_date}+stocks:>=${stocks}`, function (data) {
            console.log(data)

            if (data.length === 0) {
                $('#top').html("検索なし")
            } else {


                //入れる箱を準備
                let qiita_box = [];

                //レスポンス（data）が配列なのでfor文で中身の回数繰り返しする
                for (var i = 0; i < data.length; i++) {
                    let title = data[i].title
                    let url = data[i].url
                    let like = data[i].likes_count
                    let stock = data[i].stocks_count
                    let tags_array = data[i].tags
                    let tags = [];
                    for (var r = 0; r < tags_array.length; r++) {
                        tags.push(tags_array[r].name)
                    }

                    console.log(tags)

                    qiita_box.push(
                        `
                    <div class="qiita_wrapper">
                    <p><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></p>
                    <div>タグ:${tags}</div>
                    <div>
                    <p>いいね数${like}</p>
                    <p>ストック数${stock}</p>
                    </div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${url}" width="${like * 8}px" height="${like * 8}px"/>
                    </div> 
                    `
                    )
                    $('#output').html(qiita_box)

                    //ライクが１０以上はfirebaseに保存する
                    if (like > 1) {
                        const postData = {
                            title: title,
                            url: url,
                            time: time,
                        };

                        addDoc(collection(db, "qiita_save"), postData);
                    }
                }
            }
        })
    })
}

$('#move').on("click", function () {
    location.href = '/html/qiita_list.html'
})
