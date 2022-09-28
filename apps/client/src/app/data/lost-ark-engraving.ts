export interface LostArkEngraving {
  id: number,
  type: "negative" | "positive" | undefined,
  name: string,
  nodes: [string, string, string]
}
