import test from 'ava';

import { svgToObject } from '../lib/index.mjs';

import { TransformSnapshot } from './helper/lib.mjs';

async function TransformMacro(t, input, options) {
  return TransformSnapshot(t, input, svgToObject, options);
}

test(
  'default',
  TransformMacro,
  '<img alt={"sdfd"} src={require("./abc.svg").default} />',
);
