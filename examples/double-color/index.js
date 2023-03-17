const fs = require('fs')
const zlib = require('zlib')

function generateCombinations(arr, len, maxCount) {
  let result = []

  function generate(current, start) {
    // 如果已经生成的组合数量达到了最大数量，则停止生成
    if (result.length === maxCount) {
      return
    }

    // 如果当前已经生成的组合长度等于指定长度，则表示已经生成了一种组合
    if (current.length === len) {
      result.push(current)
      return
    }

    // 从当前起始位置开始，依次将数组中的元素添加到组合中
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i])
      generate([...current], i + 1)
      current.pop()
    }
  }

  generate([], 0)
  return result
}

function getDoubleColorBall(count) {
  const arrRed = Array.from({ length: 33 }, (_, index) => (index + 1).toString().padStart(2, '0'))
  const arrRedResult = generateCombinations(arrRed, 6, count)

  const result = []
  let blue = 1
  arrRedResult.forEach(line => {
    result.push(line.join('') + (blue++).toString().padStart(2, '0'))
    if (blue > 16) {
      blue = 1
    }
  })

  return result
}

// const firstPrize = getDoubleColorBall(1000).join('')
// fs.writeFileSync('./hello.txt', firstPrize)

function compressHello() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFG'
  const doubleColorBallStr = getDoubleColorBall(1000).join('')
  let resultStr = ''
  for (let i = 0; i < doubleColorBallStr.length; i+=2) {
    const number = doubleColorBallStr[i] + doubleColorBallStr[i+1]
    resultStr += letters[parseInt(number) - 1]
  }
  return resultStr
}

// const firstPrize = compressHello()
// fs.writeFileSync('./hello-1.txt', firstPrize)

// const firstPrize = compressHello()
// fs.writeFileSync('./hello-2.txt.gz', zlib.gzipSync(firstPrize))
// fs.writeFileSync('./hello-2.txt.def', zlib.deflateSync(firstPrize))
// fs.writeFileSync('./hello-2.txt.br', zlib.brotliCompressSync(firstPrize))


function generateAll() {
  const arrRed = Array.from({ length: 33 }, (_, index) => (index + 1).toString().padStart(2, '0'))
  const arrRedResult = generateCombinations(arrRed, 6, Number.MAX_VALUE)

  const result = []
  arrRedResult.forEach(line => {
    for (let i = 1; i <= 16; i++) {
      result.push(line.join('') + i.toString().padStart(2, '0'))
    }
  })

  return result
}

function compressAll() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFG'
  const allStr = generateAll().join('')
  let resultStr = ''
  for (let i = 0; i < allStr.length; i += 2) {
    const number = allStr[i] + allStr[i+1]
    resultStr += letters[parseInt(number) - 1]
  }
  return resultStr
}

// const firstPrize = compressAll()
// fs.writeFileSync('./all-ball.txt.gz', zlib.gzipSync(firstPrize))
// fs.writeFileSync('./all-ball.txt.br', zlib.brotliCompressSync(firstPrize))

// fs.writeFileSync('./all-ball.txt', firstPrize)


// 执行解压操作
// const brFile = fs.readFileSync('./hello-2.txt.br')
// const gzipFile = fs.readFileSync('./hello-2.txt.gz')
// const deflateFile = fs.readFileSync('./hello-2.txt.def')
//
// const brFileStr = zlib.brotliDecompressSync(brFile).toString()
// const gzipFileStr = zlib.gunzipSync(gzipFile).toString()
// const deflateFileStr = zlib.inflateSync(deflateFile).toString()
//
// console.log(brFileStr)
// console.log(gzipFileStr)
// console.log(deflateFileStr)
//
// console.log(brFileStr === gzipFileStr, brFileStr === deflateFileStr) // true, true

function getFirstSend() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFG'
  const doubleColorBallStr = getDoubleColorBall(500000).join('')
  let resultStr = ''
  for (let i = 0; i < doubleColorBallStr.length; i+=2) {
    const number = doubleColorBallStr[i] + doubleColorBallStr[i+1]
    resultStr += letters[parseInt(number) - 1]
  }
  return resultStr
}

// const firstPrize = getFirstSend()
// fs.writeFileSync('./first-send.txt.br', zlib.brotliCompressSync(firstPrize))

function letterToCode(letterStr) {
  const result = []
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFG'
  for (let i = 0; i < letterStr.length; i++) {
    result.push((letters.indexOf(letterStr[i]) + 1).toString().padStart(2, '0'))
  }
  return result
}

function decodeData(brFile) {
  const result = []
  const content = zlib.brotliDecompressSync(brFile).toString()
  // 按照七位每注的结构拆分
  for (let i = 0; i < content.length; i += 7) {
    result.push(content.slice(i, i + 8))
  }
  return result
}

const firstSend = fs.readFileSync('./first-send.txt.br')
const firstDataList = decodeData(firstSend)
console.log(firstDataList.length) // 500000

function random(count) {
  let result = []
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * firstDataList.length)
    console.log(firstDataList[index])
    result.push(letterToCode(firstDataList[index]))
  }
  return result
}

console.log(random(2))
