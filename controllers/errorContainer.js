async function createIntentionalError() {
    throw new Error("This is Intentional error")
}

module.exports = {createIntentionalError}