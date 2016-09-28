# bedrock-session-mongodb ChangeLog

### Fixed
- Fix potential deadlock issue; do not prevent express startup or
  configuration while waiting for database ready event, rather
  prevent express readiness.

## [2.0.2] - 2016-06-07

### Changed
- Update connect-mongo dependency.

## [2.0.1] - 2016-03-15

### Changed
- Update bedrock dependencies.

## [2.0.0] - 2016-03-03

### Changed
- Update package dependencies for npm v3 compatibility.

## [1.0.1] - 2015-05-07

### Changed
- Updated to connect-mongo 0.8.1.

## [1.0.0] - 2015-04-08

### Removed
- Unused `config['session-mongodb'].clearInterval`.

## [0.1.1] - 2015-02-23

### Added
- Support for bedrock-express `0.2.x`.

## 0.1.0 - 2015-02-23

- See git history for changes.

[Unreleased]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/2.0.2...HEAD
[2.0.2]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/1.0.1...2.0.0
[1.0.1]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/0.1.1...1.0.0
[0.1.1]: https://github.com/digitalbazaar/bedrock-session-mongodb/compare/0.1.0...0.1.1
