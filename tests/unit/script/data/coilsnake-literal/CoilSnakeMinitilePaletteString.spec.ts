import { isCoilSnakeMinitilePaletteString } from '@/script/data/coilsnake-literal/CoilSnakeMinitilePaletteString';
import { expect } from 'chai';

describe('isCoilSnakeMinitilePaletteString()', () => {
  it('Returns true for a valid CoilSnakeMinitilePaletteString', () => {
    expect(
      isCoilSnakeMinitilePaletteString(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      )
    ).to.equal(true);
  });

  it('Returns false when upper case is used', () => {
    expect(
      isCoilSnakeMinitilePaletteString(
        '000jj6kk8gg6cc4883bbchodagcQpknmflkcjh9hg7443000'
      )
    ).to.equal(false);
  });

  it('Returns false when the character count is wrong', () => {
    expect(
      isCoilSnakeMinitilePaletteString(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg744300'
      )
    ).to.equal(false);
    expect(
      isCoilSnakeMinitilePaletteString(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg74430000'
      )
    ).to.equal(false);
  });

  it('Returns false when and invalid character is included', () => {
    expect(
      isCoilSnakeMinitilePaletteString(
        '000jj6kk8gg6cc4883bbchwdagcqpknmflkcjh9hg7443000'
      )
    ).to.equal(false);
  });
});
