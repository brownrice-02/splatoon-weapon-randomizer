import { useState } from "react";
import "./App.css";
import weaponsData from "./weaponsData/weapons.json";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function App() {
  const [randomWeapons, setRandomWeapons] = useState([]);
  const [allowDuplicates, setAllowDuplicates] = useState(false); // 是否允許重複選擇
  const numberOfWeaponsToPick = 8; // 要選擇的武器數量

  const toggleDuplicates = () => {
    setAllowDuplicates((prev) => !prev);
  };

  const pickRandomWeapons = () => {
    const weapons = weaponsData.weapons;
    const selectedWeapons = [];

    while (selectedWeapons.length < numberOfWeaponsToPick) {
      const randomIndex = Math.floor(Math.random() * weapons.length);
      const selectedWeapon = weapons[randomIndex];

      // 檢查是否允許重複選擇或選擇的武器不在已選擇列表中
      if (
        allowDuplicates ||
        !selectedWeapons.some((w) => w.name.tw === selectedWeapon.name.tw)
      ) {
        selectedWeapons.push(selectedWeapon);
      }
    }

    setRandomWeapons(selectedWeapons); // 更新隨機武器
  };

  return (
    <>
      <div className="title">
        <h1 style={{ color: "#7d7dfa" }}>Splatoon</h1>
        <h1>私房武器抽選</h1>
      </div>
      <div className="picker">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <Select
            labelId="duplicates-label"
            id="duplicates-select"
            value={allowDuplicates}
            onChange={toggleDuplicates}
          >
            <MenuItem value={false}>不重複</MenuItem>
            <MenuItem value={true}>可重複</MenuItem>
          </Select>
        </FormControl>
        <button onClick={pickRandomWeapons}>隨機分配武器</button>
      </div>
      {randomWeapons.length > 0 && (
        <div className="weapons-container">
          <div className="team">
            {randomWeapons.slice(0, 4).map((weapon, index) => (
              <div key={index} className="weapon">
                <div className="weapon-text">
                  <p>{weapon.name.tw}</p>
                  <p className="weapon-text-jp">({weapon.name.jp})</p>
                </div>
                <img src={weapon.image} alt={weapon.name.tw} />
              </div>
            ))}
          </div>
          <div className="team">
            {randomWeapons.slice(4).map((weapon, index) => (
              <div key={index} className="weapon">
                <div className="weapon-text">
                  <p>{weapon.name.tw}</p>
                  <p className="weapon-text-jp">({weapon.name.jp})</p>
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
