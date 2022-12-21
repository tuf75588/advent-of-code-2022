const ropeInput = await Deno.readTextFile("./input.txt");

// @ts-ignore
const directions = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

// @ts-ignore
const coordsToHash = (r, c) => r * 1e5 + c;

const movePoint = (point, direction) => {
  const nextPoint = point.map((component, i) => component + direction[i]);
  return nextPoint;
};

// function to move a tail knot

const followPoint = (leadingPoint, followingPoint) => {
  const pointDiff = leadingPoint.map(
    (component, i) => component - followingPoint[i]
  );

  const direction = pointDiff.map((component) => {
    const sign = Math.sign(component);
    return component ? sign * (sign * component - 1) : 0;
  });

  const nextPoint = direction.some((component) => component)
    ? leadingPoint.map((component, i) => component - direction[i])
    : followingPoint;

  return nextPoint;
};
