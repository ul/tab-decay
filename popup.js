const changeHalfLife = document.getElementById("halflife");
const halfLifeLabel = document.getElementById("halflife-label");

const updateHalfLifeLabel = (days) => {
  halfLifeLabel.innerText = `Half-life (${days} day${days > 1 ? "s" : ""})`;
};

changeHalfLife.addEventListener("change", (e) => {
  const halflife = parseInt(e.target.value, 10);
  chrome.storage.sync.set(
    {
      halflife,
    },
    () => updateHalfLifeLabel(halflife)
  );
});

chrome.storage.sync.get(["halflife"], ({ halflife }) => {
  changeHalfLife.value = halflife;
  updateHalfLifeLabel(halflife);
});
