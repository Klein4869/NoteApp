const ipc = require('electron').ipcRenderer

function makeChanges(btn) {
    ipc.send('makeChanges', btn.id)
}

exports.openCreateWindow = () => {
    ipc.send('openCreateWindow')
}

exports.makeChanges = makeChanges

exports.deleteNote = (key) => {
    localStorage.removeItem(key)
    localStorage.removeItem(key + 1)
}

exports.displayNote = () => {
    let i = 0
    let j = 0
    let flag = 0
    while (i < localStorage.length) {
        let key = localStorage.key(i)
        if (key.substring(0, 10) === 'note_title') {
            document.write('<p id="' + key + 'p">Title:' + localStorage.getItem(key) + '</p>')
            flag++
            let flag1 = 0
            while (j < localStorage.length) {
                let key1 = localStorage.key(j)
                if (key1.substring(0, 12) === 'note_content') {
                    if (flag1 + 1 < flag) {
                        flag1++
                        j++
                        continue
                    }
                    document.write('<p id="' + key1 + 'p">Content:' + localStorage.getItem(key1) + '</p>')
                    break
                }
                j++
            }
            document.write('<button onclick="index.makeChanges(this)" id="' + key + '">' + key + '</button>')
            document.write('<button onclick="alert(1)">Delete</button>')
        }
        i++
    }
}