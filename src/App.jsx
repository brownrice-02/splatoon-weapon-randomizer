import { useState } from "react";
import "./App.css";
import weaponsData from "./weaponsData/weapons.json";

function App() {
  const [randomWeapons, setRandomWeapons] = useState([]);
  const numberOfWeaponsToPick = 8; // 要選擇的武器數量

  const pickRandomWeapons = () => {
    const weapons = weaponsData.weapons;
    const selectedWeapons = [];

    while (selectedWeapons.length < numberOfWeaponsToPick) {
      const randomIndex = Math.floor(Math.random() * weapons.length);
      const selectedWeapon = weapons[randomIndex];

      // 確保選擇的武器不重複
      if (!selectedWeapons.some((w) => w.name.tw === selectedWeapon.name.tw)) {
        selectedWeapons.push(selectedWeapon);
      }
    }

    setRandomWeapons(selectedWeapons); // 更新隨機武器
  };

  return (
    <>
      <h1>Splatoon</h1>
      <h2>私房武器抽選</h2>
      <div className="card">
        <button onClick={pickRandomWeapons}>隨機分配武器</button>
      </div>
      {randomWeapons.length > 0 && (
        <div className="weapons-container">
          <div className="left-container">
            {randomWeapons.slice(0, 4).map((weapon, index) => (
              <div key={index} className="weapon">
                <div>
                  {weapon.name.tw} ({weapon.name.jp})
                </div>
                <img src={weapon.image} alt={weapon.name.tw} />
              </div>
            ))}
          </div>
          <div className="right-container">
            {randomWeapons.slice(4).map((weapon, index) => (
              <div key={index} className="weapon">
                <div>
                  {weapon.name.tw} ({weapon.name.jp})
                </div>
                <img src={weapon.image} alt={weapon.name.tw} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
