# strapi-plugin-publisher

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to schedule publishing for any content type.

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-publisher
```

**or**

```sh
yarn add strapi-plugin-publisher
```

## Configuration

### Enable the plugin

The plugin configuration is stored in a config file located at `./config/plugins.js`.

```javascript
module.exports = ({ env }) => ({
	publisher: {
		enabled: true,
	},
});
```

### Enable server cron

The `cron.enabled` configuration option needs to be set to true in [Server Configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html#server-configuration) for the plugin to work.

## Usage

Once the plugin has been installed, configured a publisher section will be added to the `informations` sections of the edit view for all content types (single + collection) that have `draftAndPublish` enabled. The publisher section will provide the ability to schedule publishing and unpublishing of the content type. The plugin checks every minute to see if anything needs to be published/unpublished.

### Single Content Type

![Sample single content type publisher section](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/single.png?raw=true)

### Collection Content Type

![Sample collection content type publisher section](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/collection.png?raw=true)

### Adding a (un)publish date

Navigate to the entity record that should be (un)published, under the `informations` section click the `Add a (un)publish date` button. Enter in the date and click save, the entity record will then be (un)published at the specified time.

![default](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/default.png?raw=true)

![Add a (un)publish date](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/add.png?raw=true)

### Editing a (un)publish date

Navigate to the entity record that requires its date changed, under the `informations` section click the `Edit (un)publish date` button. Enter in the new date and click save.

![Edit a (un)publish date](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/edit-delete.png?raw=true)

### Deleting a (un)publish date

Navigate to the entity record that contains the date that should be removed, under the `informations` section click the `Delete (un)publish date` button.

![Delete a (un)publish date](https://github.com/ComfortablyCoding/strapi-plugin-publisher/blob/master/assets/edit-delete.png?raw=true)

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-publisher/issues)
