type CharacterStatus = "" | "alive" | "dead" | "unknown";

type CharacterData = {
  id: number;
  name: string;
  status: CharacterStatus;
  image: string;
};

export { CharacterStatus, CharacterData };
