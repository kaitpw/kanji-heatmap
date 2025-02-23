/**
 *
 * Note I have asked Grok and Deepseek to help me generate this file.
 * This is the prompt I used.
 *
 * Can you give me a code snippet in javascript to wrap a web worker (onmessage, postmessage) into a promise. this is to be used in the main thread.
 * I will use this in a react component. Additionally, it seems like it is not guaranteed that given a sequence of postMessage requests,
 * the corresponding onMessage result is delivered in the order of the sequence of requests. If not then the pending result array of resolve
 * functions need to be an object instead, with the key being requestId and the value being the response to the promise.
 *
 * Important note: Groke said the following, please be aware of this:
 *
 * A notable insight is that general worker errors (caught by onerror) can affect all pending requests, not just one.
 * This means if the worker has a script error, all pending promises are rejected, which might surprise users expecting individual request failures.
 * This behavior is crucial for React components to handle gracefully, ensuring state updates reflect the error state.
 *
 * In conclusion, the provided wrapper needs to be modified to store both resolve and reject functions for each request to handle errors properly.
 * The corrected implementation ensures promises resolve with normal responses and reject with errors, both for specific request errors and general worker errors.
 *  This is essential for React components, providing a robust way to manage web worker interactions with comprehensive error handling.
 *  The surprising detail is that general worker errors can reject all pending requests, which users should be aware of for proper error handling in their applications.
 */

export type PromiseWrappedWorker = {
  request(data: unknown): Promise<unknown>;
  terminate(): void;
};

function createKanjiWorkerWrappedInPromise(): PromiseWrappedWorker {
  const worker = new Worker(
    new URL("/src/workers/kanji-worker.ts", import.meta.url),
    {
      type: "module",
    }
  );

  let requestId = 0;
  const pendingPromises = new Map();

  worker.onmessage = (event) => {
    const { id, response } = event.data;
    const { resolve, reject } = pendingPromises.get(id);
    if (response.error) {
      reject(response.error);
    } else {
      resolve(response);
    }
    pendingPromises.delete(id);
  };

  worker.onerror = (error) => {
    console.error("Worker error:", error);
    for (const { reject } of pendingPromises.values()) {
      reject("Worker encountered an error");
    }
    pendingPromises.clear();
  };

  return {
    request(data: unknown) {
      const id = requestId++;
      return new Promise((resolve, reject) => {
        worker.postMessage({ id, data });
        pendingPromises.set(id, { resolve, reject });
      });
    },
    terminate() {
      worker.terminate();
    },
  };
}

export default createKanjiWorkerWrappedInPromise;
