const images = ["bau.png", "cua.png", "ca.png", "ga.png", "huou.png", "tom.png"]
let spinInterval
let spinning = false

document.getElementById('spinButton').addEventListener('click', spin)
document.getElementById('resetButton').addEventListener('click', resetBets)
document.querySelectorAll('.bet').forEach(bet => {
    bet.addEventListener('click', placeBet)
})

function spin() {
    if (spinning) return
    spinning = true
    toggleButtons(false)
    let count = 0
    spinInterval = setInterval(() => {
        document.querySelectorAll('.image-container img').forEach(img => {
            const randomImage = images[Math.floor(Math.random() * images.length)]
            img.src = randomImage;
        })
        count++;
        if (count === 100) {
            clearInterval(spinInterval)
            spinning = false
            toggleButtons(true)
            checkResult()
        }
    }, 100)
}

function resetBets() {
    if (spinning) return;
    document.querySelectorAll('.bet-points').forEach(point => point.textContent = '0')
}

function placeBet(event) {
    if (spinning) return;
    const betPoints = document.querySelectorAll('.bet-points')
    let totalBets = Array.from(betPoints).reduce((total, point) => total + parseInt(point.textContent), 0);
    if (totalBets >= 3) return
    const betElement = event.currentTarget.querySelector('.bet-points')
    const currentPoints = parseInt(betElement.textContent)
    if (totalBets + 1 <= 3) {
        betElement.textContent = currentPoints + 1
    }
}

function toggleButtons(enabled) {
    document.getElementById('spinButton').disabled = !enabled
    document.getElementById('resetButton').disabled = !enabled
    document.querySelectorAll('.bet').forEach(bet => bet.style.pointerEvents = enabled ? 'auto' : 'none')
}

function checkResult() {
    const resultImages = Array.from(document.querySelectorAll('.image-container img')).map(img => img.src)
    const betPoints = Array.from(document.querySelectorAll('.bet-points'))
    let correctGuess = false

    betPoints.forEach(point => {
        const betId = point.closest('.bet').dataset.id
        const betAmount = parseInt(point.textContent)
        if (resultImages.some(imgSrc => imgSrc.includes(betId)) && betAmount > 0) {
            correctGuess = true
        }
    });

    const resultText = correctGuess ? "Bạn đã đoán đúng kết quả " : "Bạn đã đoán sai kết quả "
    document.getElementById('result').textContent = resultText
}