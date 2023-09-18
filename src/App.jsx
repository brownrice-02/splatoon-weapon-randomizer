import { useState } from "react";
import "./App.css";
import weaponsData from "./weaponsData/weapons.json";

function App() {
  const [randomWeapon, setRandomWeapon] = useState(null);

  const pickRandomWeapon = () => {
    const weapons = weaponsData.weapons;
    // 從這些武器中隨機選擇一個
    const randomIndex = Math.floor(Math.random() * weapons.length);
    const selectedWeapon = weapons[randomIndex];

    setRandomWeapon(selectedWeapon); // 更新隨機武器
  };
  return (
    <>
      <h1>Splatoon</h1>
      <h2>私房武器抽選</h2>
      <div className="card">
        <button onClick={pickRandomWeapon}>隨機分配武器</button>
      </div>
      {randomWeapon && (
        <div>
          <div>
            {randomWeapon.name.tw}({randomWeapon.name.jp})
          </div>
          <img src={randomWeapon.image} alt={randomWeapon.name.tw} />
        </div>
      )}
    </>
  );
}

export default App;
