interface HeadingNode {
  value?: string;
  children?: HeadingNode[];
}

const getHeadingText = (node: HeadingNode): string =>
  node.value ?? node.children?.map(getHeadingText).join('') ?? '';

export const getHeadingId = (node?: HeadingNode): string =>
  (node ? getHeadingText(node) : '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
