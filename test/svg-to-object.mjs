import test from 'ava';

import { svgToObject } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [() => svgToObject({ version: 4 })]);

async function TransformMacro(t, input, options) {
  return TransformSnapshot(t, input, svgToObject, options);
}

test(
  'default',
  TransformMacro,
  '<img alt={"sdfd"} src={require("./abc.svg").default} />',
);
