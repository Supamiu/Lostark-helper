export class Settings {
  crystallineAura = true;
  lazytracking: Record<string, boolean> = {};
  // True = skip chest, False = take chest
  chestConfiguration: Record<string, boolean> = {};
  forceAbyss: Record<string, boolean> = {};
}
