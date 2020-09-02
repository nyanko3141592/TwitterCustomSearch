let log_num = 10;
let links = new Array(log_num);
window.onload = function () {
    for (let i = 0; i < log_num; i++) {
        links[i] = localStorage.getItem("link" + i);
        let target = document.getElementById("link" + i);
        console.log(target, links);
        if (links[i] !== null) {
            target.innerText = decodeURI(links[i].slice(29));
            target.href = links[i];
        } else {
            target.href = "";
        }
        console.log(links[i]);
    }
    console.log(links);
};

function addLink(url) {
    links = [url].concat(links.slice(0,log_num - 1));
    console.log(links);
    for (let i = 0; i < log_num; i++) {
        localStorage.setItem("link" + i, links[i]);
        let target = document.getElementById("link" + i);
        if (links[i] !== null) {
            target.innerText = decodeURI(links[i].slice(29));
            target.href = links[i];
        } else {
            target.innerText = "NO LINK";
            target.href = "";
        }
    }
}

function SearchButtonClick() {
    let search_link = "https://twitter.com/search?q=";
    $(function () {
        let keyword;
        let keyword_len = $('#input_keyword input').length / 4;
        let arr = new Array(15).fill(false);
        let num = -1;
        num += 1;
        // keyword
        for (let i = 1; i <= keyword_len; i++) {
            keyword = document.querySelector(`#input_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(keyword);
            if (keyword !== "") {
                search_link += encodeURI(`"${keyword}"` + " ");
                arr[num] = true;
                console.log(num, arr);
            }
        }
        console.log(search_link);
        // not_keyword
        keyword_len = $('#input_not_keyword input').length / 4;
        console.log("non keyword", keyword_len);
        num += 1;
        for (let i = 1; i <= keyword_len; i++) {
            keyword = document.querySelector(`#input_not_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(keyword);
            if (keyword !== "") {
                search_link += encodeURI(`-"${keyword}"` + " ");
                arr[num] = true;
            }
        }
        console.log(search_link);
        // or_keyword
        keyword_len = $('#input_or_keyword input').length / 4;
        console.log("or keyword", keyword_len);
        num += 1;
        let counter = 0;
        search_link += "(";
        for (let i = 1; i <= keyword_len; i++) {
            keyword = document.querySelector(`#input_or_keyword:nth-child(${i}) > input.form-control`).value;
            console.log(i, keyword);
            if (keyword !== "") {
                search_link += encodeURI(`"${keyword}"`);
                if (i !== keyword_len) {
                    search_link += " OR ";
                    counter += 1;
                }
                arr[num] = true;
            }
            console.log(search_link);
        }
        num += 1;
        search_link += ")";
        if (counter === 0) {
            search_link = search_link.substr(0, search_link.length - 2);
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("hashtag").value;
        if (keyword !== "") {
            search_link += `(%23${encodeURI(keyword)}) `;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("at-username").value;
        if (keyword !== "") {
            search_link += `(%40${encodeURI(keyword)}) `;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("from-username").value;
        if (keyword !== "") {
            search_link += `(from%3A${encodeURI(keyword)}) `;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("since-date").value;
        if (keyword !== "") {
            search_link += `since%3A${keyword.substr(0, 4)}-${keyword.substr(4, 2)}-${keyword.substr(6, 2)}%20`;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("until-date").value;
        if (keyword !== "") {
            search_link += `until%3A${keyword.substr(0, 4)}-${keyword.substr(4, 2)}-${keyword.substr(6, 2)}%20`;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("min-faves").value;
        if (keyword !== "") {
            search_link += `min_faves%3A${keyword}%20`;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        keyword = document.getElementById("min-rts").value;
        if (keyword !== "") {
            search_link += `min_retweets%3A${keyword}%20`;
            arr[num] = true;
        }

        console.log(search_link);
        num += 1;
        keyword = document.getElementById("min-reps").value;
        if (keyword !== "") {
            search_link += `min_replies%3A${keyword}%20`;
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        if (document.getElementById("link-radio-2").checked) {
            search_link += "filter%3Alinks%20";
            arr[num] = true;
        } else if (document.getElementById("link-radio-3").checked) {
            search_link += "-filter%3Alinks%20";
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        if (document.getElementById("ff-check").checked) {
            search_link += "&pf=on";
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        if (document.getElementById("rep-radio-2").checked) {
            search_link += "filter%3Areplies%20";
            arr[num] = true;
        } else if (document.getElementById("rep-radio-3").checked) {
            search_link += "-filter%3Areplies%20";
            arr[num] = true;
        }
        console.log(search_link);
        num += 1;
        if (document.getElementById("show-radio-2").checked) {
            search_link += "&f=live";
            arr[num] = true;
        } else if (document.getElementById("show-radio-3").checked) {
            search_link += "&f=image";
            arr[num] = true;
        }else if (document.getElementById("show-radio-4").checked) {
            search_link += "&f=video";
            arr[num] = true;
        }
        console.log(arr);
        console.log(search_link);
        let need_el_arr = [arr[0]].concat(arr.slice(2, 7));
        console.log(need_el_arr);
        let count = need_el_arr.filter(function (x) {
            return x === true
        }).length;
        if (count === 0) {
            console.log(arr);
            arr.indexOf(true);
            alert('検索要素が足りません');
        } else {
            window.open(search_link, 'search_result', `width=600, height=${window.outerHeight }, location=1, resizable=1, toolbar=0`);
            addLink(search_link);
            console.log(search_link);
        }
    });
}