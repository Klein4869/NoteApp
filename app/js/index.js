const ipc = require('electron').ipcRenderer

ipc.on('makeChanges', (event, num) => {
    if (document.getElementById('note_title' + num + 'p')) {
        document.getElementById('note_title' + num + 'p').innerText = '标题:' + localStorage.getItem('note_title' + num)
        let content = localStorage.getItem('note_cocntent' + num)
        content = content.replace('\n', '<br/>')
        document.getElementById('note_content' + num + 'p').innerText = '内容:' + content
    }
    else {
        event.sender.send('mainReload')
    }
})

function makeChanges(btn) {
    ipc.send('makeChanges', btn.id)
}

exports.makeChanges = makeChanges

exports.deleteNote = (btn) => {
    key = btn.id
    localStorage.removeItem(key)
    let num = key.slice(10)
    let key1 = 'note_content' + num
    localStorage.removeItem(key1)
    ipc.send('mainReload')
}

exports.displayNote = () => {
    let i = 0
    while (i < localStorage.length) {
        let key = localStorage.key(i)
        if (key.substring(0, 10) === 'note_title') {
            document.write('<p id="' + key + 'p">标题:' + localStorage.getItem(key) + '</p>')
            let key1 = 'note_content' + key.slice(10)
            let content = localStorage.getItem(key1)
            let str = /\n/g
            content = content.replace(str, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
            document.write('<p id="' + key1 + 'p">内容:' + content + '</p>')
            document.write('<button onclick="index.makeChanges(this)" id="' + key + '" class="button2">View or Change</button>')
            document.write('<button onclick="index.deleteNote(this)" id="' + key + '" class="button2">Delete</button>')
        }
        i++
    }
}