'use babel';

const getDirection = (setToRightSide) => {
  return setToRightSide ? 'row-reverse' : 'row'
};

const setFlexDirection = (atomPane, direction) => {
  atomPane.style.flexDirection = direction;
};

const switchTabPosition = setToRightSide => {
  let atomPanes = document.querySelectorAll('.vertical atom-pane');
  let direction = getDirection(setToRightSide);
  Array.from(atomPanes, atomPane => {
    setFlexDirection(atomPane, direction);
  });
};

const assignTabBarWidth = (tabBar, tabBarWidth) => {
  Object.assign(tabBar.style, {
    width: tabBarWidth,
    maxWidth: tabBarWidth,
    minWidth: tabBarWidth
  });
};

const changeTabBarWidth = (_tabBarWidth, unit = 'em') => {
  let tabBarWidth = _tabBarWidth + unit;
  let tabBars = document.querySelectorAll('.vertical .tab-bar');
  Array.from(tabBars, tabBar => {
    assignTabBarWidth(tabBar, tabBarWidth);
  });
};

atom.config.onDidChange('vertical-tabs.setToRightSide', setToRightSide => {
  switchTabPosition(setToRightSide['newValue']);
});

atom.config.onDidChange('vertical-tabs.tabBarWidth', tabBarWidth => {
  changeTabBarWidth(tabBarWidth['newValue']);
});

atom.workspace.onDidAddPane((e) => {
  let pane = e.pane.element;
  let tabBar = pane.querySelector('.tab-bar');
  let tabBarWidth = atom.config.get('vertical-tabs.tabBarWidth');
  let setToRightSide = atom.config.get('vertical-tabs.setToRightSide');
  let direction = getDirection(setToRightSide);

  assignTabBarWidth(tabBar, tabBarWidth + 'em');
  setFlexDirection(pane, direction);
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
