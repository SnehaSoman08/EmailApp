let sentMails = [];
let draftMails = [];


function composeEmail() {
  document.getElementById('composeModal').style.display = 'block';
  document.getElementById('composeButton').style.display = 'none';
  document.getElementById('viewdrafts').style.display = 'none';
  document.getElementById('noMails').style.display = 'none';
  document.getElementById('sentMails').style.display = 'none';
  



}


function saveDraft() {
  let from = document.getElementById('composeFrom').value;
  let to = document.getElementById('composeTo').value;
  let message = document.getElementById('composeMessage').value;

  draftMails.push({from, to, message});
  alert('Email saved to draft!');
  document.getElementById('composeModal').style.display = 'none';
  document.getElementById('composeButton').style.display = 'none';
  document.getElementById('viewdrafts').style.display = 'block';

}


function sendEmail() {
  let from = document.getElementById('composeFrom').value;
  let to = document.getElementById('composeTo').value;
  let message = document.getElementById('composeMessage').value;

  sentMails.push({from, to, message});
  alert('Email sent!');
  document.getElementById('composeModal').style.display = 'none';
  document.getElementById('composeButton').style.display = 'block';
  showSentMails();
}


function saveDraftFromEdit() {
  let message = document.getElementById('editMessage').value;
  draftMails.push({from: document.getElementById('editFrom').value, to: document.getElementById('editTo').value, message});
  alert('Email saved to draft!');
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('viewdrafts').style.display = 'block';

}


function sendEmailFromEdit() {
  let message = document.getElementById('editMessage').value;
  sentMails.push({from: document.getElementById('editFrom').value, to: document.getElementById('editTo').value, message});
  alert('Email sent!');
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('viewdrafts').style.display = 'none';
  document.getElementById('sentMails').style.display = 'block';
  document.getElementById('composeButton').style.display = 'block';

  showSentMails();
}


function showSentMails() {
  let sentMailsList = document.getElementById('sentMails');
  sentMailsList.innerHTML = '';
  sentMails.forEach(mail => {
    let li = document.createElement('li');
    li.textContent = `From: ${mail.from}, To: ${mail.to}, Message: ${mail.message}`;
    sentMailsList.appendChild(li);
  });
  document.getElementById('noMails').style.display = 'none';
  document.getElementById('sentMails').style.display = 'block';
  document.getElementById('draftMails').style.display = 'none';
  document.getElementById('composeButton').style.display = 'block';
}


function showDrafts() {
  let draftMailsList = document.getElementById('draftMails');
  draftMailsList.innerHTML = '';

  if (draftMails.length === 0) {
    let message = document.createElement('li');
    message.textContent = "Nothing in drafts";
    draftMailsList.appendChild(message);
    return;
  }

  draftMails.forEach((mail, index) => {
    let li = document.createElement('li');
    li.textContent = `From: ${mail.from}, To: ${mail.to}, Message: ${mail.message}`;
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.backgroundColor = '#738bd0';
    editButton.style.padding = '5px';
    editButton.style.width = '80px';
    editButton.style.borderRadius = '5px';
    editButton.style.marginRight = '20px';
    editButton.onclick = function() { editDraft(index); };
    let sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.marginRight = '50px';
    sendButton.style.backgroundColor = '#738bd0';
    sendButton.style.padding = '5px';
    sendButton.style.width = '80px';
    sendButton.style.borderRadius = '5px';
    sendButton.onclick = function() { sendDraft(index); };
    li.appendChild(editButton);
    li.appendChild(sendButton);
    draftMailsList.appendChild(li);

  });
  document.getElementById('noMails').style.display = 'none';
  document.getElementById('sentMails').style.display = 'none';
  document.getElementById('draftMails').style.display = 'block';
 
}


function editDraft(index) {
  let mail = draftMails[index];
  document.getElementById('editFrom').value = mail.from;
  document.getElementById('editTo').value = mail.to;
  document.getElementById('editMessage').value = mail.message;
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('viewdrafts').style.display = 'none';
  document.getElementById('draftMails').style.display = 'none';

}


function sendDraft(index) {
  let mail = draftMails[index];
  sentMails.push(mail);
  draftMails.splice(index, 1);
  alert('Email sent!');
  showDrafts();
}

if (sentMails.length > 0) {
  showSentMails();
}
