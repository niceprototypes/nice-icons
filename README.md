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

## Icons (76)

|  | Name | getIcon | `<Icon />` |
|:-:|------|---------|------------|
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/android/base.svg" width="24" height="24" alt="android"> | `android` | `getIcon("android")` | `<Icon name="android" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/apple/base.svg" width="24" height="24" alt="apple"> | `apple` | `getIcon("apple")` | `<Icon name="apple" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/arrow-bottom/base.svg" width="24" height="24" alt="arrow-bottom"> | `arrow-bottom` | `getIcon("arrow-bottom")` | `<Icon name="arrow-bottom" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/arrow-left/base.svg" width="24" height="24" alt="arrow-left"> | `arrow-left` | `getIcon("arrow-left")` | `<Icon name="arrow-left" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/arrow-right/base.svg" width="24" height="24" alt="arrow-right"> | `arrow-right` | `getIcon("arrow-right")` | `<Icon name="arrow-right" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/arrow-top/base.svg" width="24" height="24" alt="arrow-top"> | `arrow-top` | `getIcon("arrow-top")` | `<Icon name="arrow-top" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/attention/base.svg" width="24" height="24" alt="attention"> | `attention` | `getIcon("attention")` | `<Icon name="attention" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/bell/base.svg" width="24" height="24" alt="bell"> | `bell` | `getIcon("bell")` | `<Icon name="bell" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/box/base.svg" width="24" height="24" alt="box"> | `box` | `getIcon("box")` | `<Icon name="box" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/brush/base.svg" width="24" height="24" alt="brush"> | `brush` | `getIcon("brush")` | `<Icon name="brush" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/calculator/base.svg" width="24" height="24" alt="calculator"> | `calculator` | `getIcon("calculator")` | `<Icon name="calculator" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/calendar/base.svg" width="24" height="24" alt="calendar"> | `calendar` | `getIcon("calendar")` | `<Icon name="calendar" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/camera/base.svg" width="24" height="24" alt="camera"> | `camera` | `getIcon("camera")` | `<Icon name="camera" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/cancel/base.svg" width="24" height="24" alt="cancel"> | `cancel` | `getIcon("cancel")` | `<Icon name="cancel" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/carat-bottom/base.svg" width="24" height="24" alt="carat-bottom"> | `carat-bottom` | `getIcon("carat-bottom")` | `<Icon name="carat-bottom" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/carat-left/base.svg" width="24" height="24" alt="carat-left"> | `carat-left` | `getIcon("carat-left")` | `<Icon name="carat-left" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/carat-right/base.svg" width="24" height="24" alt="carat-right"> | `carat-right` | `getIcon("carat-right")` | `<Icon name="carat-right" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/carat-top/base.svg" width="24" height="24" alt="carat-top"> | `carat-top` | `getIcon("carat-top")` | `<Icon name="carat-top" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/check/base.svg" width="24" height="24" alt="check"> | `check` | `getIcon("check")` | `<Icon name="check" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/circle/base.svg" width="24" height="24" alt="circle"> | `circle` | `getIcon("circle")` | `<Icon name="circle" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/cloud/base.svg" width="24" height="24" alt="cloud"> | `cloud` | `getIcon("cloud")` | `<Icon name="cloud" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/code/base.svg" width="24" height="24" alt="code"> | `code` | `getIcon("code")` | `<Icon name="code" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/cog/base.svg" width="24" height="24" alt="cog"> | `cog` | `getIcon("cog")` | `<Icon name="cog" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/collapse/base.svg" width="24" height="24" alt="collapse"> | `collapse` | `getIcon("collapse")` | `<Icon name="collapse" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/contact/base.svg" width="24" height="24" alt="contact"> | `contact` | `getIcon("contact")` | `<Icon name="contact" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/content/base.svg" width="24" height="24" alt="content"> | `content` | `getIcon("content")` | `<Icon name="content" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/copy/base.svg" width="24" height="24" alt="copy"> | `copy` | `getIcon("copy")` | `<Icon name="copy" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/desktop/base.svg" width="24" height="24" alt="desktop"> | `desktop` | `getIcon("desktop")` | `<Icon name="desktop" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/discord/base.svg" width="24" height="24" alt="discord"> | `discord` | `getIcon("discord")` | `<Icon name="discord" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/download/base.svg" width="24" height="24" alt="download"> | `download` | `getIcon("download")` | `<Icon name="download" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/edit/base.svg" width="24" height="24" alt="edit"> | `edit` | `getIcon("edit")` | `<Icon name="edit" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/expand/base.svg" width="24" height="24" alt="expand"> | `expand` | `getIcon("expand")` | `<Icon name="expand" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/figma/base.svg" width="24" height="24" alt="figma"> | `figma` | `getIcon("figma")` | `<Icon name="figma" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/file/base.svg" width="24" height="24" alt="file"> | `file` | `getIcon("file")` | `<Icon name="file" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/filter/base.svg" width="24" height="24" alt="filter"> | `filter` | `getIcon("filter")` | `<Icon name="filter" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/folder/base.svg" width="24" height="24" alt="folder"> | `folder` | `getIcon("folder")` | `<Icon name="folder" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/github/base.svg" width="24" height="24" alt="github"> | `github` | `getIcon("github")` | `<Icon name="github" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/google/base.svg" width="24" height="24" alt="google"> | `google` | `getIcon("google")` | `<Icon name="google" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/heart/base.svg" width="24" height="24" alt="heart"> | `heart` | `getIcon("heart")` | `<Icon name="heart" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/home/base.svg" width="24" height="24" alt="home"> | `home` | `getIcon("home")` | `<Icon name="home" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/image/base.svg" width="24" height="24" alt="image"> | `image` | `getIcon("image")` | `<Icon name="image" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/info/base.svg" width="24" height="24" alt="info"> | `info` | `getIcon("info")` | `<Icon name="info" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/laptop/base.svg" width="24" height="24" alt="laptop"> | `laptop` | `getIcon("laptop")` | `<Icon name="laptop" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/lightbulb/base.svg" width="24" height="24" alt="lightbulb"> | `lightbulb` | `getIcon("lightbulb")` | `<Icon name="lightbulb" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/link/base.svg" width="24" height="24" alt="link"> | `link` | `getIcon("link")` | `<Icon name="link" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/location/base.svg" width="24" height="24" alt="location"> | `location` | `getIcon("location")` | `<Icon name="location" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/lock/base.svg" width="24" height="24" alt="lock"> | `lock` | `getIcon("lock")` | `<Icon name="lock" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/mail/base.svg" width="24" height="24" alt="mail"> | `mail` | `getIcon("mail")` | `<Icon name="mail" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/medium/base.svg" width="24" height="24" alt="medium"> | `medium` | `getIcon("medium")` | `<Icon name="medium" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/menu/base.svg" width="24" height="24" alt="menu"> | `menu` | `getIcon("menu")` | `<Icon name="menu" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/message/base.svg" width="24" height="24" alt="message"> | `message` | `getIcon("message")` | `<Icon name="message" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/minus/base.svg" width="24" height="24" alt="minus"> | `minus` | `getIcon("minus")` | `<Icon name="minus" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/moon/base.svg" width="24" height="24" alt="moon"> | `moon` | `getIcon("moon")` | `<Icon name="moon" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/nice/base.svg" width="24" height="24" alt="nice"> | `nice` | `getIcon("nice")` | `<Icon name="nice" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/npm/base.svg" width="24" height="24" alt="npm"> | `npm` | `getIcon("npm")` | `<Icon name="npm" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/pause/base.svg" width="24" height="24" alt="pause"> | `pause` | `getIcon("pause")` | `<Icon name="pause" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/phone/base.svg" width="24" height="24" alt="phone"> | `phone` | `getIcon("phone")` | `<Icon name="phone" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/plus/base.svg" width="24" height="24" alt="plus"> | `plus` | `getIcon("plus")` | `<Icon name="plus" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/profile/base.svg" width="24" height="24" alt="profile"> | `profile` | `getIcon("profile")` | `<Icon name="profile" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/puzzle/base.svg" width="24" height="24" alt="puzzle"> | `puzzle` | `getIcon("puzzle")` | `<Icon name="puzzle" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/python/base.svg" width="24" height="24" alt="python"> | `python` | `getIcon("python")` | `<Icon name="python" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/react/base.svg" width="24" height="24" alt="react"> | `react` | `getIcon("react")` | `<Icon name="react" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/search/base.svg" width="24" height="24" alt="search"> | `search` | `getIcon("search")` | `<Icon name="search" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/shuffle/base.svg" width="24" height="24" alt="shuffle"> | `shuffle` | `getIcon("shuffle")` | `<Icon name="shuffle" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/skip/base.svg" width="24" height="24" alt="skip"> | `skip` | `getIcon("skip")` | `<Icon name="skip" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/spinner/base.svg" width="24" height="24" alt="spinner"> | `spinner` | `getIcon("spinner")` | `<Icon name="spinner" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/star/base.svg" width="24" height="24" alt="star"> | `star` | `getIcon("star")` | `<Icon name="star" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/storybook/base.svg" width="24" height="24" alt="storybook"> | `storybook` | `getIcon("storybook")` | `<Icon name="storybook" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/sun/base.svg" width="24" height="24" alt="sun"> | `sun` | `getIcon("sun")` | `<Icon name="sun" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/tablet/base.svg" width="24" height="24" alt="tablet"> | `tablet` | `getIcon("tablet")` | `<Icon name="tablet" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/trash/base.svg" width="24" height="24" alt="trash"> | `trash` | `getIcon("trash")` | `<Icon name="trash" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/upload/base.svg" width="24" height="24" alt="upload"> | `upload` | `getIcon("upload")` | `<Icon name="upload" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/watch/base.svg" width="24" height="24" alt="watch"> | `watch` | `getIcon("watch")` | `<Icon name="watch" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/x/base.svg" width="24" height="24" alt="x"> | `x` | `getIcon("x")` | `<Icon name="x" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/youtube/base.svg" width="24" height="24" alt="youtube"> | `youtube` | `getIcon("youtube")` | `<Icon name="youtube" />` |
| <img src="https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/generated/zendesk/base.svg" width="24" height="24" alt="zendesk"> | `zendesk` | `getIcon("zendesk")` | `<Icon name="zendesk" />` |
