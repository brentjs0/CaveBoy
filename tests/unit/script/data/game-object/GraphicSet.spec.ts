import { isType } from '@/script/base/primitive-types';
import Palette from '@/script/data/game-object/Palette';
import GraphicSet from '@/script/data/game-object/GraphicSet';
import { expect } from 'chai';

describe('GraphicSet', function () {
  describe('constructor()', function () {
    it('Initializes values from a CSGraphicSetString.', function () {
      const graphicSetA = new GraphicSet(
        'a00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777\n' +
          'a1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888\n' +
          'a2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888\n' +
          'a30000vvvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknjai888000ngcvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknviq888000kr4vvuvtupgmunorjmrkhjc5luuouv7i2vvsvqrviq8880000vvvvuvtupgmunorjmrkhjc5vvvtssljhtpqqknlff888000qpqvvuvtupgmunorjmrkhjc5ea4vgloagtpqqknlff8880000vv0vv0vvopojji0vv0vv0vvvtuurmshgtpqqknlff888\n' +
          'a40000vvjkfefcifphcfa7fgeccaa0vv0vv0vv9ak58j95d888000rqjjkfefcifpqvhlgejcgqnqpj90jbdbb0vv0vv0vv888000at0jkfefcifphcfa7fgeccaalqvnuv7g30vv0vv0vv8880000vvjkfefcifphcfa7fgeccaapnkjhgab79ak58j95d8880000vvjkfefcifp0vva7fgeccaa0vvulcod99ak58j95d888000vtvsrvumfsmfmffgb90vv0vvtsoqnkihb9ak58j95d888\n' +
          'a5000cmjhnv7ctuuumbvihppg0jd8e6c0vv0vvtbcn7akab888000ghjhnv7cticj0vv0vv0vv0vv0vv0vv0vvrsvstiomi888000gvehnv7cttot0vvkkmqmfkg8psujombj0oopgipnd88880000vvhnv7ctpss0vv0vv0vv0vvlsvglv9cotbcn7a0vv8880000vvhnv7ctpss0vv0vvrj7ib60vvvflmbgtbcn7akab888000nlpsvvkrtnholfikqvejvgdkqnntoppjftbcn7akab888\n' +
          'a6000gr9uuurrrhgioqpilhijhccaai9hhibbbfiv89p94h888000voouuurrrnmpiiivnevj9jccuqqtmjjdafiv89p94h8880007p9uuurrrpppoqpilhijhccaepvntv8f7rnvqflrik8880000vvuuurrrokcoqpilhijhccaiiiccc898fiv89p94h888000vf0uuurrrte1oqpilhjifdb9libmekk8ifiv89p94h888000uvuvnjqlaffhmdab68jifdb9ufiocdg76fiv89p94h888\n' +
          'a7000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj',
        20
      );

      expect(graphicSetA.idNumber).to.equal(10);
      expect(graphicSetA.tilesetNumber).to.equal(20);
      expect(graphicSetA.palettes.length).to.equal(8);

      const graphicSetB = new GraphicSet(
        'i0000uuhrreomckfa9n88j87f7ojamhbkd8e9jrn8qk9ql7444000klgrsnmni4fk0jlahr4fkvlbohcldbvvkrn8oibql7444000uuhrrenkdmnirpgrsnomckfamgbib9vvkrn8qk9ql7444000aecrsnmnikd89n88j87f7ojaohcldbrrern8qk9ql7444000ilcrsnmnikgc9n88j87f7rsnohcmgbvvkrn8qk9mni444000tovrreomcbadihre9j5chojalgakd8vvkrn8qk9ql7444',
        9
      );

      expect(graphicSetB.idNumber).to.equal(18);
      expect(graphicSetB.tilesetNumber).to.equal(9);
      expect(graphicSetB.palettes.length).to.equal(1);
    });

    it('Creates an empty instance with default field values.', function () {
      const graphicSet = new GraphicSet(11);
      expect(graphicSet.idNumber).to.equal(11);
      expect(graphicSet.tilesetNumber).to.equal(0);
      expect(graphicSet.palettes.length).to.equal(1);
      expect(graphicSet.palettes[0]).to.eql(new Palette());
    });
  });

  describe('toCSGraphicSetString()', function () {
    it('Generates a valid CSGraphicSetString.', function () {
      const graphicSet = new GraphicSet(31);
      graphicSet.palettes[0] = new Palette(
        '0009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777'
      );
      graphicSet.palettes[1] = new Palette(
        '000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888'
      );
      graphicSet.palettes[2] = new Palette(
        '000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888'
      );

      const csGraphicSetString = graphicSet.toCSGraphicSetString();

      expect(csGraphicSetString).to.equal(
        'v00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777\n' +
          'v1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888\n' +
          'v2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888'
      );

      expect(isType(csGraphicSetString, 'CSGraphicSetString')).to.be.true;
    });
  });
});
