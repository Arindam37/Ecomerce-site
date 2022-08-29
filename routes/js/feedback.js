showFeed();
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let feed=localStorage.getItem("feed");
    if (feed==null){
        feedObj=[];

    }
    else{
        feedObj=JSON.parse(feed);
    }
    feedObj.push(addTxt.value);
    localStorage.setItem("feed",JSON.stringify(feedObj));
    addTxt.value="";
   //
    console.log(feedObj);
    showFeed();
})
function showFeed(){
    let feed=localStorage.getItem("feed");
    if (feed==null){
        feedObj=[];

    }
    else{
        feedObj=JSON.parse(feed);
    }

    let html="";
    feedObj.forEach(function(element,index){
        html+=`
        <div class="notecard my-2  mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Feed ${index+1}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteFeed(this.id)" class="btn btn-primary">delete post</button>
        </div>
    </div>
        `;
        
    });
    let notesElm=document.getElementById('feed');
        if (feedObj.length!=0){
            notesElm.innerHTML=html;
        }
        else{
            notesElm.innerHTML=`Be the first to post!`;
        }
    
 
}
function deleteFeed(index){
 
    let feed=localStorage.getItem("feed");
    if (feed==null){
        feedObj=[];

    }
    else{
        feedObj=JSON.parse(feed);
    }
    feedObj.splice(index,1);
    localStorage.setItem("feed",JSON.stringify(feedObj));
    showFeed();

}