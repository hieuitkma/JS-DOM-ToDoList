//focus
let userInput = document.querySelector('#nhap input');
let addBtn = document.querySelector('#nhap button');
let checkBtn = document.querySelectorAll('ul li input');
let editBtn = document.querySelectorAll('ul li .edit');
let deleteBtn = document.querySelectorAll('ul li .delete');
let ulTag = document.querySelector('ul');

//set data
let data;



if(JSON.parse(localStorage.getItem('data')) == null) {
    data = [];
}else {
    data = JSON.parse(localStorage.getItem('data'));
}



// Show note
function render() {
    // let data = JSON.parse(localStorage.getItem('data'));
    if(JSON.parse(localStorage.getItem('data')).length > 0) {
        document.querySelector('#null').style.display = 'none';
    }
    let content = data.map(item => {
        let checked = '';
        let classLabel = ''
        if(item.isCompleted == true) {
            checked = 'checked';
            classLabel += 'completed';
        }
        return `<li>
                    <input type="checkbox" ${checked}>
                    <label class='${classLabel}'>${item.name}</label>
                    <i class="fa fa-edit edit"></i>
                    <i class="fa fa-trash delete"></i>
                </li>`
    }).join('')
    ulTag.innerHTML = content;
}
render();

// ADD note
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // if(JSON.parse(localStorage.getItem('data')).length > 0) {
//     document.querySelector('#null').style.display = 'none';
// }
    if(userInput.value == '') {
        alert(`Don't add item. Please input !!!`);
    } else {
        data.push(
            {
                name: userInput.value,
                isCompleted : false
            }
        );
        localStorage.setItem('data', JSON.stringify(data));
        
        render();
        userInput.value = '';
        deleteBtn = document.querySelectorAll('ul li .delete');
        checkBtn = document.querySelectorAll('ul li input');
        editBtn = document.querySelectorAll('ul li .edit');
        deleteNote();
        location.reload(true);
    }
})

// DELETE Note
function deleteNote() {
    deleteBtn = document.querySelectorAll('ul li .delete');
    Array.from(deleteBtn).forEach((item, index) => {
        item.addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem('data'));
            data.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(data));
            render();
            location.reload(true);
        })
    })
}
deleteNote();

// Check note
function checkNote() {
    checkBtn = document.querySelectorAll('ul li input');
    Array.from(checkBtn).forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if(e.target.checked == true) {
                let data = JSON.parse(localStorage.getItem('data'));
                data[index].isCompleted = true;
                localStorage.setItem('data', JSON.stringify(data));
                item.isCompleted = true;
            }
            else {
                let data = JSON.parse(localStorage.getItem('data'));
                data[index].isCompleted = false;
                localStorage.setItem('data', JSON.stringify(data));
                item.isCompleted = false;
            }
            render();
            window.location.reload(true); 
        })
    })
}
checkNote();
var btn = document.querySelectorAll('.btn');
btn[1].addEventListener('click', () => {
    btn[0].classList.remove('default');
    btn[1].classList.add('default');
})