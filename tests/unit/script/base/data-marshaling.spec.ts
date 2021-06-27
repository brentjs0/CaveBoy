import {
  buildFTSFileContents,
  buildMapTilesFileContents,
  dumpArrayAsYAMLWithNumericKeys,
  parseAllFTSFileContents,
  parseFTSFileContents,
  parseMapSectorsFileContents,
  parseMapTilesFileContents,
} from '@/script/base/data-marshaling';
import Arrangement from '@/script/data/game-object/Arrangement';
import Minitile from '@/script/data/game-object/Minitile';
import GraphicSet from '@/script/data/game-object/GraphicSet';
import { expect } from 'chai';
import ftsFile00Contents from '../../../assets/project/Tilesets/00.fts';
import ftsFile01Contents from '../../../assets/project/Tilesets/01.fts';
import ftsFile02Contents from '../../../assets/project/Tilesets/02.fts';
import ftsFile03Contents from '../../../assets/project/Tilesets/03.fts';
import ftsFile04Contents from '../../../assets/project/Tilesets/04.fts';
import ftsFile05Contents from '../../../assets/project/Tilesets/05.fts';
import ftsFile06Contents from '../../../assets/project/Tilesets/06.fts';
import ftsFile07Contents from '../../../assets/project/Tilesets/07.fts';
import ftsFile08Contents from '../../../assets/project/Tilesets/08.fts';
import ftsFile09Contents from '../../../assets/project/Tilesets/09.fts';
import ftsFile10Contents from '../../../assets/project/Tilesets/10.fts';
import ftsFile11Contents from '../../../assets/project/Tilesets/11.fts';
import ftsFile12Contents from '../../../assets/project/Tilesets/12.fts';
import ftsFile13Contents from '../../../assets/project/Tilesets/13.fts';
import ftsFile14Contents from '../../../assets/project/Tilesets/14.fts';
import ftsFile15Contents from '../../../assets/project/Tilesets/15.fts';
import ftsFile16Contents from '../../../assets/project/Tilesets/16.fts';
import ftsFile17Contents from '../../../assets/project/Tilesets/17.fts';
import ftsFile18Contents from '../../../assets/project/Tilesets/18.fts';
import ftsFile19Contents from '../../../assets/project/Tilesets/19.fts';
import mapSectorsFileContents from '../../../assets/project/map_sectors.yml';
import mapTilesFileContents from '../../../assets/project/map_tiles.map';
import { isValidNumber } from '@/script/base/primitive-types';
import Tileset from '@/script/data/game-object/Tileset';

