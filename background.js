const millisInDay = 1000 * 60 * 60 * 24;
const ln2 = Math.log(2);

let lastStepTimestamp = Date.now();

chrome.alarms.create("halflife", {
  delayInMinutes: 1,
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "halflife") return;
  const dt = Date.now() - lastStepTimestamp;
  lastStepTimestamp = Date.now();
  chrome.storage.sync.get(["halflife"], async ({ halflife = 7 }) => {
    const tau = (halflife * millisInDay) / ln2;
    const p = dt / tau;
    const tabs = await chrome.tabs.query({
      active: false,
      autoDiscardable: true,
      pinned: false,
    });
    for (const tab of tabs) {
      if (Math.random() < p) {
        chrome.tabs.remove(tab.id);
      }
    }
  });
});
