'use babel';

const switchTabPosition = setToRightSide => {
  let atomPanes = document.querySelectorAll('.vertical atom-pane');
  Array.from(atomPanes, atomPane => {
    atomPane.style.flexDirection = setToRightSide ? 'row-reverse' : 'row';
  });
};

const changeTabBarWidth = (_tabBarWidth, unit = 'em') => {
  let tabBarWidth = _tabBarWidth + unit;
  let tabBars = document.querySelectorAll('.vertical .tab-bar');
  Array.from(tabBars, tabBar => {
    Object.assign(tabBar.style, {
      width: tabBarWidth,
      maxWidth: tabBarWidth,
      minWidth: tabBarWidth
    });
  });
};

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
    changeTabBarWidth('100', '%');
  },
};
