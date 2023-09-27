import { useState, useEffect } from "react";
import "./App.css";
import weaponsData from "./weaponsData/weapons.json";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";

const categoryNames = {
  Shooter: "射擊槍",
  Blaster: "爆裂槍",
  Roller: "滾筒",
  Brush: "筆刷",
  Charger: "狙擊",
  Slosher: "桶",
  Splatling: "格",
  Dualies: "雙槍",
  Brella: "傘",
  Stringer: "弓",
  Splatana: "刮水刀",
};

function App() {
  const [randomWeapons, setRandomWeapons] = useState([]);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const numberOfWeaponsToPick = 8;
  const [selectedCategories, setSelectedCategories] = useState([]); // 初始为空数组

  const toggleDuplicates = () => {
    setAllowDuplicates((prev) => !prev);
  };

  const pickRandomWeapons = () => {
    const weapons = weaponsData.weapons;

    const filteredWeapons = weapons.filter((weapon) =>
      selectedCategories.includes(weapon.series)
    );

    const selectedWeapons = [];

    while (selectedWeapons.length < numberOfWeaponsToPick) {
      const randomIndex = Math.floor(Math.random() * filteredWeapons.length);
      const selectedWeapon = filteredWeapons[randomIndex];

      if (
        (allowDuplicates ||
          !selectedWeapons.some((w) => w.name.tw === selectedWeapon.name.tw)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(selectedWeapon.series))
      ) {
        selectedWeapons.push(selectedWeapon);
      }
    }

    setRandomWeapons(selectedWeapons);
  };

  const weaponCategories = Array.from(
    new Set(weaponsData.weapons.map((weapon) => weapon.series))
  );

  useEffect(() => {
    setSelectedCategories(weaponCategories);
  }, []);

  return (
    <>
      <div className="title">
        <h1 style={{ color: "#7d7dfa" }}>Splatoon</h1>
        <h1>私房武器抽選</h1>
      </div>
      <div className="picker">
        <FormControl
          component="fieldset"
          sx={{
            m: 1,
            minWidth: 120,
            height: 38,
            margin: 0,
          }}
          size="small"
        >
          <InputLabel>選擇武器分類</InputLabel>
          <Autocomplete
            multiple
            id="category-select"
            options={weaponCategories}
            disableCloseOnSelect
            value={selectedCategories}
            sx={{
              margin: 0,
              height: "100%",
              "& .css-57j86e-MuiFormControl-root": {
                margin: 0,
              },
            }}
            onChange={(event, newValue) => {
              setSelectedCategories(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <FormControlLabel
                  control={<Checkbox checked={selected} />}
                  label={categoryNames[option]}
                />
              </li>
            )}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} style={{ height: "100%" }}>
                <input {...params.inputProps} style={{ height: "100%" }} />
              </div>
            )}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            minWidth: 120,
            height: 38,
            "& .css-1bzms6n-MuiInputBase-root-MuiInput-root-MuiSelect-root:hover:not(.Mui-disabled, .Mui-error):before":
              {
                borderBottom: "1px solid #646cff",
              },
          }}
          size="small"
        >
          <Select
            labelId="duplicates-label"
            id="duplicates-select"
            value={allowDuplicates}
            onChange={toggleDuplicates}
            sx={{
              transition: "border-color 0.3s ease",
              height: "100%",
            }}
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
              <div
                key={index}
                className="weapon"
                style={{ borderColor: "#5b37de" }}
              >
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
              <div
                key={index}
                className="weapon"
                style={{ borderColor: "#dbe100" }}
              >
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
