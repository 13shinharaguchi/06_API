$('.qiita_api').on("click", function () {
    const tag = $('#work_content').val()
    api_get(tag)
})



function api_get(tag) {
    $(function () {
        $.ajaxSetup({
            Headers: { Authorization: "Bearer " }
        });
        $.getJSON(`https://qiita.com/api/v2/items?page=1&per_page=10&query=tag:${tag}`, function (data) {
            console.log(data)
            let books = []
            for (var i = 0; i < data.length; i++) {
                console.log(data[i])
            }
           
            // let i = 2
            // const s = data[i].url
            // console.log(data[i].url)
            // $('#output').html(s)
        })
    })
}












// $ curl - H 'Authorization: Bearer 3ae6d110cc9ba668f0cbec2330e67b4e4a2bd09d' 'https://qiita.com/api/v2/items'