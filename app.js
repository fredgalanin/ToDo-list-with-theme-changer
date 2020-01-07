const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];



(function(arrOfTasks) {
const themes = {
  default: {
    '--base-text-color': '#212529',
    '--header-bg': '#007bff',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#007bff',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#0069d9',
    '--default-btn-border-color': '#0069d9',
    '--danger-btn-bg': '#dc3545',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#bd2130',
    '--danger-btn-border-color': '#dc3545',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#80bdff',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },
  dark: {
    '--base-text-color': '#212529',
    '--header-bg': '#343a40',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#58616b',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#292d31',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#b52d3a',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#88222c',
    '--danger-btn-border-color': '#88222c',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
  light: {
    '--base-text-color': '#212529',
    '--header-bg': '#fff',
    '--header-text-color': '#212529',
    '--default-btn-bg': '#fff',
    '--default-btn-text-color': '#212529',
    '--default-btn-hover-bg': '#e8e7e7',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#f1b5bb',
    '--danger-btn-text-color': '#212529',
    '--danger-btn-hover-bg': '#ef808a',
    '--danger-btn-border-color': '#e2818a',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
};

const lastSelectedTheme = 'default';

//определим все элементы DOM
const taskList = document.querySelector('.list-group');
const form = document.forms['addTask'];
const taskTitle = form.elements.title;
const taskBody = form.elements.body;
const addTaskBtn = document.querySelector('.btn-primary');
const themeSelect = document.getElementById('themeSelect');
themeSelect.addEventListener('change', onThemeSelectHandler);


//получить из массива объект в нужной форме
const taskObj = tasks.reduce((acc, val) => {
    acc[val._id] = val;
    
    return acc;
 },{})

 addTaskBtn.addEventListener('click', addTaskSubmit);
 taskList.addEventListener('click', deletBtnHandler)
 taskListInit(taskObj)

//функция инит
 function taskListInit(tasks) {
if (!tasks) {
  console.log('error')
}

const fragment = document.createDocumentFragment();

Object.values(tasks).forEach(task => {
  const item = createTaskBlock(task);
  fragment.appendChild(item);
  console.log(item);
})
taskList.appendChild(fragment);

}

//добовлять задания из массива в список
function createTaskBlock(taskTemplate) {
  const taskBlock = document.createElement('li');
  const taskTitle = document.createElement('span');
  const delButton = document.createElement('button');
  const taskBody = document.createElement('p');

  taskBlock.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
  delButton.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
  taskBody.classList.add('mt-2', 'w-100');
  
  taskTitle.innerText = taskTemplate.title;
  delButton.innerText = 'Delete';
  taskBody.innerText = taskTemplate.body;
  taskBlock.dataset.taskId = taskTemplate._id;

  taskBlock.appendChild(taskTitle);
  taskBlock.appendChild(delButton);
  taskBlock.appendChild(taskBody);
  
  return taskBlock;

}

//добовлять новые задания в массив
function addNewTask(title, body) {
  const id = Math.random()*10;
  const newTask = {
    _id: id,
    completed: false,
    title,
    body,
  }
  taskObj[newTask._id] = newTask;

  return newTask;

}

//оброботчик событий на кнопку добавить
function addTaskSubmit(e) {
  e.preventDefault();
  let taskTitleValue = taskTitle.value;
  let taskBodyValue = taskBody.value;
  
  if (!taskTitleValue && !taskBodyValue) {
    alert('add values');
    return
  }

  const newTaskTemplate = addNewTask(taskTitleValue, taskBodyValue);
  const newTaskBlock = createTaskBlock(newTaskTemplate);
  taskList.insertAdjacentElement('afterbegin', newTaskBlock);
  form.reset();
}

//навесить обработчик событий на кнопку удалить
function deletBtnHandler({target}) {
  if (target.classList.contains('delete-btn')) {
    const parent = target.closest('.list-group-item');
    const id = parent.dataset.taskId;
    const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);


  }
}

 //проверка намерения удалить
 function deleteTask(id) {
  const isConfirm = confirm('to delete?')
  if (isConfirm) return isConfirm;
  delete objOfTasks[id];
  return isConfirm;
}

//удаление блока
function deleteTaskFromHTML(status, el) {
  if (!status) return;
  el.remove();}


function onThemeSelectHandler(e) {
  const selectedTheme = themeSelect.value;
  const isConfirmed = confirm(`Sure to change ${selectedTheme}?`);
  if (!isConfirmed) {
    themeSelect.value = lastSelectedTheme;

    return
  };
  setTheme(selectedTheme);
  lastSelectedTheme = selectedTheme;
}

function setTheme(name) {
  const selectedThemObj = themes[name];
  Object.entries(selectedThemObj).forEach(([key,value]) => {
  document.documentElement.style.setProperty(key, value);
  })
}

taskListInit(tasks);
})(tasks);
