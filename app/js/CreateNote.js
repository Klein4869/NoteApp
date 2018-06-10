'use strict'

const ipc = require('electron').ipcRenderer

function del() {
    document.getElementById('contentInput').value = ""
}

exports.start = () => {
    alert('welcome')
}

exports.cancel = () => {
    ipc.send('createClose')
}

exports.del = del