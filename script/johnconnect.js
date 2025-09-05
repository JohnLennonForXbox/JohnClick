const emojis = ['🙂', '😭', '😡', '❤', '👽', '🤖', '🧩', '⚙', '🏳‍⚧', '🛑']

function GenerateConnectCode() {
    // connect to a relaying server here
    let code = ""

    for (let i = 0; i < 6; i++) {
        code += emojis[Math.floor(Math.random() * emojis.length)]
    }

    console.log(code)

    // start something looking for echoes with this code
}

