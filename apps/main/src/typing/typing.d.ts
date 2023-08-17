declare module 'queue-microtask' {
  function queueMicrotask(fn: () => void): void;
  export = queueMicrotask;
}

interface IEnvironment {
  production: boolean;
  apiEndpoint: string;
}
