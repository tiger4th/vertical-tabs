'use babel';

function switchTabPosition(setToRightSide) {
  var atomPane = document.querySelectorAll('.vertical atom-pane');
  atomPane[0].style.flexDirection = setToRightSide ? 'row-reverse' : 'row';
}

function changeTabBarWidth(tabBarWidth) {
  var tabBarWidthEm = tabBarWidth + 'em';
  var tabBar = document.querySelectorAll('.vertical .tab-bar');
  tabBar[0].style.width    = tabBarWidthEm;
  tabBar[0].style.maxWidth = tabBarWidthEm;
  tabBar[0].style.minWidth = tabBarWidthEm;
}

atom.config.onDidChange('vertical-tabs.setToRightSide', function(setToRightSide) {
  switchTabPosition(setToRightSide['newValue']);
});

atom.config.onDidChange('vertical-tabs.tabBarWidth', function(tabBarWidth) {
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
    atomPane = document.querySelectorAll('.vertical atom-pane');
    atom.config.get('vertical-tabs.setToRightSide') ? switchTabPosition(true) : switchTabPosition(false);

    var tabBarWidth = atom.config.get('vertical-tabs.tabBarWidth');
    var count = 0;
    var id = setInterval(function() {
      tabBar = document.getElementsByClassName('.vertical tab-bar');
      if (tabBar.length > 0) {　
        changeTabBarWidth(tabBarWidth);
        clearInterval(id);
      } else if (count > 10) {　
        clearInterval(id);
      }
      count++;
    }, 100);
  },

  deactivate() {
    atomPane[0].style.flexDirection = 'column';
    tabBar[0].style.width    = '100%';
    tabBar[0].style.maxWidth = '100%';
    tabBar[0].style.minWidth = '100%';
  },
};
