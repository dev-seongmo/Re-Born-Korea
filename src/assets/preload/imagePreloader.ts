const loadedImages = new Set<string>();
const loadingImages = new Map<string, Promise<void>>();

type IdleDeadlineLike = {
  timeRemaining: () => number;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadlineLike) => void,
    options?: { timeout?: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function hasBrowserImageApi() {
  return typeof window !== "undefined" && typeof Image !== "undefined";
}

export function preloadImage(src: string | null | undefined): Promise<void> {
  if (!src || !hasBrowserImageApi()) {
    return Promise.resolve();
  }

  if (loadedImages.has(src)) {
    return Promise.resolve();
  }

  const activeRequest = loadingImages.get(src);

  if (activeRequest) {
    return activeRequest;
  }

  const request = new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => {
      loadedImages.add(src);
      loadingImages.delete(src);
      resolve();
    };

    image.onerror = () => {
      loadingImages.delete(src);
      resolve();
    };

    image.src = src;
  });

  loadingImages.set(src, request);
  return request;
}

export function preloadImages(sources: Array<string | null | undefined>) {
  return Promise.all(uniqueSources(sources).map((src) => preloadImage(src)));
}

export function preloadImagesWhenIdle(
  sources: Array<string | null | undefined>,
  options: {
    batchSize?: number;
    timeout?: number;
  } = {},
) {
  if (!hasBrowserImageApi()) {
    return () => undefined;
  }

  const pendingSources = uniqueSources(sources).filter(
    (src) => !loadedImages.has(src),
  );
  const batchSize = options.batchSize ?? 4;
  const timeout = options.timeout ?? 1000;
  const idleWindow = window as WindowWithIdleCallback;
  let idleHandle: number | null = null;
  let timeoutHandle: number | null = null;
  let cancelled = false;

  function clearScheduledWork() {
    if (idleHandle !== null && idleWindow.cancelIdleCallback) {
      idleWindow.cancelIdleCallback(idleHandle);
    }

    if (timeoutHandle !== null) {
      window.clearTimeout(timeoutHandle);
    }

    idleHandle = null;
    timeoutHandle = null;
  }

  function runBatch() {
    if (cancelled || pendingSources.length === 0) {
      return;
    }

    const batch = pendingSources.splice(0, batchSize);
    void preloadImages(batch);

    if (pendingSources.length > 0) {
      scheduleNextBatch();
    }
  }

  function scheduleNextBatch() {
    clearScheduledWork();

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => runBatch(), {
        timeout,
      });
      return;
    }

    timeoutHandle = window.setTimeout(runBatch, 120);
  }

  scheduleNextBatch();

  return () => {
    cancelled = true;
    clearScheduledWork();
  };
}

function uniqueSources(sources: Array<string | null | undefined>) {
  return Array.from(
    new Set(sources.filter((src): src is string => Boolean(src))),
  );
}
