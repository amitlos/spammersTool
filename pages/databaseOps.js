document.addEventListener('DOMContentLoaded', function() {
    fetchContacts();
});

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
                let edit = row.insertCell(6);
                let del = row.insertCell(7);

                fname.textContent = contact.first_name;
                sname.textContent = contact.second_name;
                fathname.textContent = contact.fathers_name;
                citship.textContent = contact.citizenship;
                age.textContent = contact.age;
                email.textContent = contact.email;

                let updateButton = document.createElement('button');
                updateButton.textContent = 'Edit';
                updateButton.onclick = function () {
                    updateContact(contact);
                };
                
                edit.appendChild(updateButton);

                let delButton = document.createElement('button');
                delButton.textContent = 'Delete';
                delButton.onclick = function () {
                    deleteContact(contact._id);
                };
                
                del.appendChild(delButton);
            });
        })
        .catch(error => console.error('Error fetching contacts:', error));
};

function updateContact(contact)
{
    document.getElementById('editContactForm').style.display = 'initial';
    document.getElementById('edit_fname').setAttribute('value', contact.first_name);
    document.getElementById('edit_sname').setAttribute('value', contact.second_name);
    document.getElementById('edit_faname').setAttribute('value', contact.fathers_name);
    document.getElementById('edit_cit').setAttribute('value', contact.citizenship);
    document.getElementById('edit_age').setAttribute('value', contact.age);
    document.getElementById('edit_email').setAttribute('value', contact.email);

    document.getElementById('editContactForm').addEventListener('submit', function (event)
    {
        event.preventDefault();

        const formData = new FormData(event.target);
        const contactData = {};
        formData.forEach((value, key) => {
            contactData[key] = value;
        });

        fetch('http://localhost:3000/updateContact/' + contact._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            location.reload();
        })   
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Failed to edit contact.' + error;
            document.getElementById('message').style.color = 'red';
        });
    });

}

function deleteContact(id)
{
    httpstr = 'http://localhost:3000/deleteContact/' + id;
    console.log(httpstr);
    fetch(httpstr, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        location.reload();
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}

document.getElementById('addContactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way



    const formData = new FormData(event.target);
    const contactData = {};
    formData.forEach((value, key) => {
        contactData[key] = value;
    });

    fetch('http://localhost:3000/addContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('addContactForm').reset();
        document.getElementById('message').textContent = 'Contact added successfully!';
        document.getElementById('message').style.color = 'green';
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Failed to add contact.' + error;
        document.getElementById('message').style.color = 'red';
    });
});