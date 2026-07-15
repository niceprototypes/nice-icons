# nice-icons

A collection of SVG icons with stroke and fill variants. Every icon ships a `base` (stroke) and `fill` variant.

## Install

```sh
npm install nice-icons
```

## Usage

**Vanilla JS** — `getIcon` returns the icon's SVG markup as a string:

```js
import { getIcon } from "nice-icons/get-icon"

document.querySelector("#slot").innerHTML = getIcon("check")        // base variant
getIcon("check", "fill")                                           // fill variant
getIcon("check", "base", { size: "large", color: "link" })        // configured
```

**React** — via [nice-react-icon](https://github.com/niceprototypes/nice-react-icon):

```jsx
import Icon from "nice-react-icon"

<Icon name="check" />
<Icon name="check" variant="fill" />
```

## Icons (74)

|  | Name | getIcon | `<Icon />` |
|:-:|------|---------|------------|
| <img src="readme-assets/android.svg" width="16" height="16" alt="android"> | `android` | `getIcon("android")` | `<Icon name="android" />` |
| <img src="readme-assets/apple.svg" width="16" height="16" alt="apple"> | `apple` | `getIcon("apple")` | `<Icon name="apple" />` |
| <img src="readme-assets/arrow-bottom.svg" width="16" height="16" alt="arrow-bottom"> | `arrow-bottom` | `getIcon("arrow-bottom")` | `<Icon name="arrow-bottom" />` |
| <img src="readme-assets/arrow-left.svg" width="16" height="16" alt="arrow-left"> | `arrow-left` | `getIcon("arrow-left")` | `<Icon name="arrow-left" />` |
| <img src="readme-assets/arrow-right.svg" width="16" height="16" alt="arrow-right"> | `arrow-right` | `getIcon("arrow-right")` | `<Icon name="arrow-right" />` |
| <img src="readme-assets/arrow-top.svg" width="16" height="16" alt="arrow-top"> | `arrow-top` | `getIcon("arrow-top")` | `<Icon name="arrow-top" />` |
| <img src="readme-assets/attention.svg" width="16" height="16" alt="attention"> | `attention` | `getIcon("attention")` | `<Icon name="attention" />` |
| <img src="readme-assets/bell.svg" width="16" height="16" alt="bell"> | `bell` | `getIcon("bell")` | `<Icon name="bell" />` |
| <img src="readme-assets/box.svg" width="16" height="16" alt="box"> | `box` | `getIcon("box")` | `<Icon name="box" />` |
| <img src="readme-assets/brush.svg" width="16" height="16" alt="brush"> | `brush` | `getIcon("brush")` | `<Icon name="brush" />` |
| <img src="readme-assets/calculator.svg" width="16" height="16" alt="calculator"> | `calculator` | `getIcon("calculator")` | `<Icon name="calculator" />` |
| <img src="readme-assets/calendar.svg" width="16" height="16" alt="calendar"> | `calendar` | `getIcon("calendar")` | `<Icon name="calendar" />` |
| <img src="readme-assets/camera.svg" width="16" height="16" alt="camera"> | `camera` | `getIcon("camera")` | `<Icon name="camera" />` |
| <img src="readme-assets/cancel.svg" width="16" height="16" alt="cancel"> | `cancel` | `getIcon("cancel")` | `<Icon name="cancel" />` |
| <img src="readme-assets/carat-bottom.svg" width="16" height="16" alt="carat-bottom"> | `carat-bottom` | `getIcon("carat-bottom")` | `<Icon name="carat-bottom" />` |
| <img src="readme-assets/carat-left.svg" width="16" height="16" alt="carat-left"> | `carat-left` | `getIcon("carat-left")` | `<Icon name="carat-left" />` |
| <img src="readme-assets/carat-right.svg" width="16" height="16" alt="carat-right"> | `carat-right` | `getIcon("carat-right")` | `<Icon name="carat-right" />` |
| <img src="readme-assets/carat-top.svg" width="16" height="16" alt="carat-top"> | `carat-top` | `getIcon("carat-top")` | `<Icon name="carat-top" />` |
| <img src="readme-assets/check.svg" width="16" height="16" alt="check"> | `check` | `getIcon("check")` | `<Icon name="check" />` |
| <img src="readme-assets/circle.svg" width="16" height="16" alt="circle"> | `circle` | `getIcon("circle")` | `<Icon name="circle" />` |
| <img src="readme-assets/cloud.svg" width="16" height="16" alt="cloud"> | `cloud` | `getIcon("cloud")` | `<Icon name="cloud" />` |
| <img src="readme-assets/code.svg" width="16" height="16" alt="code"> | `code` | `getIcon("code")` | `<Icon name="code" />` |
| <img src="readme-assets/cog.svg" width="16" height="16" alt="cog"> | `cog` | `getIcon("cog")` | `<Icon name="cog" />` |
| <img src="readme-assets/collapse.svg" width="16" height="16" alt="collapse"> | `collapse` | `getIcon("collapse")` | `<Icon name="collapse" />` |
| <img src="readme-assets/contact.svg" width="16" height="16" alt="contact"> | `contact` | `getIcon("contact")` | `<Icon name="contact" />` |
| <img src="readme-assets/content.svg" width="16" height="16" alt="content"> | `content` | `getIcon("content")` | `<Icon name="content" />` |
| <img src="readme-assets/copy.svg" width="16" height="16" alt="copy"> | `copy` | `getIcon("copy")` | `<Icon name="copy" />` |
| <img src="readme-assets/desktop.svg" width="16" height="16" alt="desktop"> | `desktop` | `getIcon("desktop")` | `<Icon name="desktop" />` |
| <img src="readme-assets/discord.svg" width="16" height="16" alt="discord"> | `discord` | `getIcon("discord")` | `<Icon name="discord" />` |
| <img src="readme-assets/download.svg" width="16" height="16" alt="download"> | `download` | `getIcon("download")` | `<Icon name="download" />` |
| <img src="readme-assets/edit.svg" width="16" height="16" alt="edit"> | `edit` | `getIcon("edit")` | `<Icon name="edit" />` |
| <img src="readme-assets/expand.svg" width="16" height="16" alt="expand"> | `expand` | `getIcon("expand")` | `<Icon name="expand" />` |
| <img src="readme-assets/figma.svg" width="16" height="16" alt="figma"> | `figma` | `getIcon("figma")` | `<Icon name="figma" />` |
| <img src="readme-assets/file.svg" width="16" height="16" alt="file"> | `file` | `getIcon("file")` | `<Icon name="file" />` |
| <img src="readme-assets/filter.svg" width="16" height="16" alt="filter"> | `filter` | `getIcon("filter")` | `<Icon name="filter" />` |
| <img src="readme-assets/folder.svg" width="16" height="16" alt="folder"> | `folder` | `getIcon("folder")` | `<Icon name="folder" />` |
| <img src="readme-assets/github.svg" width="16" height="16" alt="github"> | `github` | `getIcon("github")` | `<Icon name="github" />` |
| <img src="readme-assets/google.svg" width="16" height="16" alt="google"> | `google` | `getIcon("google")` | `<Icon name="google" />` |
| <img src="readme-assets/heart.svg" width="16" height="16" alt="heart"> | `heart` | `getIcon("heart")` | `<Icon name="heart" />` |
| <img src="readme-assets/home.svg" width="16" height="16" alt="home"> | `home` | `getIcon("home")` | `<Icon name="home" />` |
| <img src="readme-assets/image.svg" width="16" height="16" alt="image"> | `image` | `getIcon("image")` | `<Icon name="image" />` |
| <img src="readme-assets/laptop.svg" width="16" height="16" alt="laptop"> | `laptop` | `getIcon("laptop")` | `<Icon name="laptop" />` |
| <img src="readme-assets/lightbulb.svg" width="16" height="16" alt="lightbulb"> | `lightbulb` | `getIcon("lightbulb")` | `<Icon name="lightbulb" />` |
| <img src="readme-assets/link.svg" width="16" height="16" alt="link"> | `link` | `getIcon("link")` | `<Icon name="link" />` |
| <img src="readme-assets/location.svg" width="16" height="16" alt="location"> | `location` | `getIcon("location")` | `<Icon name="location" />` |
| <img src="readme-assets/lock.svg" width="16" height="16" alt="lock"> | `lock` | `getIcon("lock")` | `<Icon name="lock" />` |
| <img src="readme-assets/mail.svg" width="16" height="16" alt="mail"> | `mail` | `getIcon("mail")` | `<Icon name="mail" />` |
| <img src="readme-assets/medium.svg" width="16" height="16" alt="medium"> | `medium` | `getIcon("medium")` | `<Icon name="medium" />` |
| <img src="readme-assets/menu.svg" width="16" height="16" alt="menu"> | `menu` | `getIcon("menu")` | `<Icon name="menu" />` |
| <img src="readme-assets/message.svg" width="16" height="16" alt="message"> | `message` | `getIcon("message")` | `<Icon name="message" />` |
| <img src="readme-assets/minus.svg" width="16" height="16" alt="minus"> | `minus` | `getIcon("minus")` | `<Icon name="minus" />` |
| <img src="readme-assets/moon.svg" width="16" height="16" alt="moon"> | `moon` | `getIcon("moon")` | `<Icon name="moon" />` |
| <img src="readme-assets/nice.svg" width="16" height="16" alt="nice"> | `nice` | `getIcon("nice")` | `<Icon name="nice" />` |
| <img src="readme-assets/npm.svg" width="16" height="16" alt="npm"> | `npm` | `getIcon("npm")` | `<Icon name="npm" />` |
| <img src="readme-assets/pause.svg" width="16" height="16" alt="pause"> | `pause` | `getIcon("pause")` | `<Icon name="pause" />` |
| <img src="readme-assets/phone.svg" width="16" height="16" alt="phone"> | `phone` | `getIcon("phone")` | `<Icon name="phone" />` |
| <img src="readme-assets/plus.svg" width="16" height="16" alt="plus"> | `plus` | `getIcon("plus")` | `<Icon name="plus" />` |
| <img src="readme-assets/profile.svg" width="16" height="16" alt="profile"> | `profile` | `getIcon("profile")` | `<Icon name="profile" />` |
| <img src="readme-assets/puzzle.svg" width="16" height="16" alt="puzzle"> | `puzzle` | `getIcon("puzzle")` | `<Icon name="puzzle" />` |
| <img src="readme-assets/python.svg" width="16" height="16" alt="python"> | `python` | `getIcon("python")` | `<Icon name="python" />` |
| <img src="readme-assets/react.svg" width="16" height="16" alt="react"> | `react` | `getIcon("react")` | `<Icon name="react" />` |
| <img src="readme-assets/search.svg" width="16" height="16" alt="search"> | `search` | `getIcon("search")` | `<Icon name="search" />` |
| <img src="readme-assets/shuffle.svg" width="16" height="16" alt="shuffle"> | `shuffle` | `getIcon("shuffle")` | `<Icon name="shuffle" />` |
| <img src="readme-assets/skip.svg" width="16" height="16" alt="skip"> | `skip` | `getIcon("skip")` | `<Icon name="skip" />` |
| <img src="readme-assets/spinner.svg" width="16" height="16" alt="spinner"> | `spinner` | `getIcon("spinner")` | `<Icon name="spinner" />` |
| <img src="readme-assets/star.svg" width="16" height="16" alt="star"> | `star` | `getIcon("star")` | `<Icon name="star" />` |
| <img src="readme-assets/storybook.svg" width="16" height="16" alt="storybook"> | `storybook` | `getIcon("storybook")` | `<Icon name="storybook" />` |
| <img src="readme-assets/sun.svg" width="16" height="16" alt="sun"> | `sun` | `getIcon("sun")` | `<Icon name="sun" />` |
| <img src="readme-assets/tablet.svg" width="16" height="16" alt="tablet"> | `tablet` | `getIcon("tablet")` | `<Icon name="tablet" />` |
| <img src="readme-assets/trash.svg" width="16" height="16" alt="trash"> | `trash` | `getIcon("trash")` | `<Icon name="trash" />` |
| <img src="readme-assets/upload.svg" width="16" height="16" alt="upload"> | `upload` | `getIcon("upload")` | `<Icon name="upload" />` |
| <img src="readme-assets/x.svg" width="16" height="16" alt="x"> | `x` | `getIcon("x")` | `<Icon name="x" />` |
| <img src="readme-assets/youtube.svg" width="16" height="16" alt="youtube"> | `youtube` | `getIcon("youtube")` | `<Icon name="youtube" />` |
| <img src="readme-assets/zendesk.svg" width="16" height="16" alt="zendesk"> | `zendesk` | `getIcon("zendesk")` | `<Icon name="zendesk" />` |
