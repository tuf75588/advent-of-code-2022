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

const lines = sampleInput.split('\n');
const fileTree = lines.reduce(
  ({ tree, location }, line) => {
    return tree;
  },
  { tree: {}, location: [] }
);
