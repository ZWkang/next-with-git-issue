// const MarkdownIt = require("markdown-it");
// const yaml = require("js-yaml");
// const plugins1 = (md, opts) => {
//   const defaultTextRuleRenderer = md.renderer.rules.text;
//   md.renderer.rules.text = (tokens, idx, options, env, self) => {
//     let isTokenINeed = tokens[idx].content === "<==";

//     if (isTokenINeed) {
//       console.log(options);
//       tokens = [];
//       return "";
//     }
//     return defaultTextRuleRenderer(tokens, idx, options, env, self);
//   };
//   console.log();
// };
// // console.log(
// //   new MarkdownIt().use(plugins1).render(`
// // <==
// // test
// // ==>`)
// // );

// console.log(yaml.safeLoad("ttt"));

const markdownIt = require("markdown-it");
const removeMd = require("remove-markdown");
const ins = new markdownIt();

let str =
  "> 每个前端团队都在打造自己的前端开发体系，这通常是一个东拼西凑，逐渐磨合的过程，在技术发展日新月异的今天，这样的过程真的是不可抽象和复制的么？本文希望能够通过系统的拆解前端开发体系为大家提供体系设计思路参考。\n# 什么是前端集成解决方案\n\n> 前端集成解决方案，英文翻译为 Front-end Integrated Solution，缩写fis，发音[fɪs]\n\n前端集成解决方案并不是一个新词汇，将这个词拆开来看，我们能得到：\n- 前端：指前端领域，即web研发中常用的浏览器客户端相关技术，比如html、js、css等\n- 集成：将一些孤立的事物或元素通过某种方式改变原有的分散状态集中在一起，产生联系，从而构成一个有机整体的过程。[[1](http://baike.baidu.com/link?url=aGjwHq7-F5eplgGcJPKy7-q5x_5j5eJgfSwuM6WDm0NEEuJekRotYn1Au9GmwRem)]\n- 解决方案：针对某些已经体现出的，或者可以预期的问题，不足，缺陷，需求等等，所提出的一个解决问题的方案，同时能够确保加以有效的执行。[[2](http://baike.baidu.com/view/1038216.htm)]\n\n总结来说，前端集成解决方案就是：\n\n> 将前端研发领域中各种分散的技术元素集中在一起，并对常见的前端开发问题、不足、缺陷和需求，所提出的一种解决问题的方案。\n# 前端领域有哪些技术元素\n\n前端行业经历了这么长时间的发展，技术元素非常丰富，这里列举出一般web团队需要用到的技术元素：\n\n![前端开发体系技术元素及其关联关系](http://htmljs.b0.upaiyun.com/uploads/1398394781155-QQ20140425-1.png)\n1. `开发规范`：包括开发、部署的目录规范，编码规范等。不要小瞧规范的威力，可以极大的提升开发效率，真正优秀的规范不会让使用者感到约束，而是能帮助他们快速定位问题，提升效率。\n2. `模块化开发`：针对js、css，以功能或业务为单元组织代码。js方面解决独立作用域、依赖管理、api暴露、按需加载与执行、安全合并等问题，css方面解决依赖管理、组件内部样式管理等问题。是提升前端开发效率的重要基础。现在流行的模块化框架有requirejs、seajs等。\n3. `组件化开发`：在模块化基础上，以页面小部件(component)为单位将页面小部件的js、css、html代码片段放在一起进行开发、维护，组件单元是资源独立的，组件在系统内可复用。比如头部(header)、尾部(footer)、搜索框(searchbar)、导航(menu)、对话框(dialog)等，甚至一些复杂的组件比如编辑器(editor)等。通常业务会针对组件化的js部分进行必要的封装，解决一些常见的组件渲染、交互问题。\n4. `组件仓库`：有了组件化，我们希望将一些非常通用的组件放到一个公共的地方供团队共享，方便新项目复用，这个时候我们就需要引入一个组件仓库的东西，现在流行的组件库有bower、component等。团队发展到一定规模后，组件库的需求会变得非常强烈。\n5. `性能优化`：这里的性能优化是指能够通过工程手段保证的性能优化点。由于其内容比较丰富，就不在这里展开了，感兴趣的同学可以阅读我的这两篇文章 [[1](http://infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part1)] [[2](http://infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part2)]。性能优化是前端项目发展到一定阶段必须经历的过程。这部分我想强调的一点是 `性能优化一定是一个工程问题和统计问题`，不能用工程手段保证的性能优化是不靠谱的，优化时只考虑一个页面的首次加载，不考虑全局在宏观统计上的优化提升也是片面的。\n6. `项目部署`：部署按照现行业界的分工标准，虽然不是前端的工作范畴，但它对性能优化有直接的影响，包括静态资源缓存、cdn、非覆盖式发布等问题。合理的静态资源资源部署可以为前端性能带来较大的优化空间。\n7. `开发流程`：完整的开发流程包括本地开发调试、视觉效果走查确认、前后端联调、提测、上线等环节。对开发流程的改善可以大幅降低开发的时间成本，工作这些年见过很多独立的系统（cms系统、静态资源推送系统）将开发流程割裂开，对前端开发的效率有严重的阻碍。\n8. `开发工具`：这里说的工具不是指IDE，而是工程工具，包括构建与优化工具、开发-调试-部署等流程工具，以及组件库获取、提交等相关工具，甚至运营、文档、配置发布等平台工具。前端开发需要工具支持，这个问题的根本原因来自前端领域语言特性（未来我会单独写一篇文章介绍前端领域语言缺陷问题）。前端开发所使用的语言（js、css、html）以及前端工程资源的加载与定位策略决定了前端工程必须要工具支持。由于这些工具通常都是独立的系统，要想把它们串联起来，才有了yeoman这样的封装。前面提到的7项技术元素都直接或间接的对前端开发工具设计产生一定的影响，因此能否串联其他技术要素，使得前端开发形成一个连贯可持续优化的开发体系，工具的设计至关重要。\n\n以上8项，1-3是技术和业务相关的开发需求，4是技术沉淀与共享需求，5-8是工程优化需求。\n\n经过这些年的工程领域实践，个人觉得以上8项技术元素应该成为绝大多数具有一定规模的前端开发团队的标配。各位读者可以对照自己团队现状来思考一下团队开发体系还有哪些环节需要完善。\n# 攒一套前端集成解决方案\n\n> 不难发现，其实其他领域工程也基本需要解决上述这些问题。前端由于其领域语言的独特性，使得前端工程在解决这些问题上跟其他工程有很大区别，因此至今也没有形成一套比较好的理论体系指导团队实践前端工程。\n\n仔细观察过一些团队的技术体系形成过程，大家都在努力拼凑上述8项技术元素的具体解决方案。单独观察每一项技术点，你或许会觉得都能各自找到已有的实现，但我要说，`把所有8项技术点无缝的串联起来，是一项非常有挑战的工作`，你信么？相信真正经历过这样事情的同学能明白我说的串联成本问题。\n\n假设我们希望实践一套完整的前端集成解决方案，好了，如果我们单独去看每一项技术点，都可能会找来一两个现成的东西，假设我们东拼西凑的找全了所有8项技术要素对应的具体实现。接下来要用了，它们能很完整流程的跑起来么？\n\n正如前面的贴图展示的那样，所有的技术点都有一定的内在联系：\n- 模块化开发涉及到性能优化、对构建工具又有一定的配套实现要求，也会影响开发规范的定制\n- 组件化开发应该基于模块化框架来加载其他依赖的组件，如果组件化框架自带模块管理功能，那么就可能导致工程性的性能优化实现困难\n- 组件库应该与组件化开发配套，组件仓库中的组件都应该按照相同的标准来实现，否则下载的组件不具有可复用性、可移植性，就是去了仓库的意义\n- 我们设计的开发规范工具是否能很容易的实现，如果部署上有特殊要求，工具是否能很容易的做出调整，而不是修改规范。\n";
// console.log(ins.use(plugin1).render(str));

// function plugin1(md, opts) {
//   const defaultTextRuleRenderer = md.renderer.rules.text;
//   md.renderer.rules.text = (tokens, idx, options, env, self) => {
//     console.log(tokens);
//     let isTokenINeed = tokens[idx].content === "<==";

//     if (isTokenINeed) {
//       console.log(options);
//       tokens = [];
//       return "";
//     }
//     return defaultTextRuleRenderer(tokens, idx, options, env, self);
//   };
//   console.log();
// }

console.log(
  str
    .split("\n")
    .map(_ => removeMd(_))
    .join("\n")
);

// TODO:
// remove this file
// drop file
