import generateUniqueId from "generate-unique-id";

export function generateMeetingCode() {
  const id1 = generateUniqueId({
    length: 4,
    useLetters: true,
    includeSymbols: ["@", "#"],
  });

  const id2 = generateUniqueId({
    length: 4,
    useLetters: true,
    includeSymbols: ["@", "#"],
  });

  return `Face-${id1}-${id2}-Nest`;
}