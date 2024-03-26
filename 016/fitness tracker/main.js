const tracks = document.querySelectorAll('.circle');
const sliders = document.querySelectorAll('.sliders input');

sliders.forEach((slider , index)=>{
    slider.addEventListener('input', () => {
        const percentage = slider.value;
        const r = tracks[index].getAttribute('r');
        tracks[index].setAttribute('stroke-dasharray',`${calStrokeDashArray(percentage,r)} 1000`);
    });
});


function calStrokeDashArray(percentage,r){
    const circumference = Math.PI *2 *r;
    return `${circumference * percentage /100}`
   }
      