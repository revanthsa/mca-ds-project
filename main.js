document.querySelector("input[type='button']").addEventListener('click',()=>{
    console.log("TEst");
    document.querySelector("input[type='file']").click();
});
var songs = [];
document.querySelector("input[type='file']").addEventListener('change',()=>{
    let data = document.querySelector("input[type='file']").value.split('\\');
    let div = document.createElement("div");
    let text = document.createTextNode(data[data.length -1]);
    let audio = document.createElement("audio");
    console.log(text);
    audio.src = text;
    songs.push(audio);
    div.appendChild(text);
    div.appendChild(audio);
    audio.play();
    
    document.querySelector('.songs').appendChild(div);
});
//planned to add available songs