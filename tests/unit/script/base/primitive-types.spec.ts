import {
  testIsTypeForIntType,
  testIsTypeForStringType,
} from '../../../test-methods';

describe('primitive-types', function () {
  testIsTypeForIntType(
    'SafeInteger',
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    true
  );
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

  testIsTypeForStringType(
    'CoilSnakeGraphicSetString',
    [
      'g0000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000p65aca8a8cebhheffcgif9fvmkhgecrrma75853622565000hhcaca8a8ceb6b6ffcaa87b8klggfa897a758536225650000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vvgef0vvedca980vv0vv0vvljdhf9898a75853622565\ng10000vvtvtptpkjmvrlvogrj5gb7qoihf9cb5utrtrpsnl888000fcl0vvptpkjm0vv0vv0vv0vv0vv0vv0vvutrtrpsnl8880000vv0vv0vvutsmmm0vv0vv0vvvmsvhjncfutrtrpsnl888000vtttvtptpkjmvslvogrj5gb7uusqpokifutrtrpsnl888000ehrtvtptpdhhvslkjfrj5gb7d950vv0vvutrtrpsnl888000uuvrqqihf0vv0vv0vvqc9ka90vv0vv0vvutrtrpsnl888\ng20000vvvuvvqsljh0vvvliqkdkd30vv0vv0vvurqrmm0vv888000eae0vvvqsrpn0vv0vv0vv0vv0vv0vv0vvvuuvtpunk888000jp9vuvvqsljhvnmvliqkdkd3huvluv9g6tuvlrv0vv8880000vv0vvvqsljh0vvvliqkdkd3vsstpplfeurqrmm0vv8880000vvvuvvqsljhvnmvliqkdkd3ojhviosdhurqrmmoih888000vvvssvqniqplkhcvmqvfnpehvtsvokoh9urqrmmoih888\ng3000kr9vvrtrnnidvqksmfpk9je5ck5sl6lg8of9ld7ia4888000vtovvrtrnnidvqksmfpk9je5rjbodhgc5uuvutqpli888000er0vvs0vvnidvqksmfpk9je5luvqvvbg70vv0vv0vv888000plivvrtrnnidtspsmfpk9je5qjaje7d94of9ld7ia4888000qkduuuqqqmmuihsvtfvmbpf6vtpqpmkjgof9ld7ia4888000prquuusqqmoshjnvtkpk9je5vtotpmlifof9ld7ia4888',
      'i0000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      '00000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000000vvgkk8gg6cc488388886hi47ssaml5hf4ca3860443000000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644\r01000rrk644oka9hgmkakj9ijbgh8fd6kgckldggaec9855000000rrk644okaca8mkakj9ijbgh8fd6kgckldggaec9855000000uuu000fd6ca8000000imu000iiu000000000000855000000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644\r02000000000000000000000000000000000000000000000mqn000qqm9cfk87sscmqnlpmkolimjgkhehfdfdbdb9a9787676000qqm9cfuuuprqmqnlpmkolimjgkhehfdfdbdb9a9777455000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644\n03000uuumhgphlfdhdgt810otomplloijhegbec7ca4ble5000000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644000000000000000000000000000000000000000000000644',
      `
a00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777
a1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888
a2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888
a30000vvvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknjai888000ngcvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknviq888000kr4vvuvtupgmunorjmrkhjc5luuouv7i2vvsvqrviq8880000vvvvuvtupgmunorjmrkhjc5vvvtssljhtpqqknlff888000qpqvvuvtupgmunorjmrkhjc5ea4vgloagtpqqknlff8880000vv0vv0vvopojji0vv0vv0vvvtuurmshgtpqqknlff888
a40000vvjkfefcifphcfa7fgeccaa0vv0vv0vv9ak58j95d888000rqjjkfefcifpqvhlgejcgqnqpj90jbdbb0vv0vv0vv888000at0jkfefcifphcfa7fgeccaalqvnuv7g30vv0vv0vv8880000vvjkfefcifphcfa7fgeccaapnkjhgab79ak58j95d8880000vvjkfefcifp0vva7fgeccaa0vvulcod99ak58j95d888000vtvsrvumfsmfmffgb90vv0vvtsoqnkihb9ak58j95d888
a5000cmjhnv7ctuuumbvihppg0jd8e6c0vv0vvtbcn7akab888000ghjhnv7cticj0vv0vv0vv0vv0vv0vv0vvrsvstiomi888000gvehnv7cttot0vvkkmqmfkg8psujombj0oopgipnd88880000vvhnv7ctpss0vv0vv0vv0vvlsvglv9cotbcn7a0vv8880000vvhnv7ctpss0vv0vvrj7ib60vvvflmbgtbcn7akab888000nlpsvvkrtnholfikqvejvgdkqnntoppjftbcn7akab888
a6000gr9uuurrrhgioqpilhijhccaai9hhibbbfiv89p94h888000voouuurrrnmpiiivnevj9jccuqqtmjjdafiv89p94h8880007p9uuurrrpppoqpilhijhccaepvntv8f7rnvqflrik8880000vvuuurrrokcoqpilhijhccaiiiccc898fiv89p94h888000vf0uuurrrte1oqpilhjifdb9libmekk8ifiv89p94h888000uvuvnjqlaffhmdab68jifdb9ufiocdg76fiv89p94h888
a7000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj
      `.trim(),
    ],
    [
      '',
      '000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      'i9000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      'w0000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      'i0000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n088j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      'i0000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbibvvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
      `
a00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777
a1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888
a2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888
a30000vvvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknjai888000ngcvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknviq888000kr4vvuvtupgmunorjmrkhjc5luuouv7i2vvsvqrviq8880000vvvvuvtupgmunorjmrkhjc5vvvtssljhtpqqknlff888000qpqvvuvtupgmunorjmrkhjc5ea4vgloagtpqqknlff8880000vv0vv0vvopojji0vv0vv0vvvtuurmshgtpqqknlff888
a40000vvjkfefcifphcfa7fgeccaa0vv0vv0vv9ak58j95d888000rqjjkfefcifpqvhlgejcgqnqpj90jbdbb0vv0vv0vv888000at0jkfefcifphcfa7fgeccaalqvnuv7g30vv0vv0vv8880000vvjkfefcifphcfa7fgeccaapnkjhgab79ak58j95d8880000vvjkfefcifp0vva7fgeccaa0vvulcod99ak58j95d888000vtvsrvumfsmfmffgb90vv0vvtsoqnkihb9ak58j95d888
a5000cmjhnv7ctuuumbvihppg0jd8e6c0vv0vvtbcn7akab888000ghjhnv7cticj0vv0vv0vv0vv0vv0vv0vvrsvstiomi888000gvehnv7cttot0vvkkmqmfkg8psujombj0oopgipnd88880000vvhnv7ctpss0vv0vv0vv0vvlsvglv9cotbcn7a0vv8880000vvhnv7ctpss0vv0vvrj7ib60vvvflmbgtbcn7akab888000nlpsvvkrtnholfikqvejvgdkqnntoppjftbcn7akab888
a6000gr9uuurrrhgioqpilhijhccaai9hhibbbfiv89p94h888000voouuurrrnmpiiivnevj9jccuqqtmjjdafiv89p94h8880007p9uuurrrpppoqpilhijhccaepvntv8f7rnvqflrik8880000vvuuurrrokcoqpilhijhccaiiiccc898fiv89p94h888000vf0uuurrrte1oqpilhjifdb9libmekk8ifiv89p94h888000uvuvnjqlaffhmdab68jifdb9ufiocdg76fiv89p94h888
a7000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj
a8000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj
    `.trim(),
    ],
    'lower'
  );
});
