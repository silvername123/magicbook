const book = {
  state: {
    fileName: '', // 文件名
    menuVisible: false, // 菜单栏
    settingVisible: -1, // -1不显示，0字号，1主题设置 ，2进度，3目录
    defaultFontSize: 16, // 默认字体大小
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default', // 默认主题
    bookAvailable: false, // 是否解析完书籍
    progress: 0, // 进度条数值
    section: 0,
    isPaginating: true,
    currentBook: null, // 传book对象
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0, // 定位书签位置
    isBookmark: null,
    bookcfi: 0, // 定位当前页
    bookLength: 0 // 书籍总页数
  },
  mutations: {
    'ADD_BOOKCFI': (state) => {
      state.bookcfi = state.bookcfi + 1
    },
    // 改变state数据
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    'SET_SETTINGVISIBLE': (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    'SET_DEFAULTFONTSIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_DEFAULT_THEME': (state, theme) => {
      state.defaultTheme = theme
    },
    'SET_DEFAULT_FONT_FAMILY': (state, defaultFontFamily) => {
      state.defaultFontFamily = defaultFontFamily
    },
    'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
      state.fontFamilyVisible = visible
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_IS_PAGINATING': (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    'SET_CURRENT_BOOK': (state, currentBook) => {
      state.currentBook = currentBook
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_PAGINATE': (state, paginate) => {
      state.paginate = paginate
    },
    'SET_PAGELIST': (state, pagelist) => {
      state.pagelist = pagelist
    },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
    'SET_BOOKCFI': (state, bookcfi) => {
      state.bookcfi = bookcfi
    },
    // 设置书籍页数
    'SET_BOOKLENGTH': (state, bookLength) => {
      state.bookLength = bookLength
    }
  }

}
export default book
