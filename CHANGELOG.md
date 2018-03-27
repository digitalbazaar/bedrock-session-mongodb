# bedrock-session-mongodb ChangeLog

### Changed
- Update `bedrock-mongodb` peer dependency.
- Update `connect-mongo` dependency.

## 2.0.3 - 2016-09-27

### Fixed
- Fix potential deadlock conflict with `bedrock-express` and
  `bedrock-mongodb`. Do not prevent express startup while
  waiting for session database readiness as this blocks other
  modules waiting on `bedrock.start`, such as `bedrock-mongodb`,
  which is needed to ready the session database. Instead, only
  prevent express readiness which occurs later during `bedrock.ready`.

## 2.0.2 - 2016-06-07

### Changed
- Update connect-mongo dependency.

## 2.0.1 - 2016-03-15

### Changed
- Update bedrock dependencies.

## 2.0.0 - 2016-03-03

### Changed
- Update package dependencies for npm v3 compatibility.

## 1.0.1 - 2015-05-07

### Changed
- Updated to connect-mongo 0.8.1.

## 1.0.0 - 2015-04-08

### Removed
- Unused `config['session-mongodb'].clearInterval`.

## 0.1.1 - 2015-02-23

### Added
- Support for bedrock-express `0.2.x`.

## 0.1.0 - 2015-02-23

- See git history for changes.
