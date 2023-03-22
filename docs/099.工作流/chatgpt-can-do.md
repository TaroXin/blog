---
title: 时代背景下的 ChatGPT，到底能帮助开发者做什么呢？
date: 2023-02-17 17:43:50
permalink: /pages/d28753/
categories:
  - 工作流
tags:
  - ChatGPT
  - 前沿技术
---

本文正在参加 ✍🏻 技术视角深入 ChatGPT 征文活动

## 前言

最近脍炙人口的技术 `ChatGPT`，关注度非常高，网上关于它的文章也一大片，不过很多都是关于体验或者部署的，我们习惯去讨论它的技术、模型、趣味等等，但他能在开发者的工作中带给我们些什么东西呢？

我应该是直接让他帮我修改代码的懒人之一，优化的效果也确实不错，但这个不应该是他的全部功能，我想作为开发者来说，我希望`ChatGPT`可以帮我做如下的事情：

- 优化代码质量
- 简化工作流程

它可以说是完美的实现了这些功能，不得不说，`ChatGPT`让我感觉到了第四次工业革命的接近，是我们在无数智障AI对话中的一盏明灯！

注册和使用它我就不赘述了，网上也有很多优秀的文章，相信大家可以搞得定！

## 优化我的代码

不得不说的是，有些开发者的代码确实写的不尽人意[狗头]，我也会有同样的情况，偶尔偷懒赶工，写的代码也就随便对付一下，不想细嚼慢咽的话，不妨尝试一下这个需求：

### 小试牛刀

> 需求：
> 存在两个JSON对象，一个名为 originValues(原始对象)，一个名为 updatedValues(更新后的对象)，对象中可能包含任何值，对比两个对象的值是否发生改变，注意，对象中的值类型可以是任意类型，并且JSON对象有可能是深层嵌套的。

很简单的一个需求，通常可以用递归对比实现，嗯，可是我很急，我写了一份糟糕的代码，看起来不是那么优雅，但其实现了该功能：

```javascript
function compareJSON(originValues, updatedValues) {
  if (typeof originValues != 'object' && typeof updatedValues != 'object') {
    return originValues != updatedValues
  }

  for (let key of Object.keys(originValues)) {
    if (compareJSON(originValues[key], updatedValues[key])) {
      return true
    }
  }
  return false
}
```

OK，我们时刻都在生产Bug，给测试小伙伴加绩效，不过不急，我们看看 `ChatGPT` 对这段代码的看法如何

