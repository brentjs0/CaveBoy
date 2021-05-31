import {
  testIsTypeForIntType,
  testIsTypeForStringType,
} from '../../../test-methods';

describe('primitive-types', function () {
  testIsTypeForIntType('Uint3', 0, 7);
  testIsTypeForIntType('Uint4', 0, 15);
  testIsTypeForIntType('Uint5', 0, 31);
  testIsTypeForIntType('Uint8', 0, 255);
  testIsTypeForIntType('Uint9', 0, 511);

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

  testIsTypeForStringType(
    'CoilSnakeMinitileLayerString',
    [
      'ffffffebffffffebffffff6bffffff6cfffff6bcfffff6bcfffffbbbffff6bbb',
      'dbaa999adba999aacbaaa2abbaeeaaabba2922bcbee2abdda2922abcee2ba2bc',
      '2222222233443343342233333233344333344323f33422333f333333ff444444',
    ],
    [
      '2222222233443343342233333233344333344323f33422333f333333ff44444',
      'dbaa999adba999aacbaaa2abbaeeaaabba2922bcbee2abdda2922abcee2ba2bc1',
      'a9acaaaa99a6baaaaaa6cbbbcbxfdccd6fffffffcd6ddfffc6cbcccda6bbbbcb',
    ],
    'lower'
  );

  testIsTypeForStringType(
    'CoilSnakeMinitileString',
    [
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc\nbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc',
      '999999af99999af19999af11999af11f9aaf11f2aaf11fffaf111111ffffffff\r0000000f000000f100000f110000f11f000f11f200f11fff0f111111ffffffff',
      'aaaaaaafaaaaaaf19aaaaf1199aaf11f99af11f29af11f22af11f222f11f222f\r\n0000000f000000f100000f110000f11f000f11f200f11f220f11f222f11f222f',
      `222fffff22f111112f277777f2777777f2717111f2171717f2177717f2717717
000fffff00f111110f277777f2777777f2717111f2171717f2177717f2717717`,
    ],
    [
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc\n\nbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc',
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc\n\rbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc',
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc\r\nbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbg',
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc\r\nbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcb',
      'bcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbbcbcbcbc\r\nbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbg',
    ],
    'lower'
  );

  testIsTypeForStringType(
    'CoilSnakeArrangementCellString',
    ['abcdef', '000000', '01999e', '10bafd'],
    ['t12345', 'abcde', '0000000'],
    'lower'
  );

  testIsTypeForStringType(
    'CoilSnakePaletteSetString',
    [
      '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666',
      '000gnmdkhbcdhkidb06gih7d0de0ac189kvphpkdjgacb444000gnmdkh17ecfg6dg078h7d0de0ac1898de8bc7aa788444000gnmkvpchidjghpvbfmh7d0de0ac189dimcfhaddadd444000gnm9de8bc79a0v06feh7d0de0ac189dfjbdgabd889444000gnmdkhkkdjfhjndbchh7d0de0ac189dimcfhadd9a8444000gnmdkh0v0kkd0v0bbd0af0de0ac189dimcfhadd9a8444',
      '000oooiiigggdddlllhhhmddllljjjhhhllljjjhhhfffddd000llliiigggdddlllllldddllljjjhhhllljjjhhhfffddd000rrrpppmmm000000hhhrrrnnnooohhh000ooohhhkkkddd000llliiigggdddlllhhhdddllljjjhhhllljjjhhhfffddd000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644',
    ],
    [
      '000oooiiigggdddlllhhhmddllljjjhhhllljjjhhhfffddd000llliiigggdddlllllldddllljjjhhhllljjjhhhfffddd000rrrpppmmm000000hhhrrrnnnooohhh000ooohhhkkkddd000llliiigggdddlllhhhdddllljjjhhhllljjjhhhfffddd00000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644',
      '000gnmdkhbcdhkidb06gih7d0de0ac189kvphpkdjgacb444000gnmdkh17ecfg6dg078h7d0de0ac1898de8bc7aa788444000gnmkvpchidjghpvbfmh7d0de0ac189dimcfhadddadd444000gnm9de8bc79a0v06feh7d0de0ac189dfjbdgabd889444000gnmdkhkkdjfhjndbchh7d0de0ac189dimcfhadd9a8444000gnmdkh0v0kkd0v0bbd0af0de0ac189dimcfhadd9a8444',
      '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqozjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666',
    ],
    'lower'
  );

  testIsTypeForStringType(
    'CoilSnakeArrangementString',
    [
      'abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      '0c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c14800c1480',
      '0d1d800c7f900c80800cf8904d2c804d2b800cf8800cf8804d41804d40800cf8800cf8804cf8800cf8800cf8800cf880',
      '0da4800da5900dd8800dd9900cf8800cf8800dd8800dd9800cf8800cf8800dd8804df1804cf8800da4800da5800dd880',
    ],
    ['00000k', '00000', '0000000'],
    'lower'
  );
});
