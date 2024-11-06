export default class Cache<K extends string | number | symbol, V> {
  // ya, will work
  private cached: Record<K, V> = {} as any;
  private timestamps: Record<K, number> = {} as any;

  /** Seconds 'til invalidation */
  public lifetime: number;

  constructor(lifetime: number = 5 * 60 * 60) {
    this.lifetime = lifetime;
  }

  public get(key: K): V | undefined {
    if (typeof key === "string") {
      key = key.toLowerCase() as K;
    }

    const value = this.cached[key];
    if (!value) return;

    const limit = this.timestamps[key] + this.lifetime * 1000;
    const valid = Date.now() < limit;

    if (!valid) this.invalidate(key);
    else return this.cached[key];
  }

  public has(key: K): boolean {
    return !!this.get(key);
  }

  public set(key: K, value: V): V {
    this.cached[key] = value;
    this.timestamps[key] = Date.now();

    return value;
  }

  public invalidate(key: K) {
    delete this.cached[key];
    delete this.timestamps[key];
  }
}