describe('data-marshaling', function () {
  describe('parseFTSFileContents()', function () {
    it('Returns all Minitiles, Arrangements, and GraphicSets from the file.', function () {
      const [tileset, graphicSets] = parseFTSFileContents(
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

      expect(graphicSets[10]).to.eql(
        new GraphicSet(
          'a00009p8jshfqhkdaphfk9bljjcdc7g7jc1d70hhlefhdbb777000ffe0vvfqhjgl0vv0vv0vv0vv0vv0vv0vvvusutppne7770000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777000usqjhcffd0vv0vvk9bjfiddcibe0vv0vvhhlefhdbb777000qtpjshfqhkdaphfk9bljjcdcvmlojkhcdhhlefhdbb777\na1000gm1pmijifdb7hfcdcaaa9srmag7nmiifchgffecbb88880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv000qrlpmijifgd90vvdcaaa90vvpmikhddb6hgffecbb8888000am0pmijif0vvhfcdb9aa98d0srmnmihfchgffecbb88880000vvpoljvvnmihge0vv0vv0vvpj7ke6bb9hgffecbb88880000vvpoljifgd9hgedb9aa9srmpj7ke6bb9hgffecbb8888\na2000arbsegqaatj7lcei9cnonccenuvruuglh9cm7ai59f8880000vvuokqaah4a0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv8880008r6seg0vvkad0vviabqnoiab0vv0vv0vv0vv0vv0vv888000gpbsegq9atj70vviabqnoccefvvlsvaf3glvcfq0vv8880000vv0vvqaatj7o8biabqrrccerrqmnoefh9cm7ai59f8880000vv0vvjmifefjipdcjqrriiirrqmnoefh9cm7ai59f888\na30000vvvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknjai888000ngcvvuvtupgmunorjmrkhjc50vv0vv0vvtpqqknviq888000kr4vvuvtupgmunorjmrkhjc5luuouv7i2vvsvqrviq8880000vvvvuvtupgmunorjmrkhjc5vvvtssljhtpqqknlff888000qpqvvuvtupgmunorjmrkhjc5ea4vgloagtpqqknlff8880000vv0vv0vvopojji0vv0vv0vvvtuurmshgtpqqknlff888\na40000vvjkfefcifphcfa7fgeccaa0vv0vv0vv9ak58j95d888000rqjjkfefcifpqvhlgejcgqnqpj90jbdbb0vv0vv0vv888000at0jkfefcifphcfa7fgeccaalqvnuv7g30vv0vv0vv8880000vvjkfefcifphcfa7fgeccaapnkjhgab79ak58j95d8880000vvjkfefcifp0vva7fgeccaa0vvulcod99ak58j95d888000vtvsrvumfsmfmffgb90vv0vvtsoqnkihb9ak58j95d888\na5000cmjhnv7ctuuumbvihppg0jd8e6c0vv0vvtbcn7akab888000ghjhnv7cticj0vv0vv0vv0vv0vv0vv0vvrsvstiomi888000gvehnv7cttot0vvkkmqmfkg8psujombj0oopgipnd88880000vvhnv7ctpss0vv0vv0vv0vvlsvglv9cotbcn7a0vv8880000vvhnv7ctpss0vv0vvrj7ib60vvvflmbgtbcn7akab888000nlpsvvkrtnholfikqvejvgdkqnntoppjftbcn7akab888\na6000gr9uuurrrhgioqpilhijhccaai9hhibbbfiv89p94h888000voouuurrrnmpiiivnevj9jccuqqtmjjdafiv89p94h8880007p9uuurrrpppoqpilhijhccaepvntv8f7rnvqflrik8880000vvuuurrrokcoqpilhijhccaiiiccc898fiv89p94h888000vf0uuurrrte1oqpilhjifdb9libmekk8ifiv89p94h888000uvuvnjqlaffhmdab68jifdb9ufiocdg76fiv89p94h888\na7000618000418000000000j0v000418000000418000000jsj000618000418000000000j0v000418418000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000000000000418000000jsj000618000418000000000j0v000418618000418000000jsj000618000418000418000j0v000000000000418000000jsj',
          10
        )
      );
      expect(graphicSets[17]).to.eql(
        new GraphicSet(
          'h0000dp9tpkvtqhfbpolmljihguur9h9rpnhghllljiigff888000vuqtpkvtqddd1s11r11q11p1plfkfbca42m23l33k38880000vvtpkvtqomi0vvmljihgeb7jnvplhie9ttthqvtst888000fpdrnjvtqedepolmljihg7f9vrqqmihfbllljiigff8880000vv0vv0vvnc7ke70vv0vv0vvvuqvqjmf9llljiigff8880000vvmlg0vvmidgd9vqmqifmdetmdpi9999llljiigff888\nh1000gj9pljmffdb7hfcec9b98sqn8d9olkhfdefgcddaaa888000trnpljmffddc0vv0vv0vv0vvtqnmjgfda0vv0vv0vv8880000vvpljmffnga0vvec9b98ojailv0vv0vvpqsljl0vv8880000vvpljmffrn7fd9ca4b980vvpomkjhcb9efgcddaaa8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv\nh2000jodtvsmpldcbhhheeeabbvtrdhamlijigoonllkhhg888000qrltvsmplhhhjkkeffaa99h9srmnmhhgboonllkhhg888000qrltvsmpldb70vv0vv0vv0vvponkjgdda0vv0vv0vv888000alctvsmplhhhjkkeffaa96f5srmnmige9oonllkhhg8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vvknj0vvjjfcdb0vv0vv0vvqnflhb798oonllkhhg888\nh3000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000hhcaca8a8cebhheffcaa8kjgcfbedbbb8a75853622565000o86aca8a8cebhheffcgif5blnmkhferrmlklddk0ov565000hhcaca8a8ceb6b6ffcaa87b8klggfa897a758536225650000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vvgef0vvedca980vv0vv0vvljdhf9898a75853622565\nh40000vvopnklkee9egfdc9hfbba70vv0vv0vvnnkghg0vv888000rrropn0jdfiofmudc9hiv0vvife0fvdba0vv0fv0fv888000ouvopnklkkkkegfdc9hfbba7jpvlrvmsvurlpkijed8880000vv0vvklktohegfdc9hfbba7rolljffdannkghg0vv8880000vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0vv0000vv0vvklkiheegfdc9hfbba7ddcbb9873nnkghgdbc888\nh5000em6sqmpmhfffppmkjggeaqolbg4mlidcammkkjieec888000mlhsqmpmh0vv0vv0vv0vv0vvnjfkgcec80vvhih0vv888000arfsqmpmhhffppmkjggeatsngnvkrv3i9ttvnov0vv888000gn0sqmpmhfffhgekjggeaaf0oldhfbb96mmkkjieec888000vussqmpmhffcppmejbkgbeb7b85fc2864mmkkjieec888000rffsqmpmh0vvppmkjgnnmcdnutsrpntutssslkj0vv888\nh60000vvuvrtrnplhssopnjsmclf9qoihf9cb5ohbmf7kd5888000vuruvr0vviljolq1i1lli0vvtoi2m7ke60vv0vv0vv888000qrpuvrtrnplhmg7pnjsmc0vvvoivjdoc7ohbmf7kd58880009q8uvrtrnplhmr7pnjsmc0vvfnvhrvch9vqttgqkd58880000vvuvrkd50vv0vv0vv0vv0vvqoiuo1qg6ohbmf7kd5888000hleuvrtnmrknnfhuqjplakdajsvptv8f9ohbmf7kd5888\nh70007q7nnngihfffttqponkljtrqaf7pnligfmgakd8fa68880007m7nnngih0vvttqponklj0vvfccc88af7mgakd8fa6888000bj0nnngih0vv0vv0vvklj0vvgnvjpv4e00vv0vv0vv888000bj0nnngihfffgfeponklj6c0libhe8c95mgakd8fa68880000vvnoogihlkhcdeponklj0vvje9qmheb8mgakd8fa6888000akennngihfff0vvponklj9e6oqqnnngggmgakd8fa6888',
          10
        )
      );
    });
  });

  describe('parseAllFTSFileContents()', function () {
    it('Returns all GraphicSets and Tilesets from an unaltered set of *.fts files.', function () {
      const ftsFileContentsByTilesetNumber: string[] = [
        ftsFile00Contents,
        ftsFile01Contents,
        ftsFile02Contents,
        ftsFile03Contents,
        ftsFile04Contents,
        ftsFile05Contents,
        ftsFile06Contents,
        ftsFile07Contents,
        ftsFile08Contents,
        ftsFile09Contents,
        ftsFile10Contents,
        ftsFile11Contents,
        ftsFile12Contents,
        ftsFile13Contents,
        ftsFile14Contents,
        ftsFile15Contents,
        ftsFile16Contents,
        ftsFile17Contents,
        ftsFile18Contents,
        ftsFile19Contents,
      ];

      const [graphicSets, tilesets] = parseAllFTSFileContents(
        ftsFileContentsByTilesetNumber
      );

      for (let graphicSet of graphicSets) {
        expect(graphicSet instanceof GraphicSet).to.be.true;
      }
      expect(graphicSets.length).to.equal(32);

      for (let tileset of tilesets) {
        expect(tileset instanceof Tileset).to.be.true;
      }
      expect(tilesets.length).to.equal(20);
    });
  });

  describe('buildFTSFileContents()', function () {
    it('Encodes decoded files identically.', function () {
      const [tileset, graphicSets] = parseFTSFileContents(
        10,
        ftsFile10Contents
      );

      const newFTSFile10Contents = buildFTSFileContents(
        10,
        tileset,
        graphicSets
      );

      expect(ftsFile10Contents).to.equal(newFTSFile10Contents);
    });
  });

  describe('parseMapSectorsFileContents()', function () {
    it('Returns all Sectors from the file', function () {
      expect(
        parseMapSectorsFileContents(mapSectorsFileContents).length
      ).to.equal(2560);
    });

    it("Throws an Error when mapSectorsFileContents doesn't parse as an object.", function () {
      const yamlArray = '- zero\n- one\n- two';
      expect(() => parseMapSectorsFileContents(yamlArray)).to.throw();
    });

    it('Throws an Error when object keys are not numeric strings.', function () {
      let yaml: string = mapSectorsFileContents;
      yaml = 'x' + yaml.substring(1);
      expect(() => parseMapSectorsFileContents(yaml)).to.throw();
    });

    it('Throws an Error when there are duplicate keys.', function () {
      let yaml: string = mapSectorsFileContents;
      yaml = '1' + yaml.substring(1);

      expect(() => parseMapSectorsFileContents(yaml)).to.throw();
    });

    it("Throws an Error when it doesn't contain 2560 objects.", function () {
      let yaml: string = mapSectorsFileContents.trim();
      yaml += `
2560:
  Item: 174
  Palette: 0
  Town Map X: 116
  Town Map Y: 102
  Town Map Arrow: none
  Music: 120
  Setting: indoors
  Town Map Image: threed
  Town Map: threed
  Teleport: disabled
  Tileset: 25`;

      expect(() => parseMapSectorsFileContents(yaml)).to.throw();
    });

    it('Throws an Error when any element fails validation.', function () {
      const yaml = mapSectorsFileContents.replace(
        '  Town Map X: 184',
        '  Town Map X: cornbread'
      );

      expect(() => parseMapSectorsFileContents(yaml)).to.throw();
    });
  });

  describe('dumpArrayAsYAMLWithNumericKeys()', function () {
    it('Encodes decoded map_sectors.yml files identically.', function () {
      const csMapSectors = parseMapSectorsFileContents(
        mapSectorsFileContents
      ).map((s) => s.getCSMapSector());
      const newMapSectorsFileContents = dumpArrayAsYAMLWithNumericKeys(
        csMapSectors
      );

      expect(mapSectorsFileContents).to.equal(newMapSectorsFileContents);
    });
  });

  describe('parseMapTilesFileContents()', function () {
    it('Returns 81920 valid Arrangement numbers from the file.', function () {
      const mapCells = parseMapTilesFileContents(mapTilesFileContents);

      expect(mapCells.length).to.equal(81920);

      for (let mapCell of mapCells) {
        expect(isValidNumber(mapCell.arrangementNumber, 0, 1023)).to.be.true;
      }
    });

    it("Throws an exception when any row's item count isn't 256.", function () {
      const fileWithMissingItems = mapTilesFileContents.replace(' 3a6', '');
      expect(() => parseMapTilesFileContents(fileWithMissingItems)).to.throw();

      const fileWithExtraItems = mapTilesFileContents.replace(
        ' 3a6',
        ' 3a6 3a6'
      );
      expect(() => parseMapTilesFileContents(fileWithExtraItems)).to.throw();
    });

    it("Throws an exception when the row count isn't 320.", function () {
      const fileWithMissingRow = mapTilesFileContents.substring(0, 1024);
      expect(() => parseMapTilesFileContents(fileWithMissingRow)).to.throw();

      const fileWithExtraRow =
        mapTilesFileContents +
        '14a 0db 000 000 000 000 000 000 046 01b 05e 05f 06d 0e9 0ea 0eb 072 046 072 139 13a 0c9 112 12c 12f 130 131 132 04d 06e 072 06e 04d 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 072 139 13a 0c9 112 12c 12f 130 131 132 04d 06e 072 06e 04d 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 072 139 13a 0c9 112 12c 12f 130 131 132 04d 06d 072 06e 04d 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 0e3 0e4 0e5 0e6 0e7 0e8 0ff 046 0e3 0e4 0e5 0e6 0e7 1d0 201 202 203 204 205 0eb 01b 01b 104 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 105 000 000 000 000 000 000 000 000 104 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 10b 105 0b9 0ba 0bb 0bc 0bc 0bd 0be 0bf\n';
      expect(() => parseMapTilesFileContents(fileWithExtraRow)).to.throw();
    });

    it('Throws an exception for non-numeric items.', function () {
      const fileWithNonNumericItems = mapTilesFileContents.replace('3a6', ';');
      expect(() =>
        parseMapTilesFileContents(fileWithNonNumericItems)
      ).to.throw();
    });

    it('Throws an exception for out-of-range numbers.', function () {
      const fileWithNegativeItems = mapTilesFileContents.replace('3a6', '-1');
      expect(() => parseMapTilesFileContents(fileWithNegativeItems)).to.throw();

      const fileWithItemsOver1023 = mapTilesFileContents.replace('3a6', '400');
      expect(() => parseMapTilesFileContents(fileWithItemsOver1023)).to.throw();
    });
  });

  describe('buildMapTilesFileContents()', function () {
    it('Encodes a parsed map_tiles.map file identically', function () {
      const mapCells = parseMapTilesFileContents(mapTilesFileContents);
      expect(buildMapTilesFileContents(mapCells)).to.equal(
        mapTilesFileContents
      );
    });
  });
});
