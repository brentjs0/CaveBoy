import {
  buildFTSFileContents,
  parseFTSFileContents,
} from '@/script/base/data-marshaling';
import Arrangement from '@/script/data/game-object/Arrangement';
import Minitile from '@/script/data/game-object/Minitile';
import SectorGraphicsSet from '@/script/data/game-object/SectorGraphicsSet';
import { expect } from 'chai';
import ftsFile10Contents from '../../../assets/10.fts';

describe('data-marshaling', function () {
  describe('parseFTSFileContents()', function () {
    it('Returns all Minitiles, Arrangements, and SectorGraphicsSets from the file.', function () {
      const [tileset, sectorGraphicsSets] = parseFTSFileContents(
        10,
        ftsFile10Contents
      );

      expect(tileset.minitiles.length).to.equal(512);
      expect(tileset.arrangements.length).to.equal(1024);
      expect(tileset.minitiles[0]).to.eql(
        new Minitile(
          '0000000000000000000000000000000000000000000000000000000000000000\n0000000000000000000000000000000000000000000000000000000000000000'
        )
      );
      expect(tileset.minitiles[511]).to.eql(
        new Minitile(
          'afa88888afaaaaaaf8888888fffffffffaaaaaaafbbbbbbbfbbbbbbbffffffff\n0000000000000000000000000000000000000000000000000000000000000000'
        )
      );
      expect(tileset.arrangements[0]).to.eql(
        new Arrangement(
          '000080000080000080000080000080000080000080000080000080000080000080000080000080000080000080000080'
        )
      );
      expect(tileset.arrangements[1023]).to.eql(
        new Arrangement(
          '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
      );

      expect(sectorGraphicsSets[10]).to.eql(
        new SectorGraphicsSet(
          'a00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777\na1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888\na2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888\na30000vvvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknjai888000ngcvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknviq888000kr4vvuvtupgmunorjmrkhjc5luuouv7i2vvsvqrviq8880000vvvvuvtupgmunorjmrkhjc5vvvtssljhtpqqknlff888000qpqvvuvtupgmunorjmrkhjc5ea4vgloagtpqqknlff8880000vv0vv0vvopojji0vv0vv0vvvtuurmshgtpqqknlff888\na40000vvjkfefcifphcfa7fgeccaa0vv0vv0vv9ak58j95d888000rqjjkfefcifpqvhlgejcgqnqpj90jbdbb0vv0vv0vv888000at0jkfefcifphcfa7fgeccaalqvnuv7g30vv0vv0vv8880000vvjkfefcifphcfa7fgeccaapnkjhgab79ak58j95d8880000vvjkfefcifp0vva7fgeccaa0vvulcod99ak58j95d888000vtvsrvumfsmfmffgb90vv0vvtsoqnkihb9ak58j95d888\na5000cmjhnv7ctuuumbvihppg0jd8e6c0vv0vvtbcn7akab888000ghjhnv7cticj0vv0vv0vv0vv0vv0vv0vvrsvstiomi888000gvehnv7cttot0vvkkmqmfkg8psujombj0oopgipnd88880000vvhnv7ctpss0vv0vv0vv0vvlsvglv9cotbcn7a0vv8880000vvhnv7ctpss0vv0vvrj7ib60vvvflmbgtbcn7akab888000nlpsvvkrtnholfikqvejvgdkqnntoppjftbcn7akab888\na6000gr9uuurrrhgioqpilhijhccaai9hhibbbfiv89p94h888000voouuurrrnmpiiivnevj9jccuqqtmjjdafiv89p94h8880007p9uuurrrpppoqpilhijhccaepvntv8f7rnvqflrik8880000vvuuurrrokcoqpilhijhccaiiiccc898fiv89p94h888000vf0uuurrrte1oqpilhjifdb9libmekk8ifiv89p94h888000uvuvnjqlaffhmdab68jifdb9ufiocdg76fiv89p94h888\na7000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj',
          10
        )
      );
      expect(sectorGraphicsSets[17]).to.eql(
        new SectorGraphicsSet(
          'h0000dp9tpkvtqhfbpolmljihguur9h9rpnhghllljiigff888000vuqtpkvtqddd1s11r11q11p1plfkfbca42m23l33k38880000vvtpkvtqomi0vvmljihgeb7jnvplhie9ttthqvtst888000fpdrnjvtqedepolmljihg7f9vrqqmihfbllljiigff8880000vv0vv0vvnc7ke70vv0vv0vvvuqvqjmf9llljiigff8880000vvmlg0vvmidgd9vqmqifmdetmdpi9999llljiigff888\nh1000gj9pljmffdb7hfcec9b98sqn8d9olkhfdefgcddaaa888000trnpljmffddc0vv0vv0vv0vvtqnmjgfda0vv0vv0vv8880000vvpljmffnga0vvec9b98ojailv0vv0vvpqsljl0vv8880000vvpljmffrn7fd9ca4b980vvpomkjhcb9efgcddaaa8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv\nh2000jodtvsmpldcbhhheeeabbvtrdhamlijigoonllkhhg888000qrltvsmplhhhjkkeffaa99h9srmnmhhgboonllkhhg888000qrltvsmpldb70vv0vv0vv0vvponkjgdda0vv0vv0vv888000alctvsmplhhhjkkeffaa96f5srmnmige9oonllkhhg8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vvknj0vvjjfcdb0vv0vv0vvqnflhb798oonllkhhg888\nh3000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000o86aca8a8cebhheffcgif5blnmkhferrmlklddk0ov565000hhcaca8a8ceb6b6ffcaa87b8klggfa897a758536225650000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vvgef0vvedca980vv0vv0vvljdhf9898a75853622565\nh40000vvopnklkee9egfdc9hfbba70vv0vv0vvnnkghg0vv888000rrropn0jdfiofmudc9hiv0vvife0fvdba0vv0fv0fv888000ouvopnklkkkkegfdc9hfbba7jpvlrvmsvurlpkijed8880000vv0vvklktohegfdc9hfbba7rolljffdannkghg0vv8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vv0vvklkiheegfdc9hfbba7ddcbb9873nnkghgdbc888\nh5000em6sqmpmhfffppmkjggeaqolbg4mlidcammkkjieec888000mlhsqmpmh0vv0vv0vv0vv0vvnjfkgcec80vvhih0vv888000arfsqmpmhhffppmkjggeatsngnvkrv3i9ttvnov0vv888000gn0sqmpmhfffhgekjggeaaf0oldhfbb96mmkkjieec888000vussqmpmhffcppmejbkgbeb7b85fc2864mmkkjieec888000rffsqmpmh0vvppmkjgnnmcdnutsrpntutssslkj0vv888\nh60000vvuvrtrnplhssopnjsmclf9qoihf9cb5ohbmf7kd5888000vuruvr0vviljolq1i1lli0vvtoi2m7ke60vv0vv0vv888000qrpuvrtrnplhmg7pnjsmc0vvvoivjdoc7ohbmf7kd58880009q8uvrtrnplhmr7pnjsmc0vvfnvhrvch9vqttgqkd58880000vvuvrkd50vv0vv0vv0vv0vvqoiuo1qg6ohbmf7kd5888000hleuvrtnmrknnfhuqjplakdajsvptv8f9ohbmf7kd5888\nh70007q7nnngihfffttqponkljtrqaf7pnligfmgakd8fa68880007m7nnngih0vvttqponklj0vvfccc88af7mgakd8fa6888000bj0nnngih0vv0vv0vvklj0vvgnvjpv4e00vv0vv0vv888000bj0nnngihfffgfeponklj6c0libhe8c95mgakd8fa68880000vvnoogihlkhcdeponklj0vvje9qmheb8mgakd8fa6888000akennngihfff0vvponklj9e6oqqnnngggmgakd8fa6888',
          10
        )
      );
    });
  });

  describe('buildFTSFileContents()', function () {
    it('Encodes decoded files identically.', function () {
      const [tileset, sectorGraphicsSets] = parseFTSFileContents(
        10,
        ftsFile10Contents
      );

      const newFTSFile10Contents = buildFTSFileContents(
        10,
        tileset,
        sectorGraphicsSets
      );

      console.log(newFTSFile10Contents);

      expect(ftsFile10Contents).to.equal(newFTSFile10Contents);
    });
  });
});
