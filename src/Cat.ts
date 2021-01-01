import { hiraganaToKatakana, randomSelect } from './utils/utils';
import { CatEnglish, CatMapsType, CatKana } from './Types';

const CAT_MAPPS: CatMapsType = {
  'マヌルニャンコ': 'manul cat',
  'アメリカンショートヘア': 'American shorthair cat',
  'マンチカン': 'Munchkin cat',
  'チャウシー': 'Chausie cat',
  'スコティッシュホールド': 'Scottish Fold cat',
  'ノルウェージャンフォレスト': 'Norwegian Forest Cat',
  'ロシアンブルー': 'Russian Blue cat',
  'ブリティッシュショートヘア': 'British Shorthair cat',
  'ラグドール': 'Ragdoll cat',
  'くろねこ': 'black kitten',
  'ベンガルにゃんこ': 'Bengal cat',
  'メインクーン': 'Maine Coon',
  'サイベリアン': 'Siberian cat',
};

// 型の指定方法
const CAT_KANA = Object.keys(CAT_MAPPS) as CatKana[];

export function selectRandomCat(): CatKana {
  return randomSelect(CAT_KANA);
}

export function catSearchableText(text: string): CatEnglish {
  return CAT_MAPPS[hiraganaToKatakana(text)];
}
