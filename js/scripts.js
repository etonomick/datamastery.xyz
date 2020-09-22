let name = document.getElementById('name')
let contact = document.getElementById('contact')
let task = document.getElementById('task')
let button = document.getElementById('submit')
let message = document.getElementById('message')
let labels = document.getElementsByName('label')

function submit() {
	disable()
	message.style.display = 'block'
	message.innerText = 'Отправка...'
	fetch('https://api.datamastery.xyz/.netlify/functions/lambda/task', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name.value,
			contact: contact.value,
			task: task.value
		})
	}).then(data => {
		return data.json()
	}).then(response => {
		enable()
		if (response.errors.length > 0) {
			display(response.errors[0].message, true)
		}
		else {
			display('Заявка отправлена, свяжемся с вами в течение часа', false)
			gtag_report_conversion('https://datamastery.xyz')
		}
	}).catch(error => {
		enable()
		display(error, true)
	})
}

function display(text, error) {
	contact.style.border = error ? '#f44336 2px solid' : 'none'
	button.style.display = error ? 'block' : 'none'
	message.style.display = 'block'
	message.style.color = error ? '#f44336' : '#4caf50'
	message.innerText = text
}

function disable() {
	for (let label of labels) {
		label.style.opacity = '.3'
	}
	name.setAttribute('disabled', true)
	contact.setAttribute('disabled', true)
	task.setAttribute('disabled', true)
	button.setAttribute('disabled', true)
}

function enable() {
	for (let label of labels) {
		label.style.opacity = '1'
	}
	name.removeAttribute('disabled')
	contact.removeAttribute('disabled')
	task.removeAttribute('disabled')
	button.removeAttribute('disabled')
}
