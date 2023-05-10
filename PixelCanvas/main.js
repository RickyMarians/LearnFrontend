const container = document.querySelector('.container')
const sizeElement = document.querySelector('.size')
let size = sizeElement.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')

let draw = false
function populate(size){
    container.style.setProperty('--size', size)
    for (i=0;i < size * size; i++){
        const div = document.createElement('div')
        div.classList.add('pixel')
        div.addEventListener('mouseover', function(){
            if(!draw) return
            div.style.backgroundColor = color.value
        })
        div.addEventListener('mousedown', function(){
            div.style.backgroundColor = color.value
        })
        container.appendChild(div)
    }

}
function reset(){
    container.innerHTML=''
    populate(size)
}
window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

resetBtn.addEventListener('click', reset)

sizeElement.addEventListener('change',function(){
    size = sizeElement.value
    reset()
})
populate(size)