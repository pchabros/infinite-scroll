type CharacterStatus = "" | "alive" | "dead" | "unknown";

type CharacterData = {
  id: number;
  name: string;
  status: CharacterStatus;
  image: string;
  page?: number;
};

export { CharacterStatus, CharacterData };
