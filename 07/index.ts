const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// @ts-ignore
const input = await Deno.readTextFile('./input.txt');

function arrayEquals(arrayOne, arrayTwo) {
  return (
    arrayOne.length === arrayTwo.length &&
    arrayOne.every((value, i) => value === arrayTwo[i])
  );
}

function modifyTree(tree, newKey, newVal, destination, path = []) {
  const newTree = Object.entries(tree).reduce((newTree, [key, value]) => {
    // recursively deep copy
    const nextValue =
      typeof value === "object"
        ? modifyTree(value, newKey, newVal, destination, [...path, key])
        : value;
    return { ...newTree, [key]: nextValue };
  }, {});
  return arrayEquals(destination, path)
    ? { ...newTree, [newKey]: newVal }
    : newTree;
}

// split up sample input

const lines = input.split("\n");
const { sizes } = lines.reduce(
  ({ sizes, location }, line) => {
    const doNothing = () => ({ sizes, location });

    const closeDirectory = () => ({ sizes, location: location.slice(0, -1) });

    const goToHomeDirectory = () => ({ sizes, location: [""] });

    const openDirectory = (line) => {
      const dir = line.match(/\$ cd (\w+)/)[1];
      return { sizes, location: [...location, dir] };
    };

    const createFile = (line) => {
      const size = Number(line.match(/(\d+) .+/)[1]);
      const { nextSizes } = location.reduce(
        ({ nextSizes, path }, dir) => {
          const nextPath = `${path}${dir}/`;
          return {
            path: nextPath,
            nextSizes: {
              ...nextSizes,
              [nextPath]: (nextSizes[nextPath] ?? 0) + size,
            },
          };
        },
        { nextSizes: sizes, path: "" }
      );
      return { sizes: nextSizes, location };
    };

    const commandMap = [
      { expression: /\$ cd \.\./, function: closeDirectory },
      { expression: /\$ cd \//, function: goToHomeDirectory },
      { expression: /\$ cd \w+/, function: openDirectory },
      { expression: /\d+ .+/, function: createFile },
    ];

    const command =
      commandMap.find(({ expression }) => expression.test(line))?.function ??
      doNothing;

    return command(line);
  },
  { sizes: {}, location: [""] }
);



const sizeSum = Object.values(sizes)
  .filter((size) => size <= 1e5)
  .reduce((sum: number, num: number) => sum + num, 0);

console.log(sizeSum);


const minDeletionSize: number = sizes["/"] - 4e7;
const deletionCandidates: Array<any> = Object.values(sizes).filter(
  (size) => size >= minDeletionSize
);
const deletionSize: number = Math.min(...deletionCandidates);

console.log(deletionSize);