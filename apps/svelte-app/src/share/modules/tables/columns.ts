export type Screen = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'all';

export type SortsType = Record<string, string>;

export type ColumnsType = {
  title: string;
  show?: Screen;
  dataIndex?: string;
  render?: (data: any, index: number) => any;
  sort?: string;
}[];

export const showOnScreen = (show: Screen) => {
  switch (show) {
    case 'all':
    case 'xs':
      return '';

    case 'sm':
      return 'hidden sm:table-cell';

    case 'md':
      return 'hidden md:table-cell';

    case 'lg':
      return 'hidden lg:table-cell';

    case 'xl':
      return 'hidden xl:table-cell';

    default:
      return 'hidden sm:table-cell';
  }
};
