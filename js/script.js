function SearchButtonClick() {
    let search_link = "https://twitter.com/search?q=";
    $(function () {
        let keyword_len = $('#input_keyword input').length / 4;
        console.log("keyword", keyword_len);
        for (let i = 1; i <= keyword_len; i++) {
            var keyword = document.querySelector(`#input_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(keyword);
            if (keyword !== "") {
                search_link += encodeURI(`"${keyword}"` + " ");
            }
        }
        console.log(search_link);
        keyword_len = $('#input_not_keyword input').length / 4;
        console.log("non keyword", keyword_len);
        for (let i = 1; i <= keyword_len; i++) {
            var keyword = document.querySelector(`#input_not_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(keyword);
            if (keyword !== "") {
                search_link += encodeURI(`-"${keyword}"` + " ");
            }
        }
        console.log(search_link);
        keyword_len = $('#input_or_keyword input').length / 4;
        console.log("or keyword", keyword_len);
        let counter = 0;
        search_link += "("
        for (let i = 1; i <= keyword_len; i++) {
            var keyword = document.querySelector(`#input_or_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(keyword);
            if (keyword !== "") {
                search_link += encodeURI(`"${keyword}"`);
                if (i != keyword_len) {
                    search_link += " OR "
                    counter += 1;
                }
            }
        }
        search_link += ")";
        if(counter == 0){
            search_link = search_link.substr( 0, search_link.length - 2 );
        }
        console.log(search_link);
        keyword = document.getElementById("hashtag").value;
        if (keyword !== "") {
            search_link += `(%23${encodeURI(keyword)}) `;
        }
        console.log(search_link);
        keyword = document.getElementById("at-username").value;
        if (keyword !== "") {
            search_link += `(%40${encodeURI(keyword)}) `;
        }
        console.log(search_link);
        keyword = document.getElementById("from-username").value;
        if (keyword !== "") {
            search_link += `(from%3A${encodeURI(keyword)}) `;
        }
        console.log(search_link);
        keyword = document.getElementById("since-date").value;
        if (keyword !== "") {
            search_link += `since%3A${keyword.substr( 0, 4 )}-${keyword.substr( 4, 2 )}-${keyword.substr( 6, 2 )}%20`;
        }
        console.log(search_link);
        keyword = document.getElementById("until-date").value;
        if (keyword !== "") {
            search_link += `until%3A${keyword.substr( 0, 4 )}-${keyword.substr( 4, 2 )}-${keyword.substr( 6, 2 )}%20`;
        }
        console.log(search_link);
        keyword = document.getElementById("min-faves").value;
        if (keyword !== "") {
            search_link += `min_faves%3A${keyword}%20`;
        }
        console.log(search_link);
        keyword = document.getElementById("min-rts").value;
        if (keyword !== "") {
            search_link += `min_retweets%3A${keyword}%20`;
        }
        console
        console.log(search_link);
        keyword = document.getElementById("min-reps").value;
        if (keyword !== "") {
            search_link += `min_replies%3A${keyword}%20`;
        }
        console.log(search_link);
        if (document.getElementById("link-radio-2").checked) {
            search_link += "filter%3Alinks%20"
        }else if(document.getElementById("link-radio-3").checked) {
            search_link += "-filter%3Alinks%20"
        }
        console.log(search_link);
        if (document.getElementById("rep-radio-2").checked) {
            search_link += "filter%3Areplies%20"
        }else if(document.getElementById("rep-radio-3").checked) {
            search_link += "-filter%3Areplies%20"
        }
        console.log(search_link);
        window.open(search_link, '_blank');
    });
}