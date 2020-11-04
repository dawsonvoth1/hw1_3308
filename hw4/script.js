

var pageNum=1;
var numPerPage=0;
var totalPics=0;
var allPicSeen=false;

function makeApiCall(){
    var tags=document.getElementById("tagInput").value;
    var url=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2efdb49e077cbef83b28ae2551723e03&tags=${tags}&privacy_filter=1&safe_search=1&extras=url_sq&per_page=${numPerPage}&page=${pageNum}&format=json&nojsoncallback=1`;
    $.ajax({
        url: url
    }).then(function(data) {
        totalPics=Number(data.photos.total);
        if(totalPics < numPerPage*pageNum){
            numPerPage=totalPics-((pageNum-1)*numPerPage);
            allPicSeen=true;
        }
        var p1=`<div class="container row">`;
        var i;
        for(i=0; i<numPerPage; i++){
            if(i%4 == 0 && i != 0){
                p1=p1+`
                </div>
                <div class="container row">`;
            }
            var picHtml=`
            <div class="w-25 card">
                <img class="card-img-top" src="${data.photos.photo[i].url_sq}" alt="pic${i.toString()}">
                <div class="card-body">
                    <p class="card-text">${data.photos.photo[i].title}</p>
                </div>
            </div>`;
                p1=p1+picHtml;
        }
        p1=p1+`
        </div>`;
        console.log(pageNum);
        document.getElementById("pic__a").innerHTML=document.getElementById("pic__a").innerHTML+p1.toString();
        pageNum++;
        event.preventDefault();
    });
};

var submited=false;

$(document).ready(function() {
    $('#submitBtn').click(function(){
        numPerPage=Number(document.getElementById("numOfPics").value);
        pageNum=1;
        document.getElementById("pic__a").innerHTML='';
        makeApiCall();
        submited=true;
    });
    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0 && submited==true && allPicSeen==false) {
            makeApiCall();
        }
    });
});