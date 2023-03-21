const fs = require('fs')
const zlib = require('zlib')

console.time('start')
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

// const firstSend = fs.readFileSync('./first-send.txt.br')
// const firstDataList = decodeData(firstSend)
// console.log(firstDataList.length) // 500000

// function random(count) {
//   let result = []
//   for (let i = 0; i < count; i++) {
//     const index = Math.floor(Math.random() * firstDataList.length)
//     console.log(firstDataList[index])
//     result.push(letterToCode(firstDataList[index]))
//   }
//   return result
// }
//
// console.log(random(2))


function getRandomCode(count = 500000) {
  const arrRed = Array.from({ length: 33 }, (_, index) => (index + 1).toString().padStart(2, '0'))
  // generateCombinations 是我们上面定义过的函数
  const arrRedResult = generateCombinations(arrRed, 6, count)

  const result = []
  let blue = 1
  arrRedResult.forEach(line => {
    result.push([...line, (blue++).toString().padStart(2, '0')])
    if (blue > 16) {
      blue = 1
    }
  })

  return result
}

function randomPurchase() {
  const codes = getRandomCode(5000)
  const result = []
  for (let code of codes) {
    let count = Math.floor(Math.random() * 50) + 1
    result.push({
      code,
      count,
    })
  }
  return result
}

/**
 * @param {String[]} target ['01', '02', '03', '04', '05', '06', '07']
 * @param {String[]} origin ['01', '02', '03', '04', '05', '06', '07']
 * @returns {Number} 返回当前彩票的中奖金额
 */
function compareToMoney(target, origin) {
  let money = 0
  let rightMatched = target[6] === origin[6]
  // 求左边六位的交集数量
  let leftMatchCount = target.slice(0, 6).filter(
    c => origin.slice(0,6).includes(c)
  ).length

  if (leftMatchCount === 6 && rightMatched) {
    money += 5000000
  } else if (leftMatchCount === 6 && !rightMatched) {
    money += 300000
  } else if (leftMatchCount === 5 && rightMatched) {
    money += 3000
  } else if (leftMatchCount === 5 && !rightMatched) {
    money += 200
  } else if (leftMatchCount === 4 && rightMatched) {
    money += 200
  } else if (leftMatchCount === 4 && !rightMatched) {
    money += 10
  } else if (leftMatchCount === 3 && rightMatched) {
    money += 10
  } else if (leftMatchCount === 2 && rightMatched) {
    money += 5
  } else if (leftMatchCount === 1 && rightMatched) {
    money += 5
  } else if (rightMatched) {
    money += 5
  }
  return money
}

// 空号在前，购买数量越多越靠后
const purchaseList = randomPurchase().sort((a, b) => a.count - b.count)
const bonusPool = []

for (let i = 0; i < purchaseList.length; i++) {
  // 假设这就是一等奖，那么就需要计算其价值
  const firstPrize = purchaseList[0]
  let totalMoney = 0

  for (let j = 0; j < purchaseList.length; j++) {
    // 与一等奖进行对比，对比规则是参照彩票中奖规则
    const money = compareToMoney(purchaseList[j].code, firstPrize.code) * purchaseList[j].count
    totalMoney += money
  }

  bonusPool.push({
    code: firstPrize.code,
    totalMoney,
  })
}

const result = bonusPool.sort((a, b) => a.totalMoney - b.totalMoney)
// 至于怎么挑，那就随心所欲了
console.log(result[0].code, result[0].totalMoney)

console.timeEnd('start')


