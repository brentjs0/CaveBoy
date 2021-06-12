import Arrangement from '@/script/data/game-object/Arrangement';
import Minitile from '@/script/data/game-object/Minitile';
import Tileset from '@/script/data/game-object/Tileset';
import { expect } from 'chai';

import ftsFile10Contents from '../../../../assets/10.fts';

describe('Tileset', function () {
  describe('constructor()', function () {
    it('Initializes values from the contents of an FTS file.', function () {
      const ftsFileRegions: string[] = ftsFile10Contents.split(
        /(?:\n\n\n|\r\n\r\n\r\n|\r\r\r)/
      );

      const tileset = new Tileset(ftsFileRegions[0], ftsFileRegions[2]);

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
    });

    it('Creates an empty instance with default field values.', function () {
      const tileset = new Tileset();

      expect(tileset.minitiles.length).to.equal(512);
      expect(tileset.arrangements.length).to.equal(1024);

      expect(tileset.minitiles[0]).to.eql(new Minitile());
      expect(tileset.minitiles[511]).to.eql(new Minitile());
      expect(tileset.arrangements[0]).to.eql(new Arrangement());
      expect(tileset.arrangements[1023]).to.eql(new Arrangement());
    });
  });
});
