# VanJS Verbose

This is a highly commented and refactored version (no aliases, imperative style) of the VanJS source code to make it more readable for a wider audience (it's currently written in a way to optimize bundle size). It is intended to be used as a learning tool for those who want to understand how VanJS works.

This passes all the tests in the VanJS test suite.

To see the code, just go to [src/van.js](src/van.js).

To see the documentation, you'll need to use a [http static server](https://gist.github.com/willurd/5720255) to serve the files in the `doc` directory. Then you can go to [http://localhost:PORT/doc/](http://localhost:PORT/doc/) to see the documentation.

Updated as of version 1.2.1. See releases [here](https://github.com/vanjs-org/van/releases).

---

# 🍦 **VanJS**: The Smallest Reactive UI Framework in the World

📣 [VanJS 1.0.0 is here →](https://github.com/vanjs-org/van/discussions/72)

<div align="center">
  <table>
    <tbody>
      <tr>
        <td>
          <a href="https://vanjs.org/start">🖊️ Get Started</a>
        </td>
        <td>
          <a href="https://vanjs.org/tutorial">📖 Tutorial</a>
        </td>
        <td>
          <a href="https://vanjs.org/demo">📚 Examples</a>
        </td>
        <td>
          <a href="https://vanjs.org/convert">📝 HTML/MD to VanJS Converter</a>
        </td>
        <td>
          <a href="https://github.com/vanjs-org/van/discussions">💬 Discuss</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

> Enable everyone to build useful UI apps with a few lines of code, anywhere, any time, on any device.

**VanJS** is an ***ultra-lightweight***, ***zero-dependency*** and ***unopinionated*** Reactive UI framework based on pure vanilla JavaScript and DOM. Programming with **VanJS** feels like building React apps in a [scripting language](https://vanjs.org/about#story), without JSX. Check-out the `Hello World` code below:

```javascript
// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())
// Alternatively, you can write:
// document.body.appendChild(Hello())
```

[Try on jsfiddle](https://jsfiddle.net/gh/get/library/pure/vanjs-org/vanjs-org.github.io/tree/master/jsfiddle/home/hello)

You can convert any HTML or MD snippet into **VanJS** code with our online [converter](https://vanjs.org/convert).

**VanJS** helps you manage states and UI bindings as well, with a more natural API:

```javascript
const Counter = () => {
  const counter = van.state(0)
  return div(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, "👍"),
    button({onclick: () => --counter.val}, "👎"),
  )
}

van.add(document.body, Counter())
```

[Try on jsfiddle](https://jsfiddle.net/gh/get/library/pure/vanjs-org/vanjs-org.github.io/tree/master/jsfiddle/home/counter)

## Why VanJS?

### Reactive Programming without React/JSX

Declarative DOM tree composition, reusable components, reactive state binding - **VanJS** offers every good aspect that React does, but without the need of React, JSX, transpiling, virtual DOM, or any hidden logic. Everything is built with simple JavaScript functions and DOM.

### Grab 'n Go

***No installation***, ***no configuration***, ***no dependencies***, ***no transpiling***, ***no IDE setups***. Adding a line to your script or HTML file is all you need to start coding. And any code with **VanJS** can be pasted and executed directly in your browser's developer console. **VanJS** allows you to focus on the business logic of your application, rather than getting bogged down in frameworks and tools.

### Ultra-Lightweight

**VanJS** is the smallest reactive UI framework in the world, with just 0.9kB in the gzipped minified bundle. It's **50~100 times** smaller than most popular alternatives. Guess what you can get from this 0.9kB framework? All essential features of reactive UI programming - DOM templating, state, state binding, state derivation, effect, SPA, client-side routing and even hydration!

![Size comparison](doc/size_comp.png)

> _Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away._
>
> _-- Antoine de Saint-Exupéry, Airman's Odyssey_

### Easy to Learn

Simplicity at its core. 5 major functions (`van.tags`, `van.add`, `van.state`, `van.derive`, `van.hydrate`) + 4 auxiliary functions (`van.tagsNS`, `van._`, `van.val`, `van.oldVal`). The the entire tutorial plus the API reference is [just one single web page](https://vanjs.org/tutorial), and can be learned within 1 hour for most developers.

### Performance

**VanJS** is among the fastest web frameworks, according to the [results](https://krausest.github.io/js-framework-benchmark/2023/table_chrome_117.0.5938.62.html) by [krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark). For SSR, **Mini-Van** is [**1.75X** to **2.25X** more efficient](https://github.com/vanjs-org/mini-van/tree/main/bench#react-vs-mini-van) compared to React.

### TypeScript Support

**VanJS** provides first-class support for TypeScript. With the `.d.ts` file in place, you'll be able to take advantage of type-checking, IntelliSense, large-scale refactoring provided by your preferred development environment. Refer to the [Download Table](https://vanjs.org/start#download-table) to find the right `.d.ts` file to work with.

## Want to Learn More?

* [Get Started](https://vanjs.org/start) (CDN, NPM or local download)
* Learn from the [Tutorial](https://vanjs.org/tutorial)
* Learn by [Examples](https://vanjs.org/demo) (and also [Community Examples](https://vanjs.org/demo#community-examples))
* Convert HTML or MD snippet to **VanJS** code with our online [HTML/MD to **VanJS** Converter](https://vanjs.org/convert)
* Check out [VanUI](https://github.com/vanjs-org/van/tree/main/components) - A collection of grab 'n go reusable UI components for **VanJS**
* Want server-side rendering? Check out [Mini-Van](https://github.com/vanjs-org/mini-van) and [Hydration](https://vanjs.org/ssr) (the entire [vanjs.org](https://vanjs.org/) site is built on top of Mini-Van)
* For questions, feedback or general discussions, visit our [Discussions](https://github.com/vanjs-org/van/discussions) page
* [How did **VanJS** get its name?](https://vanjs.org/about#name)

## Support & Feedback

🙏 **VanJS** aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever. If you find **VanJS** interesting, or could be useful for you some day, please consider starring the project. It takes just a few seconds but your support means the world to us and helps spread **VanJS** to a wider audience.

> In the name of **Van**illa of the House **J**ava**S**cript, [the First of its name](https://vanjs.org/about#name), Smallest Reactive UI Framework, 0.9kB JSX-free Grab 'n Go Library, [Scripting Language](https://vanjs.org/about#story) for GUI, [ChatGPT-Empowered](https://chat.openai.com/share/d92cfaf6-b78e-45ca-a218-069f76fe1b9f) Toolkit, by the word of Tao of the House Xin, Founder and Maintainer of **VanJS**, I do hereby grant you the permission of **VanJS** under [MIT License](https://github.com/vanjs-org/van/blob/main/LICENSE).

Contact us: [@taoxin](https://twitter.com/intent/follow?region=follow_link&screen_name=taoxin) / [tao@vanjs.org](mailto:tao@vanjs.org) / [Tao Xin](https://www.linkedin.com/in/tao-xin-64234920/)

## Community Add-ons

**VanJS** can be extended via add-ons. Add-ons add more features to **VanJS** and/or provide an alternative styled API. Below is a curated list of add-ons built by **VanJS** community:

* [van_dml.js](https://github.com/vanjs-org/van/tree/main/addons/van_dml): adds a a new flavour of composition to **VanJS**. Author: [Eckehard](https://github.com/efpage).
* [van-jsx](https://github.com/vanjs-org/van/tree/main/addons/van_jsx): a JSX wrapper for **VanJS**, for people who like the JSX syntax more. Author: [cqh963852](https://github.com/cqh963852).

## Contributors (25)

*If I miss anyone's contribution here, apologies for my oversight 🙏, please comment on [#87](https://github.com/vanjs-org/van/issues/87) to let me know.*

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://vanjs.org"><img src="https://avatars.githubusercontent.com/u/132854319?v=4?s=100" width="100px;" alt="Tao Xin"/><br /><sub><b>Tao Xin</b></sub></a><br /><a href="#design-Tao-VanJS" title="Design">🎨</a> <a href="https://github.com/vanjs-org/van/commits?author=Tao-VanJS" title="Code">💻</a> <a href="https://github.com/vanjs-org/van/commits?author=Tao-VanJS" title="Documentation">📖</a> <a href="#example-Tao-VanJS" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ryanolsonx"><img src="https://avatars.githubusercontent.com/u/238929?v=4?s=100" width="100px;" alt="Ryan Olson"/><br /><sub><b>Ryan Olson</b></sub></a><br /><a href="#content-ryanolsonx" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tamo.tdiary.net/"><img src="https://avatars.githubusercontent.com/u/383537?v=4?s=100" width="100px;" alt="Tamotsu Takahashi"/><br /><sub><b>Tamotsu Takahashi</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=tamo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lichess.org/@/StevenEmily"><img src="https://avatars.githubusercontent.com/u/58114641?v=4?s=100" width="100px;" alt="icecream17"/><br /><sub><b>icecream17</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=icecream17" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://enpitsulin.xyz"><img src="https://avatars.githubusercontent.com/u/29378026?v=4?s=100" width="100px;" alt="enpitsulin"/><br /><sub><b>enpitsulin</b></sub></a><br /><a href="#example-enpitsuLin" title="Examples">💡</a> <a href="https://github.com/vanjs-org/van/commits?author=enpitsuLin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/EFord36"><img src="https://avatars.githubusercontent.com/u/20516159?v=4?s=100" width="100px;" alt="Elliot Ford"/><br /><sub><b>Elliot Ford</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=EFord36" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andrewgryan"><img src="https://avatars.githubusercontent.com/u/22789046?v=4?s=100" width="100px;" alt="andrewgryan"/><br /><sub><b>andrewgryan</b></sub></a><br /><a href="#design-andrewgryan" title="Design">🎨</a> <a href="https://github.com/vanjs-org/van/commits?author=andrewgryan" title="Code">💻</a> <a href="https://github.com/vanjs-org/van/issues?q=author%3Aandrewgryan" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://fr.linkedin.com/in/fredericheem"><img src="https://avatars.githubusercontent.com/u/4118089?v=4?s=100" width="100px;" alt="FredericH"/><br /><sub><b>FredericH</b></sub></a><br /><a href="#example-FredericHeem" title="Examples">💡</a> <a href="https://github.com/vanjs-org/van/commits?author=FredericHeem" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ebraminio"><img src="https://avatars.githubusercontent.com/u/833473?v=4?s=100" width="100px;" alt="ebraminio"/><br /><sub><b>ebraminio</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=ebraminio" title="Code">💻</a> <a href="https://github.com/vanjs-org/van/commits?author=ebraminio" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.efpage.de"><img src="https://avatars.githubusercontent.com/u/29945129?v=4?s=100" width="100px;" alt="Eckehard"/><br /><sub><b>Eckehard</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=efpage" title="Code">💻</a> <a href="#plugin-efpage" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://onsclom.net"><img src="https://avatars.githubusercontent.com/u/8485687?v=4?s=100" width="100px;" alt="Austin Merrick"/><br /><sub><b>Austin Merrick</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=onsclom" title="Code">💻</a> <a href="#ideas-onsclom" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-onsclom" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tolluset.gitbook.io/wiki/"><img src="https://avatars.githubusercontent.com/u/50096419?v=4?s=100" width="100px;" alt="Lee Byonghun"/><br /><sub><b>Lee Byonghun</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=Tolluset" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://caputdraconis.tistory.com"><img src="https://avatars.githubusercontent.com/u/60993104?v=4?s=100" width="100px;" alt="caputdraconis"/><br /><sub><b>caputdraconis</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=caputdraconis050630" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pomdtr"><img src="https://avatars.githubusercontent.com/u/17577332?v=4?s=100" width="100px;" alt="Achille Lacoin"/><br /><sub><b>Achille Lacoin</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=pomdtr" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cqh963852"><img src="https://avatars.githubusercontent.com/u/17702287?v=4?s=100" width="100px;" alt="cqh"/><br /><sub><b>cqh</b></sub></a><br /><a href="https://github.com/vanjs-org/van/commits?author=cqh963852" title="Code">💻</a> <a href="#plugin-cqh963852" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/awesome-club"><img src="https://avatars.githubusercontent.com/u/102911334?v=4?s=100" width="100px;" alt="awesome"/><br /><sub><b>awesome</b></sub></a><br /><a href="#video-awesome-club" title="Videos">📹</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/artydev"><img src="https://avatars.githubusercontent.com/u/31207473?v=4?s=100" width="100px;" alt="artydev"/><br /><sub><b>artydev</b></sub></a><br /><a href="#example-artydev" title="Examples">💡</a> <a href="#question-artydev" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ndrean"><img src="https://avatars.githubusercontent.com/u/6793008?v=4?s=100" width="100px;" alt="Neven DREAN"/><br /><sub><b>Neven DREAN</b></sub></a><br /><a href="#example-ndrean" title="Examples">💡</a> <a href="https://github.com/vanjs-org/van/issues?q=author%3Andrean" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://person.sh"><img src="https://avatars.githubusercontent.com/u/3257?v=4?s=100" width="100px;" alt="Stephen Handley"/><br /><sub><b>Stephen Handley</b></sub></a><br /><a href="#example-stephenhandley" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://gion.ro"><img src="https://avatars.githubusercontent.com/u/867609?v=4?s=100" width="100px;" alt="Ionut Stoica"/><br /><sub><b>Ionut Stoica</b></sub></a><br /><a href="#ideas-iongion" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/mindplaydk"><img src="https://avatars.githubusercontent.com/u/103348?v=4?s=100" width="100px;" alt="Rasmus Schultz"/><br /><sub><b>Rasmus Schultz</b></sub></a><br /><a href="#ideas-mindplay-dk" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cloudspeech"><img src="https://avatars.githubusercontent.com/u/850521?v=4?s=100" width="100px;" alt="cloudspeech"/><br /><sub><b>cloudspeech</b></sub></a><br /><a href="#ideas-cloudspeech" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://danielupshaw.com/"><img src="https://avatars.githubusercontent.com/u/595446?v=4?s=100" width="100px;" alt="Daniel Upshaw"/><br /><sub><b>Daniel Upshaw</b></sub></a><br /><a href="#plugin-groovenectar" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/barrymun"><img src="https://avatars.githubusercontent.com/u/15635312?v=4?s=100" width="100px;" alt="barrymun"/><br /><sub><b>barrymun</b></sub></a><br /><a href="#example-barrymun" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eevleevs"><img src="https://avatars.githubusercontent.com/u/5012744?v=4?s=100" width="100px;" alt="Giulio Malventi"/><br /><sub><b>Giulio Malventi</b></sub></a><br /><a href="#content-eevleevs" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
