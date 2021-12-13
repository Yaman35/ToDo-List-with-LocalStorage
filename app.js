const input = document.querySelector('input'); 
const addBtn = document.querySelector('.add-btn'); 
const deleteAll = document.querySelector('.delete-btn'); 
const div_ol = document.querySelector('.tasks');
const ol = document.querySelector('ol');
const span1 = document.querySelector('#span1');
const span2 = document.querySelector('#span2');

setInterval(times, 1000);

function times() {
  let tarih = new Date();
  let locale = tarih.toLocaleDateString();
  let time = tarih.toLocaleTimeString();

  span1.textContent = locale;
  span2.textContent = time;
}
//let counter = 0;

function createTask(id, text, date){
    return{
        id,
        text,
        date,
    }
}
let tasks = [];
// console.log(JSON.parse(localStorage.getItem('tasks')).length);

const getTasks = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // console.log(tasks);

    tasks.map(task => {
    //   console.log(task);
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.innerHTML += ` <div id="firstDiv" key="${task.id}"> 
                        <span>${task.text}</span>
                        <span>
                        <button type="button" class="btn"><i class="far fa-check-circle"></i></button>
                        <button type="button" class="btn"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn"><i class="fas fa-trash-alt"></i></button>
                        </span>
                     </div>
                    <div> ${task.date} </div>
  `;
      let ol = document.querySelector('ol');
      ol.appendChild(li);
      input.value = '';
    });
  } else {
    tasks = [];
  }
}

window.onload = () => getTasks();

function addTask() {
  if (!input.value) {
    alert('You should write a task to add !');
  }

  let id = Math.floor(Math.random() * 1000);
//   console.log(id);

  let text = input.value;

  let tarih = new Date();
  let locale = tarih.toLocaleDateString();
  let time = tarih.toLocaleTimeString();
  let date = `${locale} - ${time}`;
//   console.log(date)

  const newTask = createTask(id , text, date);
//   console.log(newTask)

  tasks.push(newTask);
//   console.log(tasks)

  localStorage.setItem("tasks", JSON.stringify(tasks));

  const li = document.createElement('li');
  li.classList.add('task-item');

  li.addEventListener('mouseover', function () {
    li.style.cursor = 'pointer';
    li.style.opacity = '0.8';
  });

  li.addEventListener('mouseout', function () {
    li.style.opacity = '1';
  });
  


  li.innerHTML += ` <div id="firstDiv"> 
                        <p>${text}</p>
                        <div>
                        <button type="button" class="btn"><i class="far fa-check-circle"></i></button>
                        <button type="button" class="btn"><i class="fas fa-edit"></i></button>
                        <button id="delete" type="button" class="btn"><i class="fas fa-trash-alt"></i></button>
                        </div>
                     </div>
                    <div> ${date} </div>
  `;
  
    let ol = document.querySelector('ol');
    ol.appendChild(li);
    input.value = '';
}




// Add task

addBtn.addEventListener('click', addTask);

input.addEventListener('keyup', function (event) {
  // Butonun eventlarina keyup (klavyeden tusa basilma) eventi ekleniyor
  if (event.code === 'Enter') {
    // Eğer kullanıcının input code 'Enter' ise, yani Enter tusuna basarsa
    event.preventDefault(); // Öncelikle bunun default fonksiyonunu engelle
    addBtn.click(); // Butonun click() fonksiyonunu çağır,yani sanki kullanıcı butona basıyormuş gibi
    input.value = ''; // Ve her seferinde input içini temizle
  }
});

// Delete a task

// console.log(document.querySelectorAll('.fa-trash-alt'));
// document.querySelectorAll('.fa-trash-alt').forEach(trash => {
// console.log(trash);
//   trash.addEventListener('click', () => {
//     removeTask(trash);
//   });
// });

ol.addEventListener('click', (event) => {
    if (event.target.className === 'fas fa-trash-alt') {
    // console.log(event.target.closest('li').firstElementChild.getAttribute('key'));
    
    let confirmation = confirm('Are you sure you want to delete?');
    confirmation ? event.target.closest('li').remove() : null;  

    let id = event.target.closest('li').firstElementChild.getAttribute('key');
    console.log(id)
    tasks.forEach((task, index) => {
      if(task.id == id){
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    })
    }
    
    if (event.target.className === 'fas fa-edit') {
    event.target.setAttribute('class', 'fas fa-thumbs-up');
    event.target.closest('li').firstElementChild.contentEditable = true;
    event.target.closest('li').firstElementChild.children[0].style.backgroundColor = 'white';
    event.target.closest('li').firstElementChild.style.width = '100%';
    event.target.parentElement.children[0].style.cursor = 'initial';
  } 
  else if (event.target.className === 'fas fa-thumbs-up') {
    event.target.setAttribute('class', 'fas fa-edit');
    event.target.closest('li').firstElementChild.contentEditable = false;
    event.target.closest('li').firstElementChild.children[0].style.backgroundColor = 'lightgreen';
      }

  if (event.target.className === 'far fa-check-circle') {
    // console.log(event.target.closest('li'));
    if (event.target.closest('li').classList.contains('checked')) {
      event.target.closest('li').classList.remove('checked');
      event.target.closest('li').style.backgroundColor = 'lightgreen';
         } 
    else {
      event.target.closest('li').classList.add('checked');
      event.target.closest('li').style.backgroundColor = 'rgb(139, 132, 132)';
      event.target.closest('li').classList.add('checked');
      event.target.closest('li').style.backgroundColor = 'rgb(139, 132, 132)';
    }
  }
})

const removeTask = trash => {
  confirm('Are you sure you want to remove?') ? trash.parentElement.parentElement.parentElement.remove() : null;
  getTasks();
};








/*
ol.addEventListener('click', event => {
  
  if (event.target.className === 'far fa-check-circle completed-item') {
    if (event.target.parentElement.children[0].classList.contains('checked')) {
      event.target.parentElement.children[0].classList.remove('checked');
      event.target.parentElement.children[0].style.backgroundColor = 'lightgreen';
      event.target.parentElement.parentElement.children[1].classList.remove('checked');
      event.target.parentElement.parentElement.style.backgroundColor = 'lightgreen';
    } else {
      event.target.parentElement.children[0].classList.add('checked');
      event.target.parentElement.children[0].style.backgroundColor = 'rgb(139, 132, 132)';
      event.target.parentElement.parentElement.children[1].classList.add('checked');
      event.target.parentElement.parentElement.style.backgroundColor = 'rgb(139, 132, 132)';
    }
  }
});*/

// Delete all task

function deleteAllTasks() {
  
  // console.log(document.querySelector('ol').children);
  //e.firstElementChild can be used.
  var child = ol.lastElementChild;
  while (child) {
    ol.removeChild(child);
    child = ol.lastElementChild;
  }
  localStorage.setItem("tasks", []);
  // confirmation ? document.querySelector('ol').children.() : null;  // Direk ul etiketinin tamamını sil dedik
  // input.value = ''; // Yine input içerisini resetledik
}

deleteAll.addEventListener('click', deleteAllTasks);
