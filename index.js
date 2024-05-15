import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnNly97tW1liyhFIYqZZcsFr-8DcUprSQ",
  authDomain: "testapp-d7e5a.firebaseapp.com",
  projectId: "testapp-d7e5a",
  storageBucket: "testapp-d7e5a.appspot.com",
  messagingSenderId: "964028936081",
  appId: "1:964028936081:web:b84afb7ccd18d9c089f430"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log(db);

const todoCollection = collection(db, 'todos');




let input = document.querySelector('#toDoInput');
let button = document.querySelector('#addButton');
let list = document.querySelector('#toDoList');
let arr = [];

button.addEventListener('click', async function() {
  console.log(db);
  const task = input.value.trim();
  if (!task) {
    alert('Please enter a task');
    return;
  }

  
  try {
    const docRef = await addDoc(todoCollection, { task });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  const li = document.createElement('li');
  li.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async function() { 
   
    try {
      await deleteDoc(doc(db, 'todos', this.parentElement.getAttribute('data-id')));
      list.removeChild(this.parentElement);
      console.log("Document successfully deleted!");
    } catch (e) {
      console.log("Error removing document: ", e);
    }
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', async function() { 
    const newTask = prompt('Edit:', this.parentElement.childNodes[0].textContent);
    if (newTask) {
      this.parentElement.childNodes[0].textContent = newTask;
      
      try {
        await updateDoc(doc(db, 'todos', this.parentElement.getAttribute('data-id')), { task: newTask });
        console.log("Document successfully updated!");
      } catch (e) {
        console.log("Error updating document: ", e);
      }
    }
  });

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  list.appendChild(li);

  input.value = '';
});


async function displayTodos() {
  const querySnapshot = await getDocs(todoCollection);
  querySnapshot.forEach(doc => {
    const task = doc.data().task;
    const li = document.createElement('li');
    li.textContent = task;
    li.setAttribute('data-id', doc.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async function() { 
      try {
        const docId = this.parentElement.getAttribute('data-id');
        await deleteDoc(doc(db, 'todos', docId));
        this.parentElement.remove(); 
        console.log("Document successfully deleted!");
      } catch (e) {
        console.log("Error removing document: ", e);
      }
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', async function() { 
      const newTask = prompt('Edit:', this.parentElement.childNodes[0].textContent);
      if (newTask) {
        this.parentElement.childNodes[0].textContent = newTask;
        
        try {
          await updateDoc(doc(db, 'todos', this.parentElement.getAttribute('data-id')), { task: newTask });
          console.log("Document successfully updated!");
        } catch (e) {
          console.log("Error updating document: ", e);
        }
      }
    });

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    list.appendChild(li);
  });
}

displayTodos();