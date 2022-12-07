$('.qiita_api').on("click", function () {
    const tag = $('#search').val()
    const page = 1
    const per_page = 5
    api_get(tag, page, per_page)
})



function api_get(tag, page, per_page) {
    $(function () {
        $.ajaxSetup({
            Headers: { Authorization: "Bearer " }
        });
        $.getJSON(`https://qiita.com/api/v2/items?page=${page}&per_page=${per_page}&query=title:${tag}`, function (data) {
            console.log(data)
            //入れる箱を準備
            let qiita_box = [];

            //レスポンス（data）が配列なのでfor文で中身の回数繰り返しする
            for (var i = 0; i < data.length; i++) {
                let title = data[i].title
                let url = data[i].url
                qiita_box.push(`<p><a href="${url}">${title}</p>`)
                $('#output').html(qiita_box)
                console.log(data[i])
            }
        })
    })
}
