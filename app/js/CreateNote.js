'use strict'

const ipc = require('electron').ipcRenderer

let key_temp = '0'

ipc.on('makeChanges', (event, key) => {
    document.getElementById('titleInput').value = localStorage.getItem(key)
    key_temp = key
    let key1 = key.slice(10)
    key1 = 'note_content' + key1
    document.getElementById('contentInput').value = localStorage.getItem(key1)
})

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
    if (key_temp !== '0') {
        let num = key_temp.slice(10)
        localStorage.setItem('note_title' + num, title)
        localStorage.setItem('note_content' + num, content)
        ipc.send('createClose', num)
    } else {
        let i = localStorage.length
        localStorage.setItem('note_title' + i, title)
        localStorage.setItem('note_content' + i, content)
        ipc.send('createClose')
    }
}

exports.cancel = () => {
    ipc.send('createClose')
}

exports.del = del