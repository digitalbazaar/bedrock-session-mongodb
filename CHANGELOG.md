# bedrock-session-mongodb ChangeLog

## 7.0.0 - 2025-03-07

### Changed
- Update peer dependencies.
  - `@bedrock/core@6.3.0`.
  - `@bedrock/express@8.3.1`.
  - **BREAKING**: `@bedrock/mongodb@11`.
    - Use MongoDB driver 6.x and update error names and details.
    - See changelog for details.
- Update dev dependencies.
- Update test dependencies.

## 6.1.0 - 2025-03-06

### Changed
- Update to `connect-mongo@5`.
- Make the `session-mongodb.ttl` config value default to a value computed
  from `express.session.ttl`. This does not change the default of 30
  minutes but it does allow the express session TTL to properly propagate
  to the `MongoStore` session store instance w/o the need for setting
  the `session-mongodb.ttl` configuration value independently. It can
  still be set independently, overiding the computed value if desired.

## 6.0.0 - 2022-04-29

### Changed
- **BREAKING**: Update peer deps:
  - `@bedrock/core@6`
  - `@bedrock/express@8`
  - `@bedrock/mongodb@10`.

## 5.0.1 - 2022-04-01

### Fixed
- Use `jsdoc-to-markdown@7`.

## 5.0.0 - 2022-04-01

### Changed
- **BREAKING**: Rename package to `@bedrock/session-mongodb`.
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Remove default export.
- **BREAKING**: Require node 14.x.

## 4.3.1 - 2022-03-27

### Fixed
- Add missing `esm` dependency.

## 4.3.0 - 2022-03-26

### Changed
- Update peer deps:
  - `bedrock@4.5`
  - `bedrock-express@6.4`
  - `bedrock-mongodb@8.5`.
- Update internals to use esm style and use `esm.js` to
  transpile to CommonJS.

## 4.2.0 - 2022-03-08

### Changed
- Update peer dependencies:
  - `bedrock@4.4`
  - `bedrock-express@6.2`
  - `bedrock-mongodb@8.4`

## 4.1.0 - 2020-07-07

### Changed
- Update test deps and CI workflow.

## 4.0.0 - 2020-06-09

### Changed
- **BREAKING**: Upgrade `bedrock-mongodb` to ^7.0.0.
- **BREAKING**: Upgrade `connect-mongo` to ^3.2.0.
- Change dbPromise to clientPromise for `connect-mongo`.

### Added
- Add a test for basic functionality.

## 3.1.0 - 2019-11-08

### Changed
- Update to latest bedrock events API.

## 3.0.1 - 2019-05-07

### Fixed
- Delay server listening until session storage is ready.

## 3.0.0 - 2018-03-26

### Changed
- **BREAKING**: Update `connect-mongo` dependency.
- Update `bedrock-mongodb` peer dependency.

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
