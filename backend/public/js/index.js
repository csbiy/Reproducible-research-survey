
let figureForm = document.querySelector(".figureForm");
let surveyCnt =  document.querySelector("#surveyCnt");
const resetBtn =  document.querySelector("#resetBtn");
const submitBtn = document.querySelector("#submitBtn");

function addComment(){
  child = figureForm.firstElementChild.innerHTML;
  child = covertToMinusBtn(child);
  child = createElementFromHTML(child);
  figureForm.appendChild(child);
}
function covertToMinusBtn(child){
  child=child.replace("addComment()","deleteComment(this)");
  child=child.replace("plus","minus");
  child = "<div>"+ child + "</div>"
  return child;
}
function createElementFromHTML(htmlString){
  let div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function deleteComment(btn){
  btn.parentElement.parentElement.parentElement.remove();
}
function getAvg(list){
  let sum=0;
  list.map(i=>sum+=i);
  return Math.round(sum/list.length*100)/100;
}
function gotoErrorPosition(){
  this.scrollTo(0,250);
}
resetBtn.addEventListener("click",()=>{
   isCancel = confirm("정말 취소 하시겠습니까?");
   if(isCancel){
      document.querySelector(".formWrapper").reset();
   }else{
     return;
   }
});
submitBtn.addEventListener("click",()=>{
  if((nameCheck() && emailCheck())){
    alert("성함과 이메일을 입력해주세요.")
    gotoErrorPosition();
    return;
  }
  if (nameCheck()){
    alert("성함을 입력해주세요.")
    gotoErrorPosition();
  }else if(emailCheck()){
    alert("이메일을 입력해주세요.")
    gotoErrorPosition();
  }
  else{
    form = document.querySelector(".formWrapper");
    const formData = new FormData(form);
    axios("/survey",{
      method: 'post',
      url:"/survey",
      data: formData
    })
     .then(()=>{
        alert("제출되었습니다, 평가주셔서 감사합니다. ");  
        window.location.href="/";
     })
     .catch((error)=>{
       if(error) throw error;
     })
  }
})

axios.get("/survey")
  .then((res)=>{
    
     dto = res.data.scoreAvgAndTotalCntDto;
       const scoreAvgIndex = 0;
     const totalSurveyCntIndex= 1;
     scoreAvg = dto[scoreAvgIndex];
     chartDto = Object.values(scoreAvg);
     chartDto.push(getAvg(chartDto));
     createGph(chartDto);
     surveyCnt.textContent=dto[totalSurveyCntIndex].totalSurveyCnt;
  })
  .catch((fail)=>{
    if(fail) throw fail;
  });

