import {
  testIsTypeForIntType,
  testIsTypeForStringType,
} from '../../../test-methods';

describe('primitive-types', function () {
  testIsTypeForIntType('Uint4', 0, 15);
  testIsTypeForIntType('Uint5', 0, 31);
  testIsTypeForIntType('Uint8', 0, 255);

  testIsTypeForStringType(
    'HexadecimalColorString',
    ['#c00', '#ffefff', '#DDD', '#abcdef', '#c0ffee'],
    ['ffffff', 'rgb(255,0,255)', 'fff']
  );

  testIsTypeForStringType(
    'CoilSnakeColorString',
    ['vvv', '07u', '123'],
    ['w00', 'vv', 'a00a'],
    'lower'
  );

  testIsTypeForStringType(
    'CoilSnakeMinitilePaletteString',
    [
      '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000',
      '000oqj0v00v0l7v0v0k0vv6nt0cj69c67vvvnopghkk0p000',
      '0000vv0vv1446221343434592347ad3574362343580vv111',
    ],
    [
      '0000vv0vv1446221343434592347ad3574362343580vv11',
      '000oqj0v00v0l7v0v0k0vv6nt0cj69c67vvvnopghkk0p0000',
      'w00000000000000000000000000000000000000000000000',
    ],
    'lower'
  );
});