![](https://source.taroxin.com/u-image-bed/1676644844955.png)

它写的太复杂了，我想要更简洁的版本，没事，你可以直接告诉它！！

![](https://source.taroxin.com/u-image-bed/1676644955289.png)

可以看到，我们没考虑到的点，包括对于 `null` 和 `undefined` 的判断，数组的判断它都考虑到了，甚至更惊喜的是，它懂得将我们的函数极致简化，将我们原来的 `for` 循环：

```javascript
for (const [key, value] of Object.entries(originValues)) {
  if (!compareJSON(value, updatedValues[key])) {
    return false;
  }
}

return true
```

转换为了 ⬇⬇
```javascript
return Object.entries(originValues).some(([key, value]) =>
  !compareJSON(value, updatedValues[key])
);
```

虽然使用了一些新兴的语法，不过有幸有 `Babel` 和 `core-js` 支持的我们不必担心过多。顺便致敬一下 `core-js` 的作者，默默无闻的为开源社区工作，瑞思拜！

如果这样你还不满足，那我们可以使用极致的做法，直接将需求描述复制给 `ChatGPT` ！

![](https://source.taroxin.com/u-image-bed/1676645803478.png)

它不仅完美的完成了任务，处理了各种边界值的情况，顺便还给出了测试用例，甚至于写上了注释！出乎意料！如果你觉得他给的代码还是过于复杂，你可以让它再执行精简，不过需要大家自己去探索了！

### 复杂代码优化

基于篇幅原因，这里不列出太长的代码片段，仅做一些示例，在初学者的代码中，经常会出现各种奇奇怪怪的重复且无意义的代码，我们想让 `ChatGPT` 帮我们理清楚函数的策略，并写出更好的示例！

```javascript
function testFunc(a, b, target) {
  const result = []
  Object.values(a).forEach(aValue => {
    result.push(...aValue)
  })

  Object.values(b).forEach(bValue => {
    result.push(...bValue)
  })

  if (result.length) {
    return result.find(r => r.value == target)
  }
}
```

这段代码中，我们通过人工分析可得知，`a` 和 `b` 是两个对象，对象中的每一个元素值都是数组，作用是从 `a` 和 `b` 数组的并集中获取 `value` 为 `target` 的元素，整理可知，
大概的数据结构如下所示

```javascript
// a,b 的类型
const obj = {
  o1: [{value: '123'}, {value: '456'}],
  o2: [{value: '345'}, {value: '678'}],
}
```

如果遇到类似的代码，我可以称之为操作过急！让`ChatGPT`帮我们优化一下会怎么样呢！

![](https://source.taroxin.com/u-image-bed/1676891119455.png)

我对于该优化结果还是很满意的，不仅理清楚了思路，而且给了更优的实现方式。对于新语法的问题，我上面已经解释过了，所以不需要过多的担心！

### 命名优化/注释优化

可以看到，我们上面的那一段糟糕的代码，不仅命名非常难看，而且毫无意义，对于后来的维护者来说，是如灾难一般的存在！所以命名优化与注释优化势在必得!

本来命名优化和注释优化想分开来写，但是为了给大家一些更良好的 `ChatGPT` 示例，我将这两步合并在了一起，只要描述清晰，他是可以理解你说的话的！

我们接着上面的用例继续试验，拭目以待：

![](https://source.taroxin.com/u-image-bed/1676891803316.png)

非常不错，希望大家可以用到更复杂的用例上面！

### 生成代码

生成代码是目前最常用的功能之一，也因此衍生了诸多的插件和开源框架，如 `vue-cli` 类似的脚手架框架也拥有生成代码的功能，`VsCode` 代码片段也具有生成代码的属性，不过相对来说，我还是觉得`ChatGPT`足够灵活，我们一起来看看它的厉害之处吧！

#### 生成 Vue 文件模板

> 生成 ElementUI 弹窗模板，全屏，有三个底部按钮，保存，删除，取消，内容区域是一个餐厅预定表单

![](https://source.taroxin.com/u-image-bed/1676892021752.png)

如上的代码都是可以直接使用的，也充分符合了我们的需求，甚至可以更过分一些：

![](https://source.taroxin.com/u-image-bed/1676892456397.png)

如果需要更厉害的功能，可能需要大家自己去尝试一下喽！

#### 生成文档

根据Vue组件信息生成表格类文档，这里我们直接使用它刚刚生成的基于 ElementUI 的弹窗组件，来帮我们生成组件的使用文档

![](https://source.taroxin.com/u-image-bed/1676893597110.png)

上面的文档生成是有错误的，不知道大家发现了没有，需要提醒大家的是，`ChatGPT` 是一个需要调教的程序，你要反复不断地告诉他你的需求，你的想法，他才能理解你最终的意思，所以我们应该继续追问：

![](https://source.taroxin.com/u-image-bed/1676893966253.png)

#### 生成实体

我们请求接口的时候，接口返回了如下的 JSON 结构，普通的解决方案就是自己手动编写 Typescript 实体，或者借助工具来生成实体文件，我们同样可以借助 `ChatGPT` 来完成同样的功能，甚至来说可以更优秀！

```json
{
  "name": "TaroXin"，
  "age": 18,
  "gender": "男",
  "books": ["泰罗凹凸曼生长记", "孙子兵法"],
  "dept": {
    "name": "IT部",
    "id": 10086
  }
}
```

通过JSON数据格式生成TS实体并写注释!

![](https://source.taroxin.com/u-image-bed/1676892918206.png)

#### 生成模拟数据

我们已经有了一个 Typescript 实体，让`ChatGPT`再帮我们返回一些测试数据吧！

![](https://source.taroxin.com/u-image-bed/1676893159996.png)

#### 生成测试用例

TDD 是一个非常良好的开发习惯，他通常要求我们先完善一部分测试用例，再通过需求来完成对应代码的开发，这个时候，我们需要想一些测试用来用来支撑开发。

我们完全可以借助 `ChatGPT` 的力量。帮我们省略这一步，如下操作：

> 需求：写一个减法函数，参数是 `a` 和 `b`, 返回 `a` 和 `b` 的差，要求不仅要完成减法功能，也要考虑到浮点数引起的计算错误

接下来，让我们借助 `ChatGPT` 先完善测试用例：

![](https://source.taroxin.com/u-image-bed/1676898494825.png)

接下来我们就可以根据测试用例去写对应的功能实现了！

#### 生成数据库SQL

生成SQL，也是我们的一个常见需求，只要描述好需求语句，就能得到一个比较完美的结果：

![](https://source.taroxin.com/u-image-bed/1676894411346.png)


## 简化工作流程

上面的实践是告诉我们在代码的开发方面，`ChatGPT` 有很强的可塑性，也有完整的能力帮助我们去实现一些基本的需求。

那么在简化工作流程方面，`ChatGPT` 又能带给我们哪些惊喜呢！

### 给我一个最佳的 ESLint 配置

非常常见的需求，网上的文章也是一抓一大把，不做过多的赘述，我们主要看得是，`ChatGPT` 的可塑性有多强，说实话，我使用该功能的时候确实有一点惊讶，它带给我的惊喜太多了，导致我实在有点把持不住！

![](https://source.taroxin.com/u-image-bed/1676899278900.png)

### 替换为 Prettier

这个需求主要是演示 `ChatGPT` 的上下文关联，正因为有此特性，才能实现更智能的连续对话！

![](https://source.taroxin.com/u-image-bed/1676899360221.png)

### 我要一个雪碧图

那么对于我们在项目中非常常用的需求，直接问他实现方式就可以了，多么希望搜索引擎快点集成这些功能啊，`New Bing` 已经集成了这些功能，有希望成为第一个集成 `ChatGPT` 并量产化的搜索引擎，期待期待！

![](https://source.taroxin.com/u-image-bed/1676899888947.png)

### 我要 GitHub 上的最佳示例

Github 上的内容通常会比较繁杂，需要精准去定位需求是比较艰难的，它同样可以去帮我们进行筛选:

![](https://source.taroxin.com/u-image-bed/1676900222756.png)

### 我要从网页通信到Popup

这里是一个比较抽象的问题，需求来源于我前几天需要写的一个浏览器插件中的。

> 需要从网页中直接点击按钮，通知 Chrome 插件中的 Popup 进行更新

如果你直接搜索在搜索引擎搜索这类问题的话，大概会给你浏览器插件的通信原理，通信方式，并且带一些没什麽意义的示例，需要你有较强的信息分辨能力和耐心，借助 `ChatGPT` 的话可能是另外一种不同的体验：

![](https://source.taroxin.com/u-image-bed/1676900796791.png)

### 我要点赞

![](https://source.taroxin.com/u-image-bed/1676902947102.png)

## 给 ChatGPT 的需求描述

怎么样给 `ChatGPT` 写需求可以让其更精准的响应你的需求？我觉得你需要做到如下几点：

1. 需要自己先明白自己的需求是什么，并且可以用正常的语句表单出来，人可以理解，`ChatGPT` 就可以理解
2. 给 `ChatGPT` 举例，让他可以参考市面上已有的一些软件或者实现方案，如让其参考 ElementUI 实现文件模板
3. 善于使用 `ChatGPT` 的上下文功能，像正常人对话一样和它对话，有时候能获得更好的效果
4. 交流，交流能使 `ChatGPT` 更加理解你的需求，强调它做错的地方并纠正是一个很好的使用习惯

探索更多的 `ChatGPT` 技巧，可以让你在同行业中领先一步，一步领先则占先机，在竞争激烈的技术圈也更容易拥有一席之地，加油！

## 结语 - ChatGPT版

![](https://source.taroxin.com/u-image-bed/1676906161074.png)

## 结语

今天我大家介绍了 `ChatGPT` 这个现金先进的AI对话技术，相信大家对于它的理解也更近了一步，他能帮助我们做的东西还有很多，我基于能力和想法有限，也不能完整的实现所有内容，所以一切都需要大家自己去探索，去研究，这样也可能可以更丰富 `ChatGPT` 的知识库，在以后也可以获得更精准的答案，对于技术的发展，我们皆是贡献者！

希望 New Bing 的 Chat 功能尽快上线，让我们在不使用科学上网的条件下也可以使用 `ChatGPT`！

去探索吧，诸位，不知道的东西还多着呢！我是泰罗凹凸曼，下一篇再会！