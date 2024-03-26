document.addEventListener('DOMContentLoaded', function() {
    fetchContacts();
});

const emails_to_send = {} 

function fetchContacts() {
    fetch('http://localhost:3000/getContacts')
        .then(response => response.json())
        .then(contacts => { 
            const contactTable = document.getElementById("contactTable");
            contacts.forEach( contact => {
                let row = contactTable.insertRow();
                let fname = row.insertCell(0);
                let sname = row.insertCell(1);
                let fathname = row.insertCell(2);
                let citship = row.insertCell(3);
                let age = row.insertCell(4);
                let email = row.insertCell(5);
                let checkbox = row.insertCell(6);

                fname.textContent = contact.first_name;
                sname.textContent = contact.second_name;
                fathname.textContent = contact.fathers_name;
                citship.textContent = contact.citizenship;
                age.textContent = contact.age;
                email.textContent = contact.email;

                let box = document.createElement('input');
                box.setAttribute('type', 'checkbox');
                box.setAttribute('name', 'checked'); 
                box.onclick = function () {
                    if (box.checked == true) 
                    {
                        emails_to_send[contact.email] = true;
                    }
                    else 
                    {
                        emails_to_send[contact.email] = false;
                    }
                };
                
                checkbox.appendChild(box);
            });
        })
        .catch(error => console.error('Error fetching contacts:', error));
};

document.getElementById('emailForm').addEventListener('submit', function() {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    var email_text = document.getElementById('customText').value;
    console.log(email_text);
    
    for(key in emails_to_send)
    {
        if(emails_to_send[key]) {
            
            fetch("http://localhost:3000/app/sendEmail", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: key,
                    subject: 'Subject',
                    text: email_text
                })
            })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error('Error:', error));
            

        }
    }
    

});

