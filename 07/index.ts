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
      typeof value === 'object'
        ? modifyTree(value, newKey, newVal, destination, [...path, key])
        : value;
    return { ...newTree, [key]: nextValue };
  }, {});
  return arrayEquals(destination, path)
    ? { ...newTree, [newKey]: newVal }
    : newTree;
}

// split up sample input

const lines = sample.split('\n');
const fileTree = lines.reduce(
  ({ tree, location }, line) => {
    const doNothing = () => ({ tree, location });
    const closeDirectory = () => ({ tree, location: location.slice(0, -1) });
    const goToHomeDirectory = () => ({ tree, location: [] });
    const openDirectory = (line) => {
      const dir = line.match(/\$ cd (\w+)/)[1];
      return { tree, location: [...location, dir] };
    };
    const createDirectory = (line) => {
      const dir = line.match(/dir (\w+)/)[1];
      const nextTree = modifyTree(tree, dir, {}, location);
      return { tree, nextTree, location };
    };

    const createFile = (line) => {
      const [size, file] = line.match(/(\d+) (.+)/).slice(1);
      const nextTree = modifyTree(tree, file, Number(size), location);
      return { tree: nextTree, location };
    };

    const commandMap = [
      { expression: /\$ ls/, function: doNothing },
      { expression: /\$ cd \.\./, function: closeDirectory },
      { expression: /\$ cd \//, function: goToHomeDirectory },
      { expression: /\$ cd \w+/, function: openDirectory },
      { expression: /dir \w+/, function: createDirectory },
      { expression: /\d+ .+/, function: createFile },
    ];

    const command = commandMap.find(({expression}) => expression.test(line)).function;
    return command(line);
  },
  { tree: {}, location: [] }
).tree;

console.log(fileTree);