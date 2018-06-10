'use strict'

const ipc = require('electron').ipcRenderer

function del() {
    document.getElementById('contentInput').value = ""
}

exports.save = () => {
    let title = document.getElementById('titleInput').value
    let content = document.getElementById('contentInput').value
    if (title === '') {
        alert('The title is required!')
        return
    }
    if (content === '' || content === '在这里输入内容') {
        alert('The content is required')
        return
    }
    let i = localStorage.length
    localStorage.setItem('note_title'+i, title)
    localStorage.setItem('note_content'+i, content)
    alert('Save successfully!')
    ipc.send('createClose')
}

exports.cancel = () => {
    ipc.send('createClose')
}

exports.del = del