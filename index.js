let input = document.querySelector('#toDoInput');
let button = document.querySelector('#addButton');
let list = document.querySelector('#toDoList');
let arr = [];

button.addEventListener('click', function() {
  const task = input.value.trim();
  if (!task) {
    alert('Please enter a task');
    return;
  }


  const li = document.createElement('li');
  li.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() { 
    const index = arr.indexOf(li.textContent);
    arr.splice(index, 1);
    list.removeChild(li);
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() { 
    const newTask = prompt('Edit:', li.childNodes[0].textContent);
    if (newTask) {
      li.childNodes[0].textContent = newTask;
      arr[arr.indexOf(li.textContent)] = newTask;
      
    }
  });

  
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  list.appendChild(li);

  arr.push(task);
  input.value = '';
});