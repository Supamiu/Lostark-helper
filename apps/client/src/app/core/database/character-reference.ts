export type CharacterReference = `${string}:${number}`;

export function parseCharacterReference(ref: CharacterReference | undefined): { userId: string, characterId: number } {
  if (!ref) {
    return {
      userId: "",
      characterId: 0
    };
  }
  const [userId, characterId] = ref.split(":");
  return { userId, characterId: +characterId };
}

export function isSameUser(ref: CharacterReference, userId: string): boolean {
  return parseCharacterReference(ref).userId === userId;
}

export function isSameCharacter(ref: CharacterReference, userId: string, characterId: number): boolean {
  const parsed = parseCharacterReference(ref);
  return parsed.userId === userId && parsed.characterId === characterId;
}

export function createReference(userId: string, characterId: number): CharacterReference {
  return `${userId}:${characterId}`;
}
