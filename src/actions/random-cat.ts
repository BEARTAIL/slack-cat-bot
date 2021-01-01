import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { catSearchableText } from '../Cat';
import { fetchAnimalImageUrl } from '../flicker/client';
import { postImage } from '../slack/client';
import { CatsKana } from '../constants/Cats';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(text: string): Promise<void> {
  if (!randomCatRequested(text)) {
    return;
  }

  const cat = randomSelect(CatsKana);
  const searchableText = catSearchableText(cat)
  const imageUrl = await fetchAnimalImageUrl(searchableText);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImage(imageUrl, `${cat}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function randomCatRequested(text: string): boolean {
  return [
    'ナンデモイイカラニャンコクレ',
    'ニャンコクレ',
    'ニャンコクダサイ',
    'ランダムニャンコ',
    'ニャンコホシイ',
    'ニャンコタリナイ',
  ].includes(hiraganaToKatakana(text));
}
