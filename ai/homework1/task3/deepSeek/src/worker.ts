// dashboard.worker.ts
self.onmessage = function () {
  try {
    let t = 0;
    for (let i = 0; i < 1e9; i++) {
      t += i;
      // Yield every 1e7 iterations to prevent blocking
      if (i % 1e7 === 0) self.postMessage({ type: 'progress', value: i / 1e7 });
    }
    self.postMessage(t);
  } catch (e) {
    self.postMessage({ type: 'error', message: e.message });
  }
};