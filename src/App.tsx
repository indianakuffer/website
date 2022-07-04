import { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import "./App.scss";
import Landing from "./Screens/Landing.tsx";
import Photography from "./Screens/Photography.tsx";

const themes = {
  original: [
    "#fb4943",
    "#9eb100",
    "#ecc100",
    "#93d1d1",
    "#F06389",
    "#ebdbb2",
    "#282828",
  ],
  highContrast: [
    "#fa0b02",
    "#dff705",
    "#f7cb05",
    "#02fafa",
    "#ff96b3",
    "#fff4d6",
    "#171717",
  ],
};

function App() {
  const [colorPalette, setColorPalette] = useState(themes.original);
  const [screen, setScreen] = useState("Landing");
  const [bigBackground, setBigBackground] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = colorPalette[6];
    document.body.style.color = colorPalette[5];
  }, [colorPalette]);

  useEffect(() => {
    switch (screen) {
      case "Landing":
        setBigBackground(false);
        break;
      case "Photography":
        setBigBackground(true);
        break;
    }
  }, [screen]);

  const springMain = useSpring({
    from: {
      clipPath: "polygon(0% 0%, 0% 0%, -100% 100%, 0% 100%)",
    },
    to: {
      clipPath: "polygon(0% 0%, 200% 0%, 100% 100%, 0% 100%)",
    },
    config: config.molasses,
    delay: 200,
  });

  const springBackground = useSpring({
    clipPath: bigBackground
      ? "polygon(0% 0%, 200% 0%, 100% 100%, 0% 100%)"
      : "polygon(0% 0%, 10% 0%, -40% 100%, 0% 100%)",
    config: config.slow,
  });

  function switchTheme(name: string) {
    setColorPalette(themes[name]);
  }

  function switchScreen(newScreen) {
    setScreen(newScreen);
  }

  function renderColorBlock() {
    return (
      <div className="colorblock-wrapper">
        {colorPalette.map((color, idx) => (
          <div
            key={`color${idx}`}
            className="colorblock"
            // @ts-ignore custom style
            style={{ "--color": colorPalette[idx] }}
          ></div>
        ))}
      </div>
    );
  }

  function renderThemeSwitcher() {
    return (
      <button
        className="theme-switcher --positive"
        onClick={() => {
          switchTheme("highContrast");
        }}
      >
        switch theme
      </button>
    );
  }

  function renderScreen() {
    let screenToRender = <></>;
    switch (screen) {
      case "Landing":
        screenToRender = (
          <Landing colorPalette={colorPalette} switchScreen={switchScreen} />
        );
        break;
      case "Photography":
        screenToRender = <Photography switchScreen={switchScreen} />;
        break;
    }
    return screenToRender;
  }

  return (
    <animated.main style={springMain}>
      <animated.div
        className="accent"
        // @ts-ignore to allow for custom property
        style={{ "--color": colorPalette[5], ...springBackground }}
      ></animated.div>
      <div className="square">{renderScreen()}</div>
      {/* {renderThemeSwitcher()} */}
      {renderColorBlock()}
    </animated.main>
  );
}

export default App;
