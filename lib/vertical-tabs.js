'use babel';

let switchTabPosition = setToRightSide => {
  let atomPane = document.querySelectorAll('.vertical atom-pane');
  atomPane[0].style.flexDirection = setToRightSide ? 'row-reverse' : 'row';
}

let changeTabBarWidth = tabBarWidth => {
  let tabBarWidthEm = tabBarWidth + 'em';
  let tabBar = document.querySelectorAll('.vertical .tab-bar');
  tabBar[0].style.width    = tabBarWidthEm;
  tabBar[0].style.maxWidth = tabBarWidthEm;
  tabBar[0].style.minWidth = tabBarWidthEm;
}

atom.config.onDidChange('vertical-tabs.setToRightSide', setToRightSide => {
  switchTabPosition(setToRightSide['newValue']);
});

atom.config.onDidChange('vertical-tabs.tabBarWidth', tabBarWidth => {
  changeTabBarWidth(tabBarWidth['newValue']);
});

export default {
  atomPane: null,
  tabBar: null,

  config: {
    setToRightSide: {
      type: 'boolean',
      default: false,
    },
    tabBarWidth: {
      type: 'number',
      default: '14',
    },
  },

  activate() {
    atom.config.get('vertical-tabs.setToRightSide') ? switchTabPosition(true) : switchTabPosition(false);

    let tabBarWidth = atom.config.get('vertical-tabs.tabBarWidth');
    changeTabBarWidth(tabBarWidth);
  },

  deactivate() {
    atomPane[0].style.flexDirection = 'column';
    tabBar[0].style.width    = '100%';
    tabBar[0].style.maxWidth = '100%';
    tabBar[0].style.minWidth = '100%';
  },
};
