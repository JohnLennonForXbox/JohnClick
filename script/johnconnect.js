// johnconnect would connect to a websocker and let two players share a save
// it'd be really ufnny

const emojis = ['🙂', '😭', '😡', '❤', '👽', '🤖', '🧩', '⚙', '🏳‍⚧', '🛑']
// we could add more as long as they're visually distinct
// the whole point is to be accessible, see minecraft education edition's multiplayer code thingy

function GenerateConnectCode() {
    // connect to a relaying server here
    let code = ""

    for (let i = 0; i < 6; i++) {
        code += emojis[Math.floor(Math.random() * emojis.length)]
    }

    console.log(code)

    // start something looking for echoes with this code
}

