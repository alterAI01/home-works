// public/heavyTask.worker.js
self.onmessage = function(event) {
  // Optional: Check event.data if specific messages are expected to trigger the task
  // For this example, any message will start the computation.
  console.log('Worker: Message received from main script. Starting heavy computation...');
  let t = 0;
  // The heavy loop, as provided in the original component
  for (let i = 0; i < 1e9; i++) {
    t += i;
  }
  console.log('Worker: Computation finished. Posting result back to main script.');
  self.postMessage(t); // Send the result back to the main thread
};

self.onerror = function(error) {
  console.error('Worker: Error occurred in worker:', error);
  // Optionally, post an error message back to the main thread
  // self.postMessage({ error: error.message });
};