const Me = imports.misc.extensionUtils.getCurrentExtension();
const Settings = Me.imports.settings;
const System = Me.imports.system;
const Widget = Me.imports.widgets;
const DND = Me.imports.doNotDisturb;

/**
 * Called when the extension is loaded.
 */
function init() {}

/**
 * Enable the do not disturb extension. Adds all UI elements and monitors the settings object.
 */
function enable() {

  this.dnd = new DND.DoNotDisturb(new System.GnomePresence());

  //
  // this._lastMuteState = false;
  // this._hasMutedSound = false;
  //
  this._disturbToggle = new Widget.DoNotDisturbToggle();
  this._disturbToggle.show();
  //
  this._enabledIcon = new Widget.DoNotDisturbIcon();
  //
  // this._settings = new Settings.SettingsManager();
  // this._soundManager = new System.AudioManager();
  // this._notificationManager = new System.NotificationManager();
  // this._enabledIcon.updateCount(this._notificationManager.notificationCount)
  //
  // this.notificationListenerID = this._notificationManager.addNotificationCountListener((count) => {
  //   this._enabledIcon.updateCount(count);
  // });

  this._disturbToggle.setToggleState(this.dnd.isEnabled());
  this._disturbToggle.onToggleStateChanged(() => _toggle());
  // this._notificationManager.onDoNotDisturbChanged(() => _sync());
  this.dndListener = this.dnd.addStatusListener((enabled) => _sync(enabled));
  // this._settings.onShowIconChanged(() => _sync(this.dnd.isEnabled()));
  // this._settings.onMuteSoundChanged(() => _sync(this.dnd.isEnabled()));
  // this._settings.onShowCountChanged(() => _sync(this.dnd.isEnabled()));
  // this._settings.onShowDotChanged(() => _sync(this.dnd.isEnabled()));

  // _sync(this.dnd.isEnabled());
}

/**
 * Disables the extension. Tears down all UI components.
 */
function disable() {
  // this._notificationManager.removeNotificationCountListener(this.notificationListenerID);
  // this._notificationManager.setDoNotDisturb(false);
  // this._disturbToggle.destroy();
  this._enabledIcon.destroy();
  this.dnd.removeStatusListener(this.dndListener);
  // this._notificationManager.disconnectAll();
  // this._notificationManager.disable();
  // let muteSounds = this._settings.shouldMuteSound();
  // if (muteSounds && this._hasMutedSound){
    // this._soundManager.unmute();
  // }
}

/**
 * Toggle the status of the do not disturb mode in _settings.
 */
function _toggle() {
  if (this.dnd.isEnabled() == this._disturbToggle.getToggleState()){
    return;
  }
  if (this._disturbToggle.getToggleState()){
    this.dnd.enable();
  } else {
    this.dnd.disable();
  }

  // this._notificationManager.setDoNotDisturb(this._disturbToggle.getToggleState()); // This will trigger a call to _sync
}

/**
 * Updates the UI based on the _settings. Includes switching the toggle state and showing the status icon.
 */
function _sync(enabled) {
  // let enabled = this.dnd.isEnabled();//this._notificationManager.getDoNotDisturb();
  let showIcon = this._settings.shouldShowIcon();
  // let muteSounds = this._settings.shouldMuteSound();
  //
  // this._enabledIcon.showDot = this._settings.showDot;
  // this._enabledIcon.showCount = this._settings.showCount;
  //
  if (enabled && showIcon) {
    this._enabledIcon.hide();
    this._enabledIcon.show();
  } else {
    this._enabledIcon.hide();
  }
  //
  // this._enabledIcon.updateCount(this._notificationManager.notificationCount);
  //
  // if (enabled && muteSounds) {
  //   this._soundManager.mute();
  //   this._hasMutedSound = true;
  // } else if ((muteSounds || this._lastMuteState) && this._hasMutedSound) {
  //   this._soundManager.unmute();
  //   this._hasMutedSound = false;
  // }
  //
  // this._lastMuteState = muteSounds;

  if (this.dnd.isEnabled() == this._disturbToggle.getToggleState()){
    this._disturbToggle.setToggleState(enabled);
  }
}
