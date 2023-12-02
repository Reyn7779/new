
  // Event listener for DOMContentLoaded to load saved data
  document.addEventListener('DOMContentLoaded', function() {
    loadComments();
    loadNameAndColor();
  });

  function submitComment() {
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const nameColor = document.getElementById('nameColor').value;

    if (name && comment) {
      localStorage.setItem('name', name);
      localStorage.setItem('nameColor', nameColor);

      const commentsContainer = document.getElementById('comments-container');
      const timestamp = new Date().getTime(); // Unique identifier for each comment

      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.setAttribute('data-timestamp', timestamp);
      commentDiv.innerHTML = `
        <strong style="color: ${nameColor};">${name}</strong>
        <p>${comment}</p>
        <button onclick="deleteComment(${timestamp})">Delete</button>
      `;

      commentsContainer.appendChild(commentDiv);
      saveComments();
      document.getElementById('comment').value = '';
    } else {
      alert('Please fill in both fields.');
    }
  }

  function deleteComment(timestamp) {
    if (confirm('Are you sure you want to delete this comment?')) {
      const commentsContainer = document.getElementById('comments-container');
      const commentDiv = commentsContainer.querySelector(`div[data-timestamp="${timestamp}"]`);
      if (commentDiv) {
        commentsContainer.removeChild(commentDiv);
        saveComments();
      }
    }
  }

  function saveComments() {
    const commentsContainer = document.getElementById('comments-container');
    localStorage.setItem('comments', commentsContainer.innerHTML);
  }

  function loadComments() {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      document.getElementById('comments-container').innerHTML = savedComments;
      setupDeleteButtons();
    }
  }

  function loadNameAndColor() {
    const savedName = localStorage.getItem('name');
    const savedColor = localStorage.getItem('nameColor');

    if (savedName) {
      document.getElementById('name').value = savedName;
    }
    if (savedColor) {
      document.getElementById('nameColor').value = savedColor;
    }
  }

  function setupDeleteButtons() {
    const commentsContainer = document.getElementById('comments-container');
    const deleteButtons = commentsContainer.querySelectorAll('button');
    deleteButtons.forEach(button => {
      const timestamp = button.parentElement.getAttribute('data-timestamp');
      button.onclick = function() { deleteComment(timestamp); };
    });
  }
