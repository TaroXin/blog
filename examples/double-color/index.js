const fs = require('fs')

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

const firstPrize = getDoubleColorBall(1000).join('')
fs.writeFileSync('./hello.txt', firstPrize)
