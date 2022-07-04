import React, { useEffect, useState } from "react";
import "./Landing.scss";

//////////////////////////////////////////////////////////////////////////
///// Initialize
//////////////////////////////////////////////////////////////////////////
interface Line {
  text: string;
  url?: string;
  color: number;
  position: number;
  before: string;
  after: string;
  spins?: boolean;
}
const lineLength = 30;

// magic number 4 => color palette length minus neturals
let colorIndex = Math.floor(Math.random() * 4);
// prettier-ignore
const initialLinks = [
  "indianakuffer","","about","work","","games","","photography","","","resume","","","","","wordsearch","","","contact",""];

const getRandomPosition = (text) => {
  return Math.min(
    Math.floor(Math.random() * lineLength) + 1,
    lineLength - 2 - text.length
  );
};
const getRandomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let line = "";
  while (line.length < length) {
    line += chars[Math.floor(Math.random() * chars.length)];
  }
  return line;
};

function getInitialLines(links: string[], spins: boolean): Line[] {
  let paletteIdx = colorIndex;
  return links.map((text): Line => {
    // text is present, iterate through palette for color
    if (text) {
      paletteIdx++;
      if (paletteIdx >= 4) {
        paletteIdx = 0;
      }
    }

    let url = text;
    let color = paletteIdx;
    let position = getRandomPosition(text);
    let before = getRandomString(position);
    let after = getRandomString(lineLength - text.length - position);

    // first line is unique
    if (text === "indianakuffer") {
      url = null;
      color = 0;
      position = 4;
      before = "hiim";
      after = "nicetomeetyou";
    }

    return {
      text: text,
      url: url,
      color: color,
      position: position,
      before: before,
      after: after,
      spins: spins,
    };
  });
}
const initialLines = getInitialLines(initialLinks, false);
const initialLinesSpin = initialLines.map((line) => {
  let newLine = { ...line };
  newLine.spins = true;
  return newLine;
});

const backLine = {
  text: "back",
  url: "back",
  color: 0,
  position: 26,
  before: "",
  after: "",
  spins: true,
};

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function Landing(props) {
  //////////////////////////////////////////////////////////////////////////
  ///// State
  //////////////////////////////////////////////////////////////////////////

  const [lines, setLines] = useState([...initialLines]);

  useEffect(() => {
    const lineEls = document.querySelectorAll(".line");
    lineEls.forEach((line) => line.classList.add("fadein"));
  }, []);

  useEffect(() => {
    const spinningLineEls = document.querySelectorAll(".spins");
    spinningLineEls.forEach((lineEl, idx) => {
      clearScreen(lineEl);
      setTimeout(() => {
        flipLine(lineEl, 1);
      }, idx * 25 + 25);
    });
  }, [lines]);

  //////////////////////////////////////////////////////////////////////////
  ///// Handling
  //////////////////////////////////////////////////////////////////////////

  function handleCharPointerEnter(ev: React.PointerEvent<HTMLDivElement>) {
    const charEl = ev.target;
    flipChar(charEl as HTMLElement, 2);
  }

  function handleLinkClick(ev: Event) {
    let target = ev.target as HTMLElement;
    // click targets charEl, bubbles up to parent linkEl
    if (target.classList.contains("char")) {
      target = target.parentElement;
    }
    const key = target.id.slice(5);

    switch (key) {
      case "about":
        handleAboutClick();
        break;
      case "photography":
        handlePhotographyClick();
        break;
      case "games":
        handleGamesClick();
        break;
      case "wordsearch":
        handleWordsearchClick();
        break;
      case "back":
        handleBackClick();
        break;
      case "work":
        handleWorkClick();
        break;
      case "resume":
        handleResumeClick();
        break;
      case "contact":
        handleContactClick();
        break;
      case "indianakuffer@gmail.com":
        window.location.href = "mailto:indianakuffer@gmail.com";
        break;
      case "indianakuffer.itch.io":
        window.open("https://indianakuffer.itch.io/", "_blank");
        break;
      case "@indianakuffer":
        window.open("https://www.instagram.com/indianakuffer/", "_blank");
        break;
      case "github":
        window.open("https://github.com/indianakuffer/", "_blank");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/indianakuffer/", "_blank");
        break;
      case "here":
        window.open(
          "https://drive.google.com/file/d/1gJyXcevNzScTAsEuCdUoRC4fEU5NN2_2/view?usp=sharing",
          "_blank"
        );
        break;
      case "Ripple Design System":
        window.open("https://ripple.watermarkinsights.com/", "_blank");
        break;
      case "DSI Thesis Show 2020":
        window.open("https://dsi.sva.edu/thesis-2020", "_blank");
        break;
      case "Waste Watchers":
        window.open("https://waste-watchers.netlify.app/", "_blank");
        break;
      case "Buoy":
        window.open("https://buoy.netlify.app/", "_blank");
        break;
      case "MTG Deck Builder":
        window.open(
          "https://indianakuffer.github.io/MTG-Deck-Builder",
          "_blank"
        );
        break;
      case "Zenith":
        window.open("https://indianakuffer-zenith.netlify.app/", "_blank");
        break;
      case "Old Site":
        window.open("https://indianakufferold.netlify.app", "_blank");
        break;
      case "Rhythm is 2020":
        window.open("https://indianakuffer.itch.io/rhythm-is-2020", "_blank");
        break;
      case "Ants":
        window.open("https://indianakuffer.itch.io/ants", "_blank");
        break;
      case "ZZZ Train":
        window.open("https://indianakuffer.itch.io/zzz-train", "_blank");
        break;
      case "Cait Sidhe":
        window.open("https://indianakuffer.itch.io/cait-sidhe", "_blank");
        break;
      case "Fencer":
        window.open("https://indianakuffer.itch.io/fencer", "_blank");
        break;
      case "Out of Town":
        window.open("https://tuna.itch.io/outoftown", "_blank");
        break;
      case "Bread and Circuses":
        window.open(
          "https://indianakuffer.itch.io/bread-and-circuses",
          "_blank"
        );
        break;
      case "Tetris Escape":
        window.open("https://indianakuffer.itch.io/tetris-escape", "_blank");
        break;
    }
  }

  //////// Links ////////

  function handleAboutClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("about", 0, 0),
        textOnlyLine("", 0),
        textOnlyLine("First off, hello!", 0),
        {
          text: "Indiana",
          color: 0,
          position: 8,
          before: "This is ",
          after: " speaking......",
          spins: true,
        },
        textOnlyLine("Thanks for visiting my site", 0),
        textOnlyLine("", 0),
        textOnlyLine("I'm a frontend developer", 0),
        {
          text: "games",
          url: "games",
          color: 4,
          position: 19,
          before: "with a passion for ",
          after: "",
          spins: true,
        },
        {
          text: "photography",
          url: "photography",
          color: 1,
          position: 4,
          before: "and ",
          after: "",
          spins: true,
        },
        textOnlyLine("", 0),
        textOnlyLine("I'm driven to create,", 0),
        textOnlyLine("am pretty curious,", 0),
        textOnlyLine("and like to think I'm funny", 0),
        textOnlyLine("", 0),
        textOnlyLine("sometimes", 0),
        textOnlyLine("", 0),
        textOnlyLine("Don't be a stranger,", 0),
        {
          text: "contact",
          url: "contact",
          color: 3,
          position: 17,
          before: "and feel free to ",
          after: " me...",
          spins: true,
        },
        textOnlyLine("", 0),
        backLine,
      ]
    );
  }

  function handleResumeClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("resume", 0, 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        {
          text: "My resume's length",
          color: 5,
          position: 0,
          before: "......",
          after: "......",
          spins: true,
        },
        {
          text: "Will not fit in this size box",
          color: 5,
          position: 1,
          before: ".",
          after: "",
          spins: true,
        },
        {
          text: "here",
          url: "here",
          color: 3,
          position: 21,
          before: ".....Instead, see it ",
          after: ".....",
          spins: true,
        },
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        backLine,
      ]
    );
  }

  function handleContactClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("contact", 0, 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        {
          text: "indianakuffer@gmail.com",
          url: "email",
          color: 2,
          position: 7,
          before: "email:.",
          after: "",
          spins: true,
        },
        textOnlyLine("", 0),
        {
          text: "linkedin",
          url: "linkedin",
          color: 3,
          position: 0,
          before: "",
          after: ":........indianakuffer",
          spins: true,
        },
        textOnlyLine("", 0),
        {
          text: "github",
          url: "github",
          color: 3,
          position: 0,
          before: "",
          after: ":..........indianakuffer",
          spins: true,
        },
        textOnlyLine("", 0),
        {
          text: "indianakuffer.itch.io",
          url: "itchio",
          color: 4,
          position: 9,
          before: "itchio:..",
          after: "",
          spins: true,
        },
        textOnlyLine("", 0),
        {
          text: "@indianakuffer",
          url: "instagram",
          color: 1,
          position: 16,
          before: "instagram:......",
          after: "",
          spins: true,
        },
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        backLine,
      ]
    );
  }

  function handleWorkClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("work", 0, 0),
        textOnlyLine("", 0),
        {
          text: "Ripple Design System",
          url: "work-ripple",
          color: 3,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Component library", 1),
        {
          text: "Old Site",
          url: "work-old",
          color: 1,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>The previous one", 1),
        {
          text: "Buoy",
          url: "work-buoy",
          color: 3,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Feelings journal", 1),
        {
          text: "Zenith",
          url: "work-zenith",
          color: 4,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Where's the ISS", 1),
        {
          text: "DSI Thesis Show 2020",
          url: "work-thesis",
          color: 2,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Student thesis showcase", 1),
        {
          text: "Waste Watchers",
          url: "work-wastewatchers",
          color: 1,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Recycling tracker", 1),
        {
          text: "MTG Deck Builder",
          url: "work-mtg",
          color: 0,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Card browser", 1),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        textOnlyLine("", 0),
        backLine,
      ]
    );
  }

  function handleGamesClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("games", 0, 0),
        textOnlyLine("", 0),
        {
          text: "Tetris Escape",
          url: "games-tetrisescape",
          color: 2,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Look out below", 1),
        {
          text: "Rhythm is 2020",
          url: "games-rhythm",
          color: 3,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>See the beat", 1),
        {
          text: "ZZZ Train",
          url: "games-zzz",
          color: 0,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Don't fall asleep", 1),
        {
          text: "Cait Sidhe",
          url: "games-caitsidhe",
          color: 1,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Explore a forest", 1),
        {
          text: "Out of Town",
          url: "games-outoftown",
          color: 4,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Host a party", 1),
        {
          text: "Ants",
          url: "games-ants",
          color: 1,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Live an ant life", 1),
        {
          text: "Fencer",
          url: "games-fencer",
          color: 2,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Engarde!", 1),
        {
          text: "Bread and Circuses",
          url: "games-breadandcircuses",
          color: 0,
          position: 0,
          before: "",
          after: "",
          spins: true,
        },
        textOnlyLine("∟>Entertain and die", 1),
        textOnlyLine("", 0),
        backLine,
      ]
    );
  }

  function handleWordsearchClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [
        textOnlyLine("wordsearch", 0, 0),
        textOnlyLine("bnwxbawnkvhryyprzxqixiotcbqipk", 0),
        textOnlyLine("ranqitzsrcfszmhtlghbpojejjivbi", 0),
        textOnlyLine("fcgmtwwbazyzkprimaginativeehtb", 0),
        textOnlyLine("dvodyzupoezqapxxrblfoadaptable", 0),
        textOnlyLine("rcuriousolzthbjqkfxavijphpdfsu", 0),
        textOnlyLine("cuhlpnieglbdszsmtsdvbfltfqiyli", 0),
        textOnlyLine("kjittattentiveqhsurpfgukgmxlaq", 0),
        textOnlyLine("cjrasoenxpolsyjpracticalxlbwfo", 0),
        textOnlyLine("diafvreliablelymvxxgwjnfonwzzz", 0),
        textOnlyLine("trorganizedvvtpbkedormrnwhosml", 0),
        textOnlyLine("nirsmfouedadfnyqbbaxiiyzdpsgyk", 0),
        textOnlyLine("hbkasdcmnslsutlrkoxbtgswgmcnup", 0),
        textOnlyLine("iylycindependentecfiebestnlddp", 0),
        textOnlyLine("pyztvhiugzptpunjloxnadgvkzwbmm", 0),
        textOnlyLine("pbocpiyhbroxpassionatemanwczko", 0),
        textOnlyLine("josfhnnshkabrightaaxojsquredeh", 0),
        textOnlyLine("xjohnfpkpvbovjpkyfmiqbtbjdpjhn", 0),
        textOnlyLine("lpsntcsufcyeobqkaozovjmlpzteeu", 0),
        backLine,
      ]
    );
  }

  function handlePhotographyClick() {
    props.switchScreen("Photography");
  }

  function handleBackClick() {
    replaceLines(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      initialLinesSpin
    );
  }

  //////////////////////////////////////////////////////////////////////////
  ///// Misc
  //////////////////////////////////////////////////////////////////////////

  function flipChar(charEl: Element, times: number, forceChar: string = "") {
    charEl.classList.add("flipping");

    setTimeout(() => {
      charEl.textContent =
        forceChar && times === 0 ? forceChar : getRandomString(1);
      charEl.classList.remove("flipping");

      setTimeout(() => {
        if (times > 0) {
          flipChar(charEl, times - 1, forceChar);
        }
      }, 100);
    }, 100);
  }

  function replaceLine(idx: number, lineObj: Line) {
    lineObj.spins = true;
    let newLines = lines;
    newLines[idx] = lineObj;
    setLines([...newLines]);
  }

  function replaceLines(idxs: number[], lineObjs: Line[]) {
    // lineObj.spins = true;
    let newLines = lines;
    idxs.forEach((idx, i) => (newLines[idx] = lineObjs[i]));
    // newLines[idx] = lineObj;
    setLines([...newLines]);
  }

  function flipLine(lineEl: Element, times: number) {
    lineEl.querySelectorAll(".char").forEach((charEl, idx) => {
      const targetLetter = (charEl as HTMLElement).dataset.char;
      charEl.textContent = getRandomString(1);
      setTimeout(() => {
        flipChar(charEl, times, targetLetter);
      }, Math.random() * 25);
    });
  }

  function clearScreen(lineEl: Element) {
    lineEl.querySelectorAll(".char").forEach((charEl, idx) => {
      charEl.textContent = ".";
    });
  }

  function textOnlyLine(text: string, position: number, color = 5): Line {
    return {
      text: text,
      color: color,
      position: position,
      before: "",
      after: "",
      spins: true,
    };
  }

  //////////////////////////////////////////////////////////////////////////
  ///// Rendering
  //////////////////////////////////////////////////////////////////////////

  function renderLine(lineObj: Line, lineIdx: number) {
    return (
      <div
        className={`line ${lineObj.spins ? "spins" : ""}`}
        style={{
          // @ts-ignore custom style
          "--linelength": lineLength,
        }}
        key={`line${lineIdx}`}
      >
        {lineObj.before
          ? renderChars(lineObj.before, lineIdx)
          : renderSpacers(lineObj.position, lineIdx)}
        {lineObj.text && renderLink(lineObj)}
        {lineObj.after
          ? renderChars(lineObj.after, lineIdx)
          : renderSpacers(
              lineLength - lineObj.text.length - lineObj.position,
              lineIdx
            )}
      </div>
    );
  }

  function renderLink(lineObj: Line) {
    const { text, url } = lineObj;
    return (
      <div
        id={`text-${text}`}
        className={`text ${url ? "url" : ""}`}
        onPointerDown={(ev) => handleLinkClick(ev)}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleLinkClick(ev);
          }
        }}
        tabIndex={url ? 0 : -1}
        style={{
          //@ts-ignore custom style
          "--linklength": text.length,
          "--color": props.colorPalette[lineObj.color],
        }}
      >
        {text.split("").map((char, i) => (
          <div key={text + i} className="char" data-char={char}>
            {char}
          </div>
        ))}
      </div>
    );
  }

  function renderSpacers(amount: number, lineIdx: number) {
    return new Array(amount).fill(null).map((x, i) => {
      return (
        <div
          key={`line${lineIdx}spacer${i}`}
          className="char spacer"
          data-char="."
        >
          .
        </div>
      );
    });
  }

  function renderChars(string: string, lineIdx: number) {
    return string.split("").map((char, i) => (
      <div
        className="char"
        onPointerEnter={(ev) => handleCharPointerEnter(ev)}
        key={`line${lineIdx}${string}${i}`}
        data-char={char}
      >
        {char}
      </div>
    ));
  }

  return (
    <>{lines.map((lineObj: Line, idx: number) => renderLine(lineObj, idx))}</>
  );
}

export default Landing;
